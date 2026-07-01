'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TeamMemberCardProps {
  member: any;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'OWNER':
      case 'CO_OWNER':
        return 'text-accent-purple';
      case 'DEVELOPER':
      case 'SERVER_ADMIN':
        return 'text-accent-cyan';
      default:
        return 'text-accent-emerald';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-dark-secondary border border-accent-purple/20 rounded-lg overflow-hidden hover:border-accent-purple/50 transition-colors group"
    >
      {member.photoUrl && (
        <div className="w-full h-48 relative overflow-hidden bg-accent-purple/10">
          <Image
            src={member.photoUrl}
            alt={member.displayName}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-bold">{member.displayName}</h3>
        <p className={`text-sm font-semibold ${getRoleColor(member.role)} mb-2`}>
          {member.role.replace(/_/g, ' ')}
        </p>
        {member.description && <p className="text-gray-400 text-sm line-clamp-2">{member.description}</p>}
        <div className="mt-4 pt-4 border-t border-accent-purple/20">
          <p className="text-xs text-gray-500">{member.minecraftUsername}</p>
        </div>
      </div>
    </motion.div>
  );
}
