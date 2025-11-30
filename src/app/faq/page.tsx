'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/Card';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What is StellarGo?',
      answer: 'StellarGo is a location-based SocialFi platform built on the Stellar Network. It allows users to "drop" cryptocurrency at physical locations for others to discover and claim. Think of it as a digital treasure hunt combined with instant crypto transfers.'
    },
    {
      question: 'How does Geo-Drop work?',
      answer: 'Geo-Drops are cryptocurrency amounts placed at specific GPS coordinates. When you create a drop, you set the location, amount, and message. Anyone within 50 meters of that location can claim the drop using their mobile device. The claim radius ensures drops are physically collected.'
    },
    {
      question: 'Why is the Stellar Network used?',
      answer: 'Stellar offers several key advantages: transactions confirm in 3-5 seconds (much faster than Bitcoin or Ethereum), transaction fees are under $0.01, it\'s energy-efficient without mining, and it\'s specifically designed for fast, low-cost payments - perfect for our use case.'
    },
    {
      question: 'What is Freighter Wallet?',
      answer: 'Freighter is a browser extension wallet for the Stellar Network, similar to MetaMask for Ethereum. It\'s required to use StellarGo as it manages your Stellar account and signs transactions. You can download it from freighter.app.'
    },
    {
      question: 'How do I get started?',
      answer: 'First, install the Freighter wallet extension and create an account. Then visit StellarGo, connect your wallet, and complete the onboarding to select your persona (Personal, Business, or Non-Profit). You\'ll need some XLM in your wallet to create drops.'
    },
    {
      question: 'What are the different user personas?',
      answer: 'Personal Users can share crypto with friends and discover drops. Businesses can reward customers and drive foot traffic with targeted drops. Non-Profits can distribute aid and create fundraising campaigns. Each persona unlocks specific features tailored to your needs.'
    },
    {
      question: 'Can I claim my own drops?',
      answer: 'No, you cannot claim drops you created. This prevents abuse and ensures drops are meant for others. However, you can always cancel an unclaimed drop (feature coming soon) to recover your funds.'
    },
    {
      question: 'What happens to unclaimed drops?',
      answer: 'Drops can have expiration times set by the creator (1 hour to never). After expiration, unclaimed drops can be recovered by the creator. If no expiration is set, the drop remains available indefinitely until claimed.'
    },
    {
      question: 'Is there a fee for creating drops?',
      answer: 'StellarGo itself doesn\'t charge fees. However, the Stellar Network charges a minimal transaction fee (typically $0.00001 per operation). You also need a minimum balance of 1 XLM in your wallet to keep the account active.'
    },
    {
      question: 'Can drops be targeted to specific audiences?',
      answer: 'Yes! When creating a Geo-Drop, you can set the target audience: Public (anyone can claim), Friends Only (requires connection), or For Customers (business feature). This helps tailor drops to your intended recipients.'
    },
    {
      question: 'Is my location data stored?',
      answer: 'We only store the GPS coordinates of drops you create. Your real-time location is used temporarily to calculate distance to nearby drops but is never permanently stored. We prioritize your privacy.'
    },
    {
      question: 'Can I use StellarGo on mobile?',
      answer: 'Yes! StellarGo is fully responsive and works great on mobile browsers. For the best experience, use Chrome or Safari. Make sure to enable location services to claim nearby drops.'
    },
    {
      question: 'What if someone claims my drop before I intended?',
      answer: 'Once you create a drop, it becomes available immediately to anyone in range (based on your target audience setting). Make sure to set appropriate targeting and consider the timing of your drop carefully.'
    },
    {
      question: 'How do levels and badges work?',
      answer: 'You earn experience by creating and claiming drops. As you level up, you unlock badges and special features. Your level is displayed on your profile and contributes to the leaderboard rankings.'
    },
    {
      question: 'Is StellarGo open source?',
      answer: 'Yes! StellarGo is open source and available on GitHub. We welcome contributions from the community. Check our GitHub repository for more information on how to contribute.'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 bg-animated pt-20 md:pt-24 pb-20 md:pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-20 h-20 bg-gradient-to-br from-cyber-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 pulse-glow"
          >
            <HelpCircle className="w-10 h-10 text-dark-500" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-400"
          >
            Everything you need to know about StellarGo
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left flex items-start justify-between gap-4 group"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyber-500 transition-colors">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 mt-1"
                >
                  <ChevronDown className="w-5 h-5 text-cyber-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2">
                      <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </motion.div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Card className="text-center bg-gradient-to-br from-cyber-500/10 to-cyan-500/10 border-2 border-cyber-500/20">
            <Sparkles className="w-12 h-12 text-cyber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Still have questions?</h2>
            <p className="text-slate-400 mb-6">
              Join our community or reach out to our team
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://github.com/MYounesDev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/Myounesdev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-cyber-500 hover:bg-cyber-400 text-dark-500 rounded-xl font-semibold transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
