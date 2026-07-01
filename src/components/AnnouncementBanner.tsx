'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    try {
      const response = await fetch('/api/announcements/active');
      const data = await response.json();
      if (data.announcement) {
        setAnnouncement(data.announcement);
        setIsVisible(true);
      }
    } catch (error) {
      console.error('Failed to fetch announcement:', error);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'SUCCESS':
        return 'bg-accent-emerald/20 border-accent-emerald/50 text-accent-emerald';
      case 'ERROR':
        return 'bg-red-500/20 border-red-500/50 text-red-400';
      case 'WARNING':
        return 'bg-orange-500/20 border-orange-500/50 text-orange-400';
      default:
        return 'bg-accent-cyan/20 border-accent-cyan/50 text-accent-cyan';
    }
  };

  return (
    <AnimatePresence>
      {announcement && isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className={`border-b ${getTypeColor(announcement.type)} py-3 px-4`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div>
              <p className="font-semibold">{announcement.title}</p>
              <p className="text-sm opacity-90">{announcement.content}</p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-xl hover:opacity-70 transition-opacity ml-4"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
