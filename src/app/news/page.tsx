'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';
import { motion } from 'framer-motion';

export default function News() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      setNews(data.news || []);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-20">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-purple"></div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-20">
      <SectionTitle title="Latest News" subtitle="Stay updated with ZenCraft" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {news.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-secondary border border-accent-purple/20 rounded-lg overflow-hidden hover:border-accent-purple/50 transition-colors"
          >
            {article.imageUrl && (
              <div className="w-full h-48 relative bg-accent-purple/10">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <p className="text-sm text-accent-purple mb-2">
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
              <a
                href={`/news/${article.slug}`}
                className="text-accent-cyan hover:text-accent-purple transition-colors font-semibold"
              >
                Read More →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
