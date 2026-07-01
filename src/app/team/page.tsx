'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';
import TeamMemberCard from '@/components/TeamMemberCard';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team');
      const data = await response.json();
      setTeamMembers(data.members || []);
    } catch (error) {
      console.error('Failed to fetch team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const roleOrder: { [key: string]: number } = {
    OWNER: 0,
    CO_OWNER: 1,
    DEVELOPER: 2,
    SERVER_ADMIN: 3,
    DISCORD_ADMIN: 4,
    MODERATOR: 5,
    STAFF: 6,
    YOUTUBER: 7,
    BUILDER: 8,
    DESIGNER: 9,
  };

  const sortedMembers = [...teamMembers].sort(
    (a, b) => (roleOrder[a.role] || 10) - (roleOrder[b.role] || 10)
  );

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
      <SectionTitle title="ZenCraft Team" subtitle="Meet the awesome people behind the server" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
      >
        {sortedMembers.map((member) => (
          <motion.div
            key={member.id}
            variants={itemVariants}
            onClick={() => setSelectedMember(member)}
            className="cursor-pointer"
          >
            <TeamMemberCard member={member} />
          </motion.div>
        ))}
      </motion.div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedMember(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-secondary border border-accent-purple/20 rounded-lg p-8 max-w-md w-full"
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="float-right text-2xl text-gray-400 hover:text-white"
            >
              ✕
            </button>

            {selectedMember.photoUrl && (
              <div className="w-full h-64 relative rounded-lg overflow-hidden mb-6">
                <img
                  src={selectedMember.photoUrl}
                  alt={selectedMember.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{selectedMember.displayName}</h3>
            <p className="text-accent-purple font-semibold mb-4">{selectedMember.role.replace(/_/g, ' ')}</p>
            {selectedMember.description && <p className="text-gray-300 mb-4">{selectedMember.description}</p>}

            <div className="space-y-2 text-sm text-gray-400 mb-6">
              <p>
                <strong>Minecraft:</strong> {selectedMember.minecraftUsername}
              </p>
              <p>
                <strong>Discord:</strong> {selectedMember.discordUsername}
              </p>
              <p>
                <strong>Joined:</strong> {new Date(selectedMember.joinDate).toLocaleDateString()}
              </p>
            </div>

            {selectedMember.socialLinks && selectedMember.socialLinks.length > 0 && (
              <div className="flex gap-2">
                {selectedMember.socialLinks.map((link: any, index: number) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-cyan hover:text-accent-purple transition-colors"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </Container>
  );
}
