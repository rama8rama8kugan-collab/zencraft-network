'use client';

import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';
import { motion } from 'framer-motion';

export default function FAQ() {
  const faqs = [
    {
      question: 'How do I join the server?',
      answer:
        'You can join by adding the server IP (play.zencraft.in) in your Minecraft launcher. Both Java and Bedrock editions are supported.',
    },
    {
      question: 'What are ranks and what do they offer?',
      answer:
        'Ranks are special privileges that enhance your gameplay experience. They include exclusive cosmetics, commands, and gameplay perks. You can purchase ranks from our store.',
    },
    {
      question: 'How does the economy system work?',
      answer:
        'We have an in-game currency called coins that you can earn by playing or purchase from the store. These can be used to buy items, cosmetics, and other perks.',
    },
    {
      question: 'Is crossplay supported?',
      answer: 'Yes! Both Java Edition and Bedrock Edition players can play together on ZenCraft Network.',
    },
    {
      question: 'What is the refund policy?',
      answer:
        'We offer refunds within 7 days of purchase if you\'re not satisfied. Items that have been used in-game are not refundable. See our full refund policy for details.',
    },
    {
      question: 'How do I report a player or bug?',
      answer:
        'You can report players or bugs by running /report in-game or by contacting our support team on Discord. We take all reports seriously.',
    },
  ];

  return (
    <Container className="py-20">
      <SectionTitle title="Frequently Asked Questions" subtitle="Find answers to common questions" />

      <div className="max-w-3xl mx-auto mt-12 space-y-4">
        {faqs.map((faq, index) => (
          <motion.details
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-dark-secondary border border-accent-purple/20 rounded-lg cursor-pointer hover:border-accent-purple/50 transition-colors"
          >
            <summary className="flex items-center justify-between p-6 font-semibold select-none">
              <span>{faq.question}</span>
              <span className="text-xl text-accent-purple group-open:rotate-180 transition-transform">▶</span>
            </summary>
            <div className="px-6 pb-6 text-gray-300 border-t border-accent-purple/20 pt-4">
              {faq.answer}
            </div>
          </motion.details>
        ))}
      </div>
    </Container>
  );
}
