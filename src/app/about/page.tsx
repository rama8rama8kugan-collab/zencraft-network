'use client';

import { motion } from 'framer-motion';
import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function About() {
  const sections = [
    {
      title: 'History',
      content:
        'ZenCraft Network started with a vision to create the best Tamil Minecraft server experience. Founded in 2021, we\'ve grown into a thriving community with thousands of players.',
    },
    {
      title: 'Mission',
      content:
        'To provide a premium, lag-free Minecraft experience with exclusive content, fair gameplay, and a welcoming community for Tamil players worldwide.',
    },
    {
      title: 'Vision',
      content:
        'To become the most trusted and innovative Tamil Minecraft server, setting industry standards for gameplay, features, and community engagement.',
    },
    {
      title: 'Community',
      content:
        'Our thriving community includes players from across India and the diaspora. We foster inclusivity, respect, and teamwork through events, tournaments, and collaborations.',
    },
  ];

  return (
    <Container className="py-20">
      <SectionTitle title="About ZenCraft Network" subtitle="Learn our story" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
      >
        {sections.map((section, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-dark-secondary backdrop-blur-sm border border-accent-purple/20 rounded-lg p-6 hover:border-accent-purple/50 transition-colors"
          >
            <h3 className="text-2xl font-bold text-accent-purple mb-4">{section.title}</h3>
            <p className="text-gray-300 leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="mt-16 bg-gradient-accent bg-opacity-10 border border-accent-cyan/20 rounded-lg p-8"
      >
        <h3 className="text-2xl font-bold text-accent-cyan mb-4">Why Choose ZenCraft?</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-center">
            <span className="text-accent-emerald mr-3">✓</span>
            Premium, lag-free gameplay experience
          </li>
          <li className="flex items-center">
            <span className="text-accent-emerald mr-3">✓</span>
            Crossplay support (Java & Bedrock)
          </li>
          <li className="flex items-center">
            <span className="text-accent-emerald mr-3">✓</span>
            Exclusive ranks, cosmetics, and items
          </li>
          <li className="flex items-center">
            <span className="text-accent-emerald mr-3">✓</span>
            Active development and regular updates
          </li>
          <li className="flex items-center">
            <span className="text-accent-emerald mr-3">✓</span>
            Fair moderation and safe community
          </li>
          <li className="flex items-center">
            <span className="text-accent-emerald mr-3">✓</span>
            Tamil-friendly support and documentation
          </li>
        </ul>
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="mt-12 text-center"
      >
        <h3 className="text-2xl font-bold mb-4">Community Rules</h3>
        <div className="bg-dark-secondary rounded-lg p-6 text-left inline-block max-w-2xl">
          <ol className="space-y-2 text-gray-300 list-decimal list-inside">
            <li>Respect all players - No harassment or discrimination</li>
            <li>No hacking or cheating of any kind</li>
            <li>No griefing or stealing from other players</li>
            <li>No spam or excessive advertising</li>
            <li>Keep chat family-friendly and appropriate</li>
            <li>Follow server staff instructions</li>
            <li>Report issues to moderators, don't take matters into your own hands</li>
            <li>Have fun and enjoy the game!</li>
          </ol>
        </div>
      </motion.div>
    </Container>
  );
}
