'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from './Container';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/users/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Store', href: '/store' },
    { label: 'Team', href: '/team' },
    { label: 'News', href: '/news' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={false}
      animate={{ backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)' }}
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? 'bg-dark/80 border-b border-accent-purple/20' : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-gradient">⛏️ ZenCraft</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-accent-cyan transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  {user.head && (
                    <Image
                      src={user.head}
                      alt={user.minecraftUsername}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  )}
                  <span className="text-sm font-semibold">{user.minecraftUsername}</span>
                </div>
                <Link
                  href="/profile"
                  className="px-4 py-2 rounded-lg border border-accent-purple/50 hover:border-accent-purple transition-colors"
                >
                  Profile
                </Link>
                <Link
                  href="/cart"
                  className="relative px-4 py-2 rounded-lg bg-accent-purple/20 hover:bg-accent-purple/30 transition-colors"
                >
                  🛒 Cart
                </Link>
              </>
            ) : (
              <>
                <button className="text-accent-cyan hover:text-accent-purple transition-colors font-semibold">
                  Login
                </button>
                <Link
                  href="/store"
                  className="px-6 py-2 rounded-lg bg-gradient-accent font-semibold hover:shadow-glow-purple transition-all"
                >
                  Shop
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-6 space-y-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-gray-300 hover:text-accent-cyan transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </Container>
    </motion.nav>
  );
}
