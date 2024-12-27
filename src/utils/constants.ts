import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SITE_CONFIG = {
  name: 'Error by Night',
  description: 'Learn coding through practical tutorials and real-world projects',
  url: 'https://errorbynight.dev',
  social: {
    youtube: 'https://youtube.com/@errorbynight',
    twitter: 'https://twitter.com/errorbynight',
    github: 'https://github.com/errorbynight',
    discord: 'https://discord.gg/errorbynight',
  },
}

export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Tutorials', href: '/tutorials' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
]
