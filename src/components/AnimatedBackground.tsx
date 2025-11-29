'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedBackground - Provides moving colored lights/blobs effect
 * Creates a living, futuristic dark background with neon green accents
 */
const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-dark-900">
      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-800 via-dark-900 to-black" />
      
      {/* Animated blob 1 - Large neon green */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,65,0.4) 0%, rgba(0,255,65,0) 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, -100, 100, 0, 0],
          scale: [1, 1.2, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        initial={{ x: '10%', y: '20%' }}
      />
      
      {/* Animated blob 2 - Medium neon green */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(0,230,59,0.3) 0%, rgba(0,230,59,0) 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -150, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 0.9, 1.3, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        initial={{ x: '70%', y: '60%' }}
      />
      
      {/* Animated blob 3 - Small cyan-ish */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(0,204,51,0.3) 0%, rgba(0,204,51,0) 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 80, -80, 0],
          y: [0, -80, 80, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        initial={{ x: '40%', y: '80%' }}
      />
      
      {/* Animated blob 4 - Accent blob top right */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full opacity-12"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,65,0.25) 0%, rgba(0,255,65,0) 70%)',
          filter: 'blur(55px)',
        }}
        animate={{
          x: [0, -120, 60, 0],
          y: [0, 80, -40, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        initial={{ x: '80%', y: '10%' }}
      />
      
      {/* Subtle grid overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900 opacity-60" />
    </div>
  );
};

export default AnimatedBackground;

