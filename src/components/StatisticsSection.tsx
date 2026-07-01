'use client';

import { motion } from 'framer-motion';
import Container from './Container';
import SectionTitle from './SectionTitle';

export default function StatisticsSection() {
  const stats = [
    { label: 'Active Players', value: '5,000+', icon: '👥' },
    { label: 'Total Revenue', value: '₹50,000+', icon: '💰' },
    { label: 'Server Uptime', value: '99.9%', icon: '⚡' },
    { label: 'Premium Items', value: '150+', icon: '🎁' },
  ];

  return (
    <section className="py-20 md:py-32">
      <Container>
        <SectionTitle title="By The Numbers" subtitle="ZenCraft in stats" />

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="bg-gradient-dark border border-accent-purple/30 rounded-lg p-6 text-center"
            >
              <div className="text-5xl mb-3">{stat.icon}</div>
              <p className="text-4xl font-bold text-accent-cyan mb-2">{stat.value}</p>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
