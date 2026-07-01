'use client';

import { useState } from 'react';
import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully! We\'ll be in touch soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-20">
      <SectionTitle title="Contact Us" subtitle="Get in touch with our team" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 max-w-4xl mx-auto">
        {/* Contact Info */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-accent-purple mb-2">📧 Email</h3>
              <a href="mailto:support@zencraft.in" className="text-gray-300 hover:text-accent-cyan">
                support@zencraft.in
              </a>
            </div>
            <div>
              <h3 className="text-xl font-bold text-accent-purple mb-2">🎮 Discord</h3>
              <a
                href={process.env.NEXT_PUBLIC_DISCORD_INVITE || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent-cyan"
              >
                Join our Discord Server
              </a>
            </div>
            <div>
              <h3 className="text-xl font-bold text-accent-purple mb-2">🌐 Server IP</h3>
              <p className="text-gray-300">play.zencraft.in</p>
              <p className="text-sm text-gray-500 mt-1">Java: Port 25565 | Bedrock: Port 19132</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-dark-secondary border border-accent-purple/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-dark-secondary border border-accent-purple/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-dark-secondary border border-accent-purple/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-dark-secondary border border-accent-purple/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-accent px-6 py-3 rounded-lg font-semibold hover:shadow-glow-purple transition-all disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </motion.form>
      </div>
    </Container>
  );
}
