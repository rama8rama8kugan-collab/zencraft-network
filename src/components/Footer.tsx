'use client';

import { motion } from 'framer-motion';
import Container from './Container';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Quick: [
      { label: 'Home', href: '/' },
      { label: 'Store', href: '/store' },
      { label: 'Team', href: '/team' },
      { label: 'News', href: '/news' },
    ],
    Support: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
      { label: 'Discord', href: process.env.NEXT_PUBLIC_DISCORD_INVITE || '#' },
    ],
    Legal: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Refund Policy', href: '/refund-policy' },
    ],
  };

  return (
    <footer className="bg-dark-secondary border-t border-accent-purple/20 mt-20">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-xl font-bold text-gradient mb-4">⛏️ ZenCraft Network</h3>
            <p className="text-gray-400 text-sm mb-4">
              The #1 Premium Tamil Minecraft Server with exclusive content and community.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-accent-cyan hover:text-accent-purple transition-colors">
                Discord
              </a>
              <a href="#" className="text-accent-cyan hover:text-accent-purple transition-colors">
                YouTube
              </a>
              <a href="#" className="text-accent-cyan hover:text-accent-purple transition-colors">
                Twitter
              </a>
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-accent-purple mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-accent-cyan transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-accent-purple/20 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {currentYear} ZenCraft Network. All rights reserved. | Server IP:{' '}
            <span className="text-accent-cyan font-mono">play.zencraft.in</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
