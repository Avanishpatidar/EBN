const express = require('express')
const axios = require('axios')
const xml2js = require('xml2js')
const cors = require('cors')
const { google } = require('googleapis')

const app = express()
const port = 3001

app.use(cors())

const YOUTUBE_API_KEY = 'AIzaSyCCFIN-OtU6I_IUNyWKbIOFJQVDPILFpy8'
const youtube = google.youtube({
  version: 'v3',
  auth: YOUTUBE_API_KEY
})

async function getVideoStats(videoId) {
  try {
    const response = await youtube.videos.list({
      part: ['statistics', 'contentDetails'],
      id: [videoId]
    })
    
    if (!response.data.items || response.data.items.length === 0) {
      throw new Error('No video data found')
    }
    
    const video = response.data.items[0]
    return {
      views: parseInt(video.statistics.viewCount || '0'),
      likes: parseInt(video.statistics.likeCount || '0'),
      duration: video.contentDetails.duration || 'PT0M0S'
    }
  } catch (error) {
    console.error(`Error fetching stats for video ${videoId}:`, error)
    return { views: 0, likes: 0, duration: 'PT0M0S' }
  }
}

function formatDuration(duration) {
  if (!duration) return '0:00'
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return '0:00'
  
  const [, hours, minutes, seconds] = match
  const h = hours ? `${hours}:` : ''
  const m = minutes ? minutes : '0'
  const s = seconds ? seconds.padStart(2, '0') : '00'
  
  return hours ? `${h}${m.padStart(2, '0')}:${s}` : `${m}:${s}`
}

function formatCount(count) {
  const num = Number(count)
  if (isNaN(num)) return '0'
  
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

app.get('/api/youtube-rss', async (req, res) => {
  const channelId = req.query.channelId
  if (!channelId) {
    return res.status(400).json({ error: 'Missing channelId parameter' })
  }

  try {
    const response = await axios.get(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { timeout: 5000 } // 5 second timeout
    )
    
    if (!response.data) {
      throw new Error('No data received from YouTube RSS feed')
    }

    xml2js.parseString(response.data, { explicitArray: false }, async (err, result) => {
      if (err) {
        console.error('XML Parsing Error:', err)
        return res.status(500).json({ error: 'Failed to parse XML data' })
      }

      if (!result?.feed?.entry) {
        return res.status(404).json({ error: 'No videos found' })
      }

      try {
        // Process videos in batches of 5 to avoid rate limiting
        const entries = Array.isArray(result.feed.entry) ? result.feed.entry : [result.feed.entry]
        const batchSize = 5
        const processedItems = []

        for (let i = 0; i < entries.length; i += batchSize) {
          const batch = entries.slice(i, i + batchSize)
          const batchPromises = batch.map(async (entry) => {
            try {
              const videoId = entry['yt:videoId']
              const stats = await getVideoStats(videoId)
              
              return {
                id: videoId,
                title: entry.title || 'Untitled Video',
                duration: formatDuration(stats.duration),
                views: formatCount(stats.views),
                likes: formatCount(stats.likes),
                thumbnail: entry['media:group']['media:thumbnail']?.$.url || '',
                url: entry.link?.$.href || `https://youtube.com/watch?v=${videoId}`,
                date: entry.published || new Date().toISOString()
              }
            } catch (error) {
              console.error(`Error processing video ${entry['yt:videoId']}:`, error)
              return null
            }
          })

          const batchResults = await Promise.all(batchPromises)
          processedItems.push(...batchResults.filter(item => item !== null))
          
          // Add a small delay between batches to avoid rate limiting
          if (i + batchSize < entries.length) {
            await new Promise(resolve => setTimeout(resolve, 100))
          }
        }

        res.json({ 
          items: processedItems,
          total: processedItems.length
        })
      } catch (error) {
        console.error('Error processing videos:', error)
        res.status(500).json({ error: 'Error processing videos' })
      }
    })
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    res.status(500).json({ 
      error: 'Failed to fetch RSS feed',
      details: error.message 
    })
  }
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
})

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error)
})
