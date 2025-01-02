import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { FiCode, FiEye, FiUsers } from "react-icons/fi";
import { Container } from '../ui/Container';
import { cn } from "../../utils/cn";

export function Stats() {
  const [stats, setStats] = useState({
    totalViews: 0,
    totalSubscribers: 0,
    totalVideos: 0,
  });
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      fetchStats();
    }
  }, [controls, inView]);

  async function fetchStats() {
    try {
      const response = await fetch("http://localhost:3001/api/youtube-stats?channelId=UCKJxvfhbJVoXaIeuE9a1IYw");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setStats({
        totalViews: data.views || 0,
        totalSubscribers: data.subscribers || 0,
        totalVideos: data.videos || 0,
      });
    } catch (err) {
      console.error("Error fetching YouTube stats:", err);
    } finally {
      setLoading(false);
    }
  }

  const STATS = [
    { label: "Total Views", value: stats.totalViews, icon: FiEye, color: "from-blue-400 to-blue-600" },
    { label: "Subscribers", value: stats.totalSubscribers, icon: FiUsers, color: "from-purple-400 to-purple-600" },
    { label: "Videos", value: stats.totalVideos, icon: FiCode, color: "from-green-400 to-green-600" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative bg-black text-white py-24">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 text-text-primary"
            variants={itemVariants}
          >
            <span className="animated-gradient-text">Channel Statistics</span>
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-3">
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="relative"
              >
                <div className="absolute -inset-[2px] rounded-xl overflow-hidden">
                  <div
                    className={cn(
                      "absolute inset-0 blur-[2px]",
                      `bg-gradient-to-r ${stat.color}`
                    )}
                    style={{
                      maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
                      maskSize: '100% 3px, 3px 100%',
                      maskPosition: '0 0, 100% 0',
                      maskRepeat: 'no-repeat',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      animation: 'rotate-glow 4s linear infinite',
                    }}
                  />
                </div>
                <div className="relative rounded-xl bg-zinc-900/50 backdrop-blur-xl p-8 shadow-lg">
                  <motion.div
                    className="mb-6 inline-block p-3 rounded-full bg-gray-800"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <stat.icon className="w-8 h-8 text-text-primary" />
                  </motion.div>
                  <motion.div
                    className="text-5xl font-extrabold mb-2 text-text-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {loading ? (
                      <span className="text-text-secondary">Loading...</span>
                    ) : (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        separator=","
                      />
                    )}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 text-text-primary">{stat.label}</h3>
                  <p className="text-text-secondary text-sm">
                    {stat.label === "Total Views" ? "Lifetime channel views" :
                     stat.label === "Subscribers" ? "Current subscriber count" :
                     "Total videos uploaded"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
