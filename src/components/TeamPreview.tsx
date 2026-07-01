'use client';

import { useState, useEffect } from 'react';
import Container from './Container';
import SectionTitle from './SectionTitle';
import TeamMemberCard from './TeamMemberCard';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TeamPreview() {
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await fetch('/api/team?limit=6');
      const data = await response.json();
      setTeam(data.members || []);
    } catch (error) {
      console.error('Failed to fetch team:', error);
    }
  };

  return (
    <section className="py-20 md:py-32">
      <Container>
        <SectionTitle title="Team" subtitle="Meet the people behind ZenCraft" />

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
          {team.map((member) => (
            <motion.div
              key={member.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <TeamMemberCard member={member} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            href="/team"
            className="inline-block px-8 py-3 rounded-lg border border-accent-purple/50 hover:border-accent-purple hover:bg-accent-purple/10 font-semibold transition-colors"
          >
            View Full Team →
          </Link>
        </div>
      </Container>
    </section>
  );
}
