'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MinecraftLoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/users/me');
      if (!response.ok) {
        // Show login modal on first visit
        const hasShownModal = localStorage.getItem('zencraft_login_shown');
        if (!hasShownModal) {
          setIsOpen(true);
          localStorage.setItem('zencraft_login_shown', 'true');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/minecraft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-dark-secondary border border-accent-purple/20 rounded-lg p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-gradient mb-2">Welcome to ZenCraft!</h2>
        <p className="text-gray-400 mb-6">Login with your Minecraft username to get started</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Minecraft Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full bg-dark border border-accent-purple/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-accent px-6 py-3 rounded-lg font-semibold hover:shadow-glow-purple transition-all disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          We use Mojang API to verify your username securely
        </p>
      </motion.div>
    </motion.div>
  );
}
