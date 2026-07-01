'use client';

import { useState, useEffect } from 'react';
import Container from './Container';
import SectionTitle from './SectionTitle';
import { motion } from 'framer-motion';

export default function PartnersSection() {
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/partners');
      const data = await response.json();
      setPartners(data.partners || []);
    } catch (error) {
      console.error('Failed to fetch partners:', error);
    }
  };

  if (partners.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-dark-secondary/50">
      <Container>
        <SectionTitle title="Our Partners" subtitle="Collaborations that make ZenCraft better" />

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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-dark border border-accent-purple/20 rounded-lg overflow-hidden hover:border-accent-purple/50 transition-colors"
            >
              <div className="h-32 bg-accent-purple/10 flex items-center justify-center">
                <img src={partner.logoUrl} alt={partner.name} className="h-20 object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{partner.description}</p>
                {partner.websiteUrl && (
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-cyan hover:text-accent-purple transition-colors font-semibold"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
