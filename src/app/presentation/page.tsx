'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize,
  Globe,
  Rocket,
  MapPin,
  Zap,
  Users,
  Code,
  Layers,
  TrendingUp,
  DollarSign,
  Shield
} from 'lucide-react';

interface SlideContent {
  en: {
    title: string;
    subtitle?: string;
    content?: React.ReactNode;
  };
  tr?: {
    title: string;
    subtitle?: string;
    content?: React.ReactNode;
  };
  background: string;
  theme: 'dark' | 'bright' | 'space' | 'gradient';
}

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'tr'>('en');
  const [isStarted, setIsStarted] = useState(false);
  const [turkishEnabled, setTurkishEnabled] = useState(false);

  // Check if Turkish is enabled from environment
  useEffect(() => {
    const enabled = process.env.NEXT_PUBLIC_TURKISH === 'true';
    setTurkishEnabled(enabled);
  }, []);

  // Slide definitions
  const slides: SlideContent[] = [
    {
      en: {
        title: "StellarGo",
        subtitle: "Not just a tool. A Platform.",
        content: (
          <div className="text-center">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-9xl mb-8"
            >
              🚀
            </motion.div>
            <p className="text-2xl text-gray-300 mb-12">
              Where Crypto Meets the Real World
            </p>
          </div>
        )
      },
      tr: {
        title: "StellarGo",
        subtitle: "Sadece bir araç değil. Bir Platform.",
        content: (
          <div className="text-center">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-9xl mb-8"
            >
              🚀
            </motion.div>
            <p className="text-2xl text-amber-300 mb-12">
              Kripto ile Gerçek Dünya Buluşuyor
            </p>
          </div>
        )
      },
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      theme: 'dark'
    },
    {
      en: {
        title: "The Problem 😔",
        content: (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="glass-dark p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-4 text-red-400">Crypto is Lonely</h3>
              <p className="text-xl text-gray-300">Stuck on screens. No real-world interaction.</p>
            </div>
            <div className="glass-dark p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-4 text-orange-400">Fragmented Experience</h3>
              <p className="text-xl text-gray-300">4 different apps to do 1 simple thing.</p>
            </div>
            <div className="glass-dark p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-4 text-yellow-400">No Engagement</h3>
              <p className="text-xl text-gray-300">Boring interfaces. No gamification. No fun.</p>
            </div>
          </div>
        )
      },
      tr: {
        title: "Problem 😔",
        content: (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="glass-dark p-8 rounded-2xl border-2 border-amber-500/30">
              <h3 className="text-3xl font-bold mb-4 text-red-400">Kripto Yalnız</h3>
              <p className="text-xl text-amber-200">Ekranlarda mahkum. Gerçek dünya etkileşimi yok.</p>
            </div>
            <div className="glass-dark p-8 rounded-2xl border-2 border-amber-500/30">
              <h3 className="text-3xl font-bold mb-4 text-orange-400">Parçalı Deneyim</h3>
              <p className="text-xl text-amber-200">1 basit şey için 4 farklı uygulama.</p>
            </div>
            <div className="glass-dark p-8 rounded-2xl border-2 border-amber-500/30">
              <h3 className="text-3xl font-bold mb-4 text-yellow-400">Etkileşim Yok</h3>
              <p className="text-xl text-amber-200">Sıkıcı arayüzler. Oyunlaştırma yok. Eğlence yok.</p>
            </div>
          </div>
        )
      },
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      theme: 'dark'
    },
    {
      en: {
        title: "The Solution ✨",
        subtitle: "We bring Crypto to the Streets",
        content: (
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative mb-12"
            >
              <div className="text-9xl">📍</div>
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-48 h-48 rounded-full bg-[#00ff9d]/20 blur-2xl"></div>
              </motion.div>
            </motion.div>
            <h3 className="text-4xl font-bold mb-6 text-gradient">
              Geo-Drop: Pokémon GO meets DeFi
            </h3>
            <p className="text-2xl text-gray-300 mb-8">
              Drop crypto tokens at real-world locations. Let users hunt and claim them.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="glass p-6 rounded-xl">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-[#00ff9d]" />
                <p className="text-lg">Location-Based</p>
              </div>
              <div className="glass p-6 rounded-xl">
                <Zap className="w-12 h-12 mx-auto mb-4 text-[#00d4ff]" />
                <p className="text-lg">Instant Claims</p>
              </div>
              <div className="glass p-6 rounded-xl">
                <Users className="w-12 h-12 mx-auto mb-4 text-[#00ff9d]" />
                <p className="text-lg">Social & Fun</p>
              </div>
            </div>
          </div>
        )
      },
      tr: {
        title: "Çözüm ✨",
        subtitle: "Kriptoyu Sokaklara Taşıyoruz",
        content: (
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative mb-12"
            >
              <div className="text-9xl">📍</div>
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-48 h-48 rounded-full bg-amber-500/20 blur-2xl"></div>
              </motion.div>
            </motion.div>
            <h3 className="text-4xl font-bold mb-6 text-amber-400">
              Geo-Drop: Pokémon GO + DeFi
            </h3>
            <p className="text-2xl text-amber-200 mb-8">
              Gerçek dünya konumlarına kripto token'ları bırak. Kullanıcılar avsınlar ve talep etsinler.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="glass p-6 rounded-xl border-2 border-amber-500/30">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                <p className="text-lg text-amber-200">Konum Tabanlı</p>
              </div>
              <div className="glass p-6 rounded-xl border-2 border-amber-500/30">
                <Zap className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                <p className="text-lg text-amber-200">Anında Talep</p>
              </div>
              <div className="glass p-6 rounded-xl border-2 border-amber-500/30">
                <Users className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                <p className="text-lg text-amber-200">Sosyal & Eğlenceli</p>
              </div>
            </div>
          </div>
        )
      },
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a4d2e 50%, #0a0a0a 100%)',
      theme: 'bright'
    },
    {
      en: {
        title: "Why Stellar? ⭐",
        subtitle: "The Winning Argument",
        content: (
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-8 text-center text-gradient">Fee Comparison</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="glass-dark p-8 rounded-2xl text-center">
                  <img src="https://cdn.simpleicons.org/ethereum/627EEA" alt="Ethereum" className="w-16 h-16 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold mb-4 text-red-400">Ethereum</h4>
                  <div className="text-6xl font-bold text-red-400 mb-2">$5.00</div>
                  <p className="text-xl text-gray-300">per transaction</p>
                  <p className="text-lg text-red-300 mt-4">❌ Too expensive for micro-drops</p>
                </div>
                <div className="glass p-8 rounded-2xl text-center border-2 border-[#00ff9d]">
                  <img src="https://cdn.simpleicons.org/stellar/7D00FF" alt="Stellar" className="w-16 h-16 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold mb-4 text-[#00ff9d]">Stellar</h4>
                  <div className="text-6xl font-bold text-[#00ff9d] mb-2">$0.00001</div>
                  <p className="text-xl text-gray-300">per transaction</p>
                  <p className="text-lg text-[#00ff9d] mt-4">✅ Perfect for gamification!</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="glass p-6 rounded-xl">
                <Zap className="w-10 h-10 mb-3 text-[#00ff9d]" />
                <h4 className="text-xl font-bold mb-2">Lightning Fast</h4>
                <p className="text-gray-300">~3-5 seconds confirmation</p>
              </div>
              <div className="glass p-6 rounded-xl">
                <Shield className="w-10 h-10 mb-3 text-[#00d4ff]" />
                <h4 className="text-xl font-bold mb-2">Battle-Tested</h4>
                <p className="text-gray-300">10+ years of reliability</p>
              </div>
            </div>
          </div>
        )
      },
      tr: {
        title: "Neden Stellar? ⭐",
        subtitle: "Kazanan Argüman",
        content: (
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-8 text-center text-amber-400">Ücret Karşılaştırması</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="glass-dark p-8 rounded-2xl text-center border-2 border-amber-500/30">
                  <img src="https://cdn.simpleicons.org/ethereum/627EEA" alt="Ethereum" className="w-16 h-16 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold mb-4 text-red-400">Ethereum</h4>
                  <div className="text-6xl font-bold text-red-400 mb-2">$5.00</div>
                  <p className="text-xl text-amber-200">işlem başına</p>
                  <p className="text-lg text-red-300 mt-4">❌ Mikro-drop'lar için çok pahalı</p>
                </div>
                <div className="glass p-8 rounded-2xl text-center border-2 border-amber-400">
                  <img src="https://cdn.simpleicons.org/stellar/7D00FF" alt="Stellar" className="w-16 h-16 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold mb-4 text-amber-400">Stellar</h4>
                  <div className="text-6xl font-bold text-amber-400 mb-2">$0.00001</div>
                  <p className="text-xl text-amber-200">işlem başına</p>
                  <p className="text-lg text-amber-400 mt-4">✅ Oyunlaştırma için mükemmel!</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="glass p-6 rounded-xl border-2 border-amber-500/30">
                <Zap className="w-10 h-10 mb-3 text-amber-400" />
                <h4 className="text-xl font-bold mb-2 text-amber-200">Şimşek Hızı</h4>
                <p className="text-amber-200">~3-5 saniye onay</p>
              </div>
              <div className="glass p-6 rounded-xl border-2 border-amber-500/30">
                <Shield className="w-10 h-10 mb-3 text-amber-400" />
                <h4 className="text-xl font-bold mb-2 text-amber-200">Savaş Testi Geçmiş</h4>
                <p className="text-amber-200">10+ yıl güvenilirlik</p>
              </div>
            </div>
          </div>
        )
      },
      background: 'radial-gradient(circle at center, #1a1a4d 0%, #0a0a0a 100%)',
      theme: 'space'
    },
    {
      en: {
        title: "Business Model 💼",
        subtitle: "Location-Based SocialFi",
        content: (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 gap-8 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass p-8 rounded-2xl text-center cursor-pointer"
              >
                <div className="text-6xl mb-4">👤</div>
                <h3 className="text-2xl font-bold mb-4 text-[#00ff9d]">Personal</h3>
                <ul className="text-left space-y-2 text-gray-300">
                  <li>• Birthday surprises</li>
                  <li>• Treasure hunts</li>
                  <li>• Gift drops</li>
                  <li>• Event rewards</li>
                </ul>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass p-8 rounded-2xl text-center cursor-pointer"
              >
                <div className="text-6xl mb-4">🏢</div>
                <h3 className="text-2xl font-bold mb-4 text-[#00d4ff]">Business</h3>
                <ul className="text-left space-y-2 text-gray-300">
                  <li>• Customer acquisition</li>
                  <li>• Loyalty programs</li>
                  <li>• Foot traffic boost</li>
                  <li>• Brand awareness</li>
                </ul>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass p-8 rounded-2xl text-center cursor-pointer"
              >
                <div className="text-6xl mb-4">❤️</div>
                <h3 className="text-2xl font-bold mb-4 text-[#ff006e]">Non-Profit</h3>
                <ul className="text-left space-y-2 text-gray-300">
                  <li>• Donation drives</li>
                  <li>• Community events</li>
                  <li>• Awareness campaigns</li>
                  <li>• Volunteer rewards</li>
                </ul>
              </motion.div>
            </div>
            <div className="glass-enhanced p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-center text-gradient">Real-World Example</h3>
              <div className="flex items-center justify-center gap-6">
                <div className="text-5xl">☕</div>
                <div className="text-left">
                  <p className="text-xl text-gray-300">
                    <span className="font-bold text-[#00ff9d]">Starbucks</span> drops tokens in-store
                  </p>
                  <p className="text-lg text-gray-400 mt-2">
                    → Drives foot traffic • Increases sales • Builds loyalty
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      tr: {
        title: "İş Modeli 💼",
        subtitle: "Konum Tabanlı SocialFi",
        content: (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 gap-8 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass p-8 rounded-2xl text-center cursor-pointer border-2 border-amber-500/30"
              >
                <div className="text-6xl mb-4">👤</div>
                <h3 className="text-2xl font-bold mb-4 text-amber-400">Kişisel</h3>
                <ul className="text-left space-y-2 text-amber-200">
                  <li>• Doğum günü sürprizleri</li>
                  <li>• Hazine avları</li>
                  <li>• Hediye bırakma</li>
                  <li>• Etkinlik ödülleri</li>
                </ul>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass p-8 rounded-2xl text-center cursor-pointer border-2 border-amber-500/30"
              >
                <div className="text-6xl mb-4">🏢</div>
                <h3 className="text-2xl font-bold mb-4 text-amber-400">İş</h3>
                <ul className="text-left space-y-2 text-amber-200">
                  <li>• Müşteri kazanımı</li>
                  <li>• Sadakat programları</li>
                  <li>• Trafik artışı</li>
                  <li>• Marka bilinirliği</li>
                </ul>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass p-8 rounded-2xl text-center cursor-pointer border-2 border-amber-500/30"
              >
                <div className="text-6xl mb-4">❤️</div>
                <h3 className="text-2xl font-bold mb-4 text-amber-400">Kâr Amacı Gütmeyen</h3>
                <ul className="text-left space-y-2 text-amber-200">
                  <li>• Bağış kampanyaları</li>
                  <li>• Topluluk etkinlikleri</li>
                  <li>• Farkındalık kampanyaları</li>
                  <li>• Gönüllü ödülleri</li>
                </ul>
              </motion.div>
            </div>
            <div className="glass-enhanced p-8 rounded-2xl border-2 border-amber-500/30">
              <h3 className="text-2xl font-bold mb-4 text-center text-amber-400">Gerçek Dünya Örneği</h3>
              <div className="flex items-center justify-center gap-6">
                <div className="text-5xl">☕</div>
                <div className="text-left">
                  <p className="text-xl text-amber-200">
                    <span className="font-bold text-amber-400">Starbucks</span> mağaza içinde token bırakır
                  </p>
                  <p className="text-lg text-amber-300 mt-2">
                    → Trafiği artırır • Satışları yükseltir • Sadakat oluşturur
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      theme: 'gradient'
    },
    {
      en: {
        title: "Smart Contracts 🔐",
        subtitle: "Powered by Soroban",
        content: (
          <div className="max-w-5xl mx-auto">
            <div className="glass-enhanced p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold mb-6 text-[#00ff9d]">How It Works</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00ff9d]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[#00ff9d]">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Create Drop</h4>
                    <p className="text-gray-300">Sponsor defines: Amount, Location (Lat/Long), Radius, Expiry</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00d4ff]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[#00d4ff]">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Location Verification</h4>
                    <p className="text-gray-300">Smart contract checks if user is within specified radius</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00ff9d]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[#00ff9d]">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Instant Claim</h4>
                    <p className="text-gray-300">Tokens transferred directly to user's wallet - no middleman!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass p-6 rounded-xl">
              <Code className="w-12 h-12 mx-auto mb-4 text-[#00ff9d]" />
              <p className="text-center text-lg text-gray-300">
                <span className="font-bold text-[#00ff9d]">Rust-based</span> smart contracts on Soroban
              </p>
              <p className="text-center text-gray-400 mt-2">
                Fast • Secure • Cost-effective
              </p>
            </div>
          </div>
        )
      },
      tr: {
        title: "Akıllı Sözleşmeler 🔐",
        subtitle: "Soroban Tarafından Güçlendirildi",
        content: (
          <div className="max-w-5xl mx-auto">
            <div className="glass-enhanced p-8 rounded-2xl mb-8 border-2 border-amber-500/30">
              <h3 className="text-2xl font-bold mb-6 text-amber-400">Nasıl Çalışır</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-amber-400">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-amber-200">Drop Oluştur</h4>
                    <p className="text-amber-200">Sponsor tanımlar: Miktar, Konum (Enlem/Boylam), Yarıçap, Son Kullanma</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-amber-400">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-amber-200">Konum Doğrulama</h4>
                    <p className="text-amber-200">Akıllı sözleşme kullanıcının belirtilen yarıçap içinde olup olmadığını kontrol eder</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-amber-400">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-amber-200">Anında Talep</h4>
                    <p className="text-amber-200">Token'lar doğrudan kullanıcının cüzdanına aktarılır - aracı yok!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass p-6 rounded-xl border-2 border-amber-500/30">
              <Code className="w-12 h-12 mx-auto mb-4 text-amber-400" />
              <p className="text-center text-lg text-amber-200">
                Soroban üzerinde <span className="font-bold text-amber-400">Rust tabanlı</span> akıllı sözleşmeler
              </p>
              <p className="text-center text-amber-300 mt-2">
                Hızlı • Güvenli • Uygun maliyetli
              </p>
            </div>
          </div>
        )
      },
      background: 'radial-gradient(circle at top, #1a1a4d 0%, #0a0a0a 60%)',
      theme: 'space'
    },
    {
      en: {
        title: "Tech Stack 🛠️",
        content: (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-2xl text-center hover-lift cursor-pointer">
                <img src="https://cdn.simpleicons.org/nextdotjs/000000" alt="Next.js" className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Next.js 14</h3>
                <p className="text-gray-400 text-sm">React Framework</p>
              </div>
              <div className="glass p-8 rounded-2xl text-center hover-lift cursor-pointer">
                <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind CSS" className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Tailwind CSS</h3>
                <p className="text-gray-400 text-sm">Styling</p>
              </div>
              <div className="glass p-8 rounded-2xl text-center hover-lift cursor-pointer">
                <img src="https://cdn.simpleicons.org/stellar/7D00FF" alt="Soroban" className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Soroban</h3>
                <p className="text-gray-400 text-sm">Smart Contracts</p>
              </div>
              <div className="glass p-8 rounded-2xl text-center hover-lift cursor-pointer">
                <img src="https://cdn.simpleicons.org/stellar/7D00FF" alt="Stellar SDK" className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Stellar SDK</h3>
                <p className="text-gray-400 text-sm">Blockchain</p>
              </div>
              <div className="glass p-8 rounded-2xl text-center hover-lift cursor-pointer">
                <img src="https://cdn.simpleicons.org/stellar/7D00FF" alt="Freighter" className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Freighter</h3>
                <p className="text-gray-400 text-sm">Wallet Integration</p>
              </div>
              <div className="glass p-8 rounded-2xl text-center hover-lift cursor-pointer">
                <img src="https://cdn.simpleicons.org/mongodb/47A248" alt="MongoDB" className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">MongoDB</h3>
                <p className="text-gray-400 text-sm">Database</p>
              </div>
            </div>
            <div className="mt-12 glass-enhanced p-6 rounded-xl">
              <div className="flex items-center justify-center gap-6">
                <Layers className="w-10 h-10 text-[#00ff9d]" />
                <p className="text-xl text-gray-300">
                  <span className="font-bold text-[#00ff9d]">Full-Stack</span> • 
                  <span className="font-bold text-[#00d4ff]"> Type-Safe</span> • 
                  <span className="font-bold text-[#00ff9d]"> Production-Ready</span>
                </p>
              </div>
            </div>
          </div>
        )
      },
      tr: {
        title: "Teknoloji Yığını 🛠️",
        content: (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-2xl text-center hover-lift cursor-pointer border-2 border-amber-500/30">
                <img src="https://cdn.simpleicons.org/nextdotjs/000000" alt="Next.js" className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-amber-200">Next.js 14</h3>
                <p className="text-amber-300 text-sm">React Framework</p>
              </div>
              <div className="glass p-8 rounded-2xl text-center hover-lift cursor-pointer border-2 border-amber-500/30">
                <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind CSS" className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-amber-200">Tailwind CSS</h3>
                <p className="text-amber-300 text-sm">Stil</p>
              </div>
              <div className="glass p-8 rounded-2xl text-center hover-lift cursor-pointer border-2 border-amber-500/30">
                <img src="https://cdn.simpleicons.org/stellar/7D00FF" alt="Soroban" className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-amber-200">Soroban</h3>
                <p className="text-amber-300 text-sm">Akıllı Sözleşmeler</p>
              </div>
              <div className="glass p-8 rounded-2xl text-center hover-lift cursor-pointer border-2 border-amber-500/30">
                <img src="https://cdn.simpleicons.org/stellar/7D00FF" alt="Stellar SDK" className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-amber-200">Stellar SDK</h3>
                <p className="text-amber-300 text-sm">Blockchain</p>
              </div>
              <div className="glass p-8 rounded-2xl text-center hover-lift cursor-pointer border-2 border-amber-500/30">
                <img src="https://cdn.simpleicons.org/stellar/7D00FF" alt="Freighter" className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-amber-200">Freighter</h3>
                <p className="text-amber-300 text-sm">Cüzdan Entegrasyonu</p>
              </div>
              <div className="glass p-8 rounded-2xl text-center hover-lift cursor-pointer border-2 border-amber-500/30">
                <img src="https://cdn.simpleicons.org/mongodb/47A248" alt="MongoDB" className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-amber-200">MongoDB</h3>
                <p className="text-amber-300 text-sm">Veritabanı</p>
              </div>
            </div>
            <div className="mt-12 glass-enhanced p-6 rounded-xl border-2 border-amber-500/30">
              <div className="flex items-center justify-center gap-6">
                <Layers className="w-10 h-10 text-amber-400" />
                <p className="text-xl text-amber-200">
                  <span className="font-bold text-amber-400">Full-Stack</span> • 
                  <span className="font-bold text-amber-400"> Tip Güvenli</span> • 
                  <span className="font-bold text-amber-400"> Üretime Hazır</span>
                </p>
              </div>
            </div>
          </div>
        )
      },
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      theme: 'gradient'
    },
    {
      en: {
        title: "Try It Now! 📱",
        content: (
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-12"
            >
              <div className="inline-block glass-enhanced p-12 rounded-3xl">
                <img src="/qr.png" alt="QR Code" className="w-64 h-64 mx-auto mb-4" />
                <p className="text-xl text-gray-300">Scan QR Code for Mobile Demo</p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <a 
                href="https://stellargo.app" 
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-6 rounded-xl hover-lift cursor-pointer"
              >
                <Globe className="w-12 h-12 mx-auto mb-3 text-[#00ff9d]" />
                <h3 className="text-lg font-bold mb-2">Live Demo</h3>
                <p className="text-sm text-gray-400">stellargo.app</p>
              </a>
              <a 
                href="https://github.com/MYounesDev" 
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-6 rounded-xl hover-lift cursor-pointer"
              >
                <Code className="w-12 h-12 mx-auto mb-3 text-[#00d4ff]" />
                <h3 className="text-lg font-bold mb-2">GitHub</h3>
                <p className="text-sm text-gray-400">Open Source</p>
              </a>
              <a 
                href="https://www.linkedin.com/in/Myounesdev" 
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-6 rounded-xl hover-lift cursor-pointer"
              >
                <Users className="w-12 h-12 mx-auto mb-3 text-[#00ff9d]" />
                <h3 className="text-lg font-bold mb-2">Connect</h3>
                <p className="text-sm text-gray-400">LinkedIn</p>
              </a>
            </div>

            <div className="glass-enhanced p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-4 text-gradient">
                Thank You! 🙏
              </h3>
              <p className="text-xl text-gray-300">
                Questions? Let's chat!
              </p>
            </div>
          </div>
        )
      },
      tr: {
        title: "Şimdi Dene! 📱",
        content: (
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-12"
            >
              <div className="inline-block glass-enhanced p-12 rounded-3xl border-2 border-amber-500/30">
                <img src="/qr.png" alt="QR Code" className="w-64 h-64 mx-auto mb-4" />
                <p className="text-xl text-amber-200">Mobil Demo için QR Kodu Tara</p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <a 
                href="https://stellargo.app" 
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-6 rounded-xl hover-lift cursor-pointer border-2 border-amber-500/30"
              >
                <Globe className="w-12 h-12 mx-auto mb-3 text-amber-400" />
                <h3 className="text-lg font-bold mb-2 text-amber-200">Canlı Demo</h3>
                <p className="text-sm text-amber-300">stellargo.app</p>
              </a>
              <a 
                href="https://github.com/MYounesDev" 
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-6 rounded-xl hover-lift cursor-pointer border-2 border-amber-500/30"
              >
                <Code className="w-12 h-12 mx-auto mb-3 text-amber-400" />
                <h3 className="text-lg font-bold mb-2 text-amber-200">GitHub</h3>
                <p className="text-sm text-amber-300">Açık Kaynak</p>
              </a>
              <a 
                href="https://www.linkedin.com/in/Myounesdev" 
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-6 rounded-xl hover-lift cursor-pointer border-2 border-amber-500/30"
              >
                <Users className="w-12 h-12 mx-auto mb-3 text-amber-400" />
                <h3 className="text-lg font-bold mb-2 text-amber-200">Bağlan</h3>
                <p className="text-sm text-amber-300">LinkedIn</p>
              </a>
            </div>

            <div className="glass-enhanced p-8 rounded-2xl border-2 border-amber-500/30">
              <h3 className="text-3xl font-bold mb-4 text-amber-400">
                Teşekkürler! 🙏
              </h3>
              <p className="text-xl text-amber-200">
                Sorular? Hadi sohbet edelim!
              </p>
            </div>
          </div>
        )
      },
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a4d2e 25%, #0a0a0a 50%, #1a4d2e 75%, #0a0a0a 100%)',
      theme: 'bright'
    }
  ];

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape' && isFullscreen) {
        document.exitFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isFullscreen]);

  // Mouse wheel language toggle
  useEffect(() => {
    if (!turkishEnabled) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setLanguage((prev) => prev === 'en' ? 'tr' : 'en');
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [turkishEnabled]);

  // Mouse click navigation
  const handleClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x > width / 2) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  // Right-click navigation
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    prevSlide();
  };

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
        setIsStarted(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Start presentation
  const startPresentation = () => {
    toggleFullscreen();
  };

  const currentContent = language === 'tr' && slides[currentSlide].tr 
    ? slides[currentSlide].tr 
    : slides[currentSlide].en;

  // Animated stars for space theme
  const renderStars = () => {
    return Array.from({ length: 50 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 2 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ));
  };

  if (!isStarted) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: slides[0].background }}
      >
        {renderStars()}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-8xl font-bold mb-6 text-gradient">StellarGo</h1>
            <p className="text-3xl text-gray-300 mb-12">Interactive Presentation</p>
            <motion.button
              onClick={startPresentation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-[#00ff9d] text-black rounded-xl text-2xl font-bold hover:bg-[#00d480] transition-colors flex items-center gap-3 mx-auto"
            >
              <Maximize className="w-8 h-8" />
              Start Presentation
            </motion.button>
            <p className="text-gray-400 mt-6">
              Press ESC to exit fullscreen • Use ← → to navigate
              {turkishEnabled && ' • Scroll to toggle language'}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background with animation */}
      <motion.div
        key={`bg-${currentSlide}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
        style={{ background: slides[currentSlide].background }}
      >
        {slides[currentSlide].theme === 'space' && renderStars()}
      </motion.div>

      {/* Main content */}
      <div 
        className="relative h-full flex flex-col cursor-pointer"
        onClick={handleClick}
        onContextMenu={handleContextMenu}
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6">
          {!isFullscreen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="glass px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Maximize className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1" />
          {turkishEnabled && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setLanguage((prev) => prev === 'en' ? 'tr' : 'en');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`glass px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                language === 'tr' ? 'bg-amber-500/20 border-2 border-amber-400' : 'hover:bg-white/10'
              }`}
            >
              <Globe className="w-5 h-5" />
              <span className="font-bold">{language === 'en' ? 'EN' : 'TR'}</span>
            </motion.button>
          )}
        </div>

        {/* Slide content */}
        <div className="flex-1 flex items-center justify-center px-12 py-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSlide}-${language}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-7xl"
            >
              <motion.h1 
                className={`text-6xl md:text-7xl font-bold mb-6 text-center ${
                  language === 'tr' ? 'text-amber-400' : 'text-white'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {currentContent!.title}
              </motion.h1>
              
              {currentContent!.subtitle && (
                <motion.p 
                  className={`text-2xl md:text-3xl text-center mb-12 ${
                    language === 'tr' ? 'text-amber-300' : 'text-gray-300'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {currentContent!.subtitle}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {currentContent!.content}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom navigation */}
        <div className="absolute bottom-0 left-0 right-0 z-50 p-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="glass px-6 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden md:inline">Previous</span>
            </button>

            {/* Slide indicators */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlide(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'w-12 bg-[#00ff9d]' 
                      : 'w-2 bg-gray-500 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="glass px-6 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
              disabled={currentSlide === slides.length - 1}
            >
              <span className="hidden md:inline">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4 max-w-7xl mx-auto">
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00ff9d] to-[#00d4ff]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

