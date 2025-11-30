'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  MapPin, 
  Zap, 
  Globe, 
  ArrowRight, 
  Trophy, 
  Users,
  Briefcase,
  Heart,
  Target,
  Sparkles,
  TrendingUp,
  Shield,
  Rocket,
  Star,
  ChevronDown,
  Presentation
} from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';

interface Leaderboard {
  publicKey: string;
  username?: string;
  totalDropsCreated: number;
}

export default function LandingPage() {
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const isFeaturesInView = useInView(featuresRef, { once: true, margin: '-100px' });

  useEffect(() => {
    fetchLeaderboard();
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      if (data.success) {
        setLeaderboard(data.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const features = [
    {
      icon: MapPin,
      title: 'Location-Based Drops',
      description: 'Drop crypto at physical locations for others to discover and claim',
      gradient: 'from-cyber-500 to-green-500',
      delay: 0.1
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Powered by Stellar Network - transactions confirmed in 3-5 seconds',
      gradient: 'from-yellow-400 to-orange-500',
      delay: 0.2
    },
    {
      icon: Globe,
      title: 'Global & Local',
      description: 'Create drops anywhere in the world or right in your neighborhood',
      gradient: 'from-cyan-500 to-blue-500',
      delay: 0.3
    }
  ];

  const audiences = [
    {
      icon: Users,
      title: 'Personal Users',
      description: 'Share crypto with friends, create treasure hunts, or discover drops near you',
      color: 'from-cyber-500 to-green-500',
      delay: 0.1
    },
    {
      icon: Briefcase,
      title: 'Businesses',
      description: 'Reward loyal customers, drive foot traffic, and create engaging marketing campaigns',
      color: 'from-cyan-500 to-blue-500',
      delay: 0.2
    },
    {
      icon: Heart,
      title: 'Non-Profits',
      description: 'Distribute aid directly, create fundraising events, and engage your community',
      color: 'from-pink-500 to-purple-500',
      delay: 0.3
    }
  ];

  const stats = [
    { label: 'Transaction Speed', value: '3-5s', icon: Zap },
    { label: 'Transaction Fee', value: '<$0.01', icon: TrendingUp },
    { label: 'Network', value: 'Stellar', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-dark-950 bg-animated overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute w-96 h-96 bg-cyber-500/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.5 - 200,
            y: mousePosition.y * 0.5 - 200,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.3 - 200,
            y: mousePosition.y * 0.3 - 200,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.2 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,157,0.1),transparent_50%)]" />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20 z-10">
        <motion.div
          style={{ y, opacity }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass-dark rounded-full border border-cyber-500/30"
            >
              <Sparkles className="w-4 h-4 text-cyber-500" />
              <span className="text-sm font-medium text-cyber-400">Powered by Stellar Network</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-8xl font-black mb-6 leading-tight"
            >
              <span className="block text-gradient bg-gradient-to-r from-cyber-500 via-cyan-400 to-cyber-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Drop Crypto
              </span>
              <span className="block text-white mt-2">Anywhere on Earth</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              The first Location-Based SocialFi Platform on Stellar Network. 
              Create geo-drops, share with friends, or discover crypto around you.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link href="/app/map">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="primary" size="lg" className="group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Launch App
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyber-500 to-cyan-500"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/presentation">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="lg" className="group">
                    <span className="flex items-center gap-2">
                      <Presentation className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      View Presentation
                    </span>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/faq">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass-dark rounded-2xl p-6 border border-slate-800/50 hover:border-cyber-500/50 transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-cyber-500 mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>


          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Why <span className="text-gradient">StellarGo</span>?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Experience the future of location-based cryptocurrency
            </p>
          </motion.div>

          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: feature.delay, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card hover className="h-full relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-dark-950" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{feature.title}</h3>
                    <p className="text-slate-400 relative z-10">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="relative py-32 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Built for <span className="text-gradient">Everyone</span>
            </h2>
            <p className="text-xl text-slate-400">
              Whether you're an individual, business, or non-profit - StellarGo has you covered
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {audiences.map((audience, index) => {
              const Icon = audience.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: audience.delay, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <Card hover className="h-full relative overflow-hidden group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${audience.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <div className={`w-16 h-16 bg-gradient-to-br ${audience.color} rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:rotate-6 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{audience.title}</h3>
                    <p className="text-slate-400 relative z-10">{audience.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Stellar Section */}
      <section className="relative py-32 px-4 z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-500/10 to-cyan-500/10" />
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <Target className="w-20 h-20 text-cyber-500 mx-auto mb-8" />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Why Stellar Network?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
                  {[
                    { icon: Zap, title: 'Lightning Fast', desc: 'Transactions confirmed in 3-5 seconds, not minutes or hours', color: 'text-yellow-400' },
                    { icon: TrendingUp, title: 'Ultra Low Cost', desc: 'Transaction fees under $0.01 - send any amount profitably', color: 'text-green-400' },
                    { icon: Globe, title: 'Global Reach', desc: 'Send value anywhere in the world instantly', color: 'text-cyan-400' },
                    { icon: Shield, title: 'Eco-Friendly', desc: 'Energy-efficient consensus without mining', color: 'text-emerald-400' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <Icon className={`w-6 h-6 ${item.color} flex-shrink-0 mt-1`} />
                        <div>
                          <h3 className={`${item.color} font-bold text-lg mb-2`}>{item.title}</h3>
                          <p className="text-slate-400">{item.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="relative py-32 px-4 z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <Trophy className="w-20 h-20 text-cyber-500 mx-auto mb-6" />
              </motion.div>
              <h2 className="text-5xl font-bold text-white mb-4">
                Most Active <span className="text-gradient">Droppers</span>
              </h2>
              <p className="text-slate-400 text-lg">
                Top contributors to the StellarGo community
              </p>
            </div>

            <Card>
              {leaderboard.length > 0 ? (
                <div className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <motion.div
                      key={user.publicKey}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between p-4 glass rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center space-x-4">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                            index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-dark-950 shadow-lg shadow-yellow-500/50' :
                            index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-dark-950' :
                            index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-dark-950' :
                            'bg-slate-700 text-slate-300'
                          }`}>
                          {index === 0 && <Star className="w-6 h-6" />}
                          {index !== 0 && index + 1}
                        </motion.div>
                        <div>
                          <p className="text-white font-semibold group-hover:text-cyber-400 transition-colors">
                            {user.username || truncateAddress(user.publicKey)}
                          </p>
                          <p className="text-slate-400 text-sm">{truncateAddress(user.publicKey)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-cyber-500 font-bold text-lg">{user.totalDropsCreated}</p>
                        <p className="text-slate-400 text-sm">drops</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-slate-400 py-12"
                >
                  No data yet. Be the first to create drops!
                </motion.p>
              )}
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-500/20 via-cyan-500/20 to-cyber-500/20 animate-gradient" />
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <Rocket className="w-20 h-20 text-cyber-500 mx-auto mb-8" />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Start <span className="text-gradient">Dropping</span>?
                </h2>
                <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                  Connect your Freighter wallet and start exploring the future of location-based crypto
                </p>
                <Link href="/app/map">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="primary" size="lg" className="group relative overflow-hidden">
                      <span className="relative z-10 flex items-center gap-2">
                        Launch App Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyber-500 to-cyan-500"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-4 border-t border-slate-800/50 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex justify-center space-x-8 mb-8">
              {[
                { name: 'GitHub', href: 'https://github.com/MYounesDev' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/in/Myounesdev' },
                { name: 'Presentation', href: '/presentation' },
                { name: 'FAQ', href: '/faq' },
              ].map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="text-slate-400 hover:text-cyber-500 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            <p className="text-slate-500 text-sm">
              © 2024 StellarGo. Built on Stellar Network. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
