'use client';

import { motion } from 'framer-motion';
import Container from './Container';
import SectionTitle from './SectionTitle';

export default function FeaturesSection() {
  const features = [
    {
      icon: '⭐',
      title: 'Premium Ranks',
      description: 'Exclusive ranks with unique perks, cosmetics, and gameplay enhancements',
    },
    {
      icon: '🎁',
      title: 'Exclusive Items',
      description: 'Keys, crates, cosmetics, and pets only available in our store',
    },
    {
      icon: '🌍',
      title: 'Crossplay Support',
      description: 'Play together with Java Edition and Bedrock Edition players',
    },
    {
      icon: '💎',
      title: 'Economy System',
      description: 'In-game currency system with shops, trading, and rewards',
    },
    {
      icon: '🛡️',
      title: 'Safe & Fair',
      description: 'Anti-cheat systems and fair moderation for every player',
    },
    {
      icon: '🎮',
      title: 'Always Updated',
      description: 'Regular updates, new features, and seasonal events',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-dark-secondary/50">
      <Container>
        <SectionTitle title="Why Choose ZenCraft?" subtitle="Premium features for everyone" />

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-dark border border-accent-purple/20 rounded-lg p-6 hover:border-accent-purple/50 transition-colors group cursor-pointer"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
