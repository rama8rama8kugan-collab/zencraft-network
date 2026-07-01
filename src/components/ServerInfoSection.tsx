'use client';

import Container from './Container';
import SectionTitle from './SectionTitle';
import { motion } from 'framer-motion';

export default function ServerInfoSection() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section className="py-20 md:py-32 bg-dark-secondary/50">
      <Container>
        <SectionTitle title="Server Information" subtitle="How to join ZenCraft Network" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Java Edition */}
            <div className="bg-dark border border-accent-purple/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-accent-cyan mb-6">Java Edition</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Server IP</p>
                  <div className="flex gap-2">
                    <code className="flex-1 bg-dark-secondary border border-accent-purple/30 rounded px-3 py-2 font-mono text-accent-cyan">
                      play.zencraft.in
                    </code>
                    <button
                      onClick={() => copyToClipboard('play.zencraft.in')}
                      className="px-4 py-2 bg-accent-purple hover:bg-accent-purple/80 rounded transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Port</p>
                  <p className="font-bold text-lg">25565</p>
                </div>
              </div>
            </div>

            {/* Bedrock Edition */}
            <div className="bg-dark border border-accent-emerald/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-accent-emerald mb-6">Bedrock Edition</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Server IP</p>
                  <div className="flex gap-2">
                    <code className="flex-1 bg-dark-secondary border border-accent-purple/30 rounded px-3 py-2 font-mono text-accent-cyan">
                      play.zencraft.in
                    </code>
                    <button
                      onClick={() => copyToClipboard('play.zencraft.in')}
                      className="px-4 py-2 bg-accent-emerald hover:bg-accent-emerald/80 rounded transition-colors text-black font-semibold"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Port</p>
                  <p className="font-bold text-lg">19132</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Crossplay', 'Anti-Cheat', 'Economy', 'Events'].map((feature) => (
              <div key={feature} className="bg-dark border border-accent-purple/20 rounded-lg p-4 text-center">
                <p className="font-semibold">{feature}</p>
                <p className="text-accent-emerald text-lg">✓</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
