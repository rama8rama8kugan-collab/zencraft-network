'use client';

import { motion } from 'framer-motion';
import Container from './Container';
import SectionTitle from './SectionTitle';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-dark opacity-40" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-purple/20 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-cyan/20 rounded-full blur-3xl opacity-20" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient">ZenCraft Network</span>
            <br />
            <span className="text-accent-cyan">Top Tamil Minecraft Server</span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience premium Minecraft gameplay with exclusive ranks, cosmetics, and a thriving Tamil-speaking
            community. Java & Bedrock crossplay enabled.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center mb-12"
          >
            <button className="px-8 py-4 rounded-lg bg-gradient-accent font-bold text-lg hover:shadow-glow-purple transition-all">
              Join Server
            </button>
            <button className="px-8 py-4 rounded-lg border border-accent-cyan/50 hover:border-accent-cyan font-bold text-lg transition-colors">
              Visit Store
            </button>
            <button className="px-8 py-4 rounded-lg border border-accent-purple/50 hover:border-accent-purple font-bold text-lg transition-colors">
              Discord
            </button>
          </motion.div>

          {/* Server Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            <div className="bg-dark-secondary/50 backdrop-blur border border-accent-purple/20 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Server IP</p>
              <p className="font-mono font-bold text-accent-cyan">play.zencraft.in</p>
            </div>
            <div className="bg-dark-secondary/50 backdrop-blur border border-accent-purple/20 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Versions</p>
              <p className="font-bold">Java & Bedrock</p>
            </div>
            <div className="bg-dark-secondary/50 backdrop-blur border border-accent-purple/20 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Status</p>
              <p className="font-bold text-accent-emerald">● Online</p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
