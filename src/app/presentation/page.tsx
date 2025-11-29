'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode.react';

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  background?: string;
}

const PresentationPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const slides: Slide[] = [
    {
      id: 1,
      title: 'StellarGo',
      subtitle: 'Not just a tool. A Platform.',
      background: 'from-dark-900 via-dark-800 to-neon-900/20',
    },
    {
      id: 2,
      title: 'The Problem',
      subtitle: 'Crypto is lonely. It\'s stuck on screens.',
      content: (
        <div className="flex justify-center mt-12">
          <div className="glass-dark p-12 rounded-3xl max-w-2xl">
            <div className="text-6xl mb-6 text-center opacity-30">💻</div>
            <p className="text-2xl text-gray-400 text-center italic">
              "Traditional crypto wallets are boring interfaces with no real-world connection."
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'The Solution',
      subtitle: 'We bring Crypto to the Streets',
      content: (
        <div className="flex justify-center mt-12">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-9xl"
          >
            🗺️💰
          </motion.div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Why Stellar? (Crucial)',
      subtitle: 'Only Stellar makes this business model viable',
      content: (
        <div className="mt-12 space-y-8">
          <div className="glass p-8 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-neon-500">Cost Comparison</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-red-500/10 rounded-2xl border-2 border-red-500">
                <p className="text-gray-400 mb-2">Ethereum</p>
                <p className="text-5xl font-bold text-red-500">$5.00</p>
                <p className="text-sm text-gray-500 mt-2">per transaction</p>
              </div>
              <div className="text-center p-6 bg-neon-500/10 rounded-2xl border-2 border-neon-500">
                <p className="text-gray-400 mb-2">Stellar</p>
                <p className="text-5xl font-bold text-neon-500">$0.00001</p>
                <p className="text-sm text-gray-500 mt-2">per transaction</p>
              </div>
            </div>
          </div>
          <div className="glass p-6 rounded-2xl max-w-4xl mx-auto">
            <p className="text-xl text-center text-gray-300">
              <span className="text-neon-500 font-bold">Gamification requires Speed (3s) and Low Cost.</span>
              <br />
              Only Stellar makes this business model viable.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Business Model & Validation',
      subtitle: 'Location-Based SocialFi',
      content: (
        <div className="mt-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="glass p-8 rounded-3xl">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-2xl font-bold mb-3 text-neon-500">Market Position</h3>
              <p className="text-gray-300 text-lg">
                Location-Based SocialFi Platform
              </p>
            </div>
            <div className="glass p-8 rounded-3xl">
              <div className="text-5xl mb-4">☕</div>
              <h3 className="text-2xl font-bold mb-3 text-neon-500">Use Case</h3>
              <p className="text-gray-300 text-lg">
                "Starbucks drops tokens in-store to drive foot traffic"
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: 'Smart Contracts',
      subtitle: 'Powered by Soroban',
      content: (
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="glass p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🔐</div>
              <h3 className="text-2xl font-bold text-neon-500">Lat/Long Verification</h3>
            </div>
            <div className="bg-dark-800 p-6 rounded-2xl font-mono text-sm text-neon-400">
              <p>fn create_drop(lat: i64, lng: i64, amount: i128)</p>
              <p className="mt-2">fn claim_drop(user_lat: i64, user_lng: i64)</p>
              <p className="mt-2 text-gray-500">// Verifies user is within 50m radius</p>
            </div>
            <p className="text-gray-400 text-center">
              Smart contracts verify physical proximity before allowing claims
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      title: 'Tech Stack',
      subtitle: 'Modern, Fast, Scalable',
      content: (
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: 'Next.js', icon: '⚛️', desc: 'React Framework' },
              { name: 'Tailwind', icon: '🎨', desc: 'Styling' },
              { name: 'Soroban', icon: '🔗', desc: 'Smart Contracts' },
              { name: 'Freighter', icon: '🔐', desc: 'Wallet' },
              { name: 'MongoDB', icon: '🗄️', desc: 'Database' },
              { name: 'Framer Motion', icon: '✨', desc: 'Animations' },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-2xl text-center hover:bg-white/10 transition-all"
              >
                <div className="text-4xl mb-3">{tech.icon}</div>
                <h4 className="font-bold text-lg text-gray-100">{tech.name}</h4>
                <p className="text-sm text-gray-400">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 8,
      title: 'Demo & QR',
      subtitle: 'Scan to open the app on mobile',
      content: (
        <div className="flex flex-col items-center justify-center mt-12 space-y-8">
          <div className="glass p-8 rounded-3xl">
            <QRCode
              value={typeof window !== 'undefined' ? window.location.origin : 'https://stellargo.app'}
              size={300}
              bgColor="#0a0a0a"
              fgColor="#00FF41"
              level="H"
              className="rounded-2xl"
            />
          </div>
          <p className="text-2xl text-gray-400">
            Scan to experience <span className="text-neon-500 font-bold">StellarGo</span>
          </p>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes(!showNotes);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, showNotes]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-dark-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.background || 'from-dark-900 via-dark-800 to-dark-900'}`}
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Animated blobs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,65,0.4) 0%, rgba(0,255,65,0) 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ left: '10%', top: '20%' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Slide Content */}
        <div className="flex-1 flex items-center justify-center p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-7xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-6"
              >
                <motion.h1
                  className="text-7xl md:text-9xl font-display font-bold"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                >
                  {currentSlideData.title.split(' ').map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={index % 2 === 0 ? 'text-neon-500' : 'text-gray-100'}
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </motion.h1>
                
                {currentSlideData.subtitle && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-3xl md:text-4xl text-gray-400 font-light"
                  >
                    {currentSlideData.subtitle}
                  </motion.p>
                )}

                {currentSlideData.content && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    {currentSlideData.content}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="p-8 flex items-center justify-between">
          {/* Left: Prev Button */}
          <button
            onClick={prevSlide}
            className="glass px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
            disabled={currentSlide === 0}
          >
            ← Previous
          </button>

          {/* Center: Slide Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-neon-500 w-8 shadow-neon'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Right: Next Button */}
          <button
            onClick={nextSlide}
            className="glass px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
            disabled={currentSlide === slides.length - 1}
          >
            Next →
          </button>
        </div>

        {/* Slide Number */}
        <div className="absolute top-8 right-8 glass px-4 py-2 rounded-xl text-gray-400">
          {currentSlide + 1} / {slides.length}
        </div>

        {/* Presenter Mode Toggle */}
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="absolute top-8 left-8 glass px-4 py-2 rounded-xl hover:bg-white/10 transition-all"
        >
          {showNotes ? '📝 Hide Notes' : '📝 Show Notes'}
        </button>

        {/* Speaker Notes (if enabled) */}
        {showNotes && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-24 left-8 right-8 glass p-6 rounded-2xl"
          >
            <h3 className="font-bold mb-2 text-neon-500">Speaker Notes:</h3>
            <p className="text-gray-300">
              {currentSlide === 0 && "Introduce StellarGo as a platform, not just a tool. Emphasize the vision."}
              {currentSlide === 1 && "Highlight the problem: crypto is disconnected from physical world."}
              {currentSlide === 2 && "Present the solution: location-based drops bring crypto to streets."}
              {currentSlide === 3 && "CRUCIAL SLIDE: Emphasize why Stellar is the only viable choice."}
              {currentSlide === 4 && "Explain business model and give concrete use case (Starbucks example)."}
              {currentSlide === 5 && "Technical explanation of Soroban smart contracts."}
              {currentSlide === 6 && "Show the modern tech stack powering the platform."}
              {currentSlide === 7 && "Final slide: Invite judges to try the app via QR code."}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PresentationPage;

