'use client';

import Container from '@/components/Container';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <Container className="py-32 flex flex-col items-center justify-center min-h-screen">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <h1 className="text-8xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-400 text-lg mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <a
          href="/"
          className="inline-block bg-gradient-accent px-8 py-3 rounded-lg font-semibold hover:shadow-glow-purple transition-all"
        >
          Go Home
        </a>
      </motion.div>
    </Container>
  );
}
