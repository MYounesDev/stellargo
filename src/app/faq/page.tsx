import React from 'react';
import Card from '@/components/Card';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'What is StellarGo?',
          a: 'StellarGo is a location-based cryptocurrency platform built on the Stellar Network. It allows users to "drop" crypto at physical locations for others to discover and claim, creating a real-world treasure hunt experience with digital assets.',
        },
        {
          q: 'How do I start using StellarGo?',
          a: 'Simply connect your Freighter wallet, enable location services, and you\'re ready! You can start dropping crypto at any location or search the map for nearby drops to claim.',
        },
        {
          q: 'Do I need cryptocurrency to use StellarGo?',
          a: 'Yes, you need XLM (Stellar Lumens) in your Freighter wallet to create drops. However, you can claim drops without any initial investment. Get free testnet XLM from the Stellar Friendbot for testing.',
        },
      ],
    },
    {
      category: 'Why Stellar?',
      questions: [
        {
          q: 'Why did we choose the Stellar Network?',
          a: 'Stellar offers lightning-fast transactions (~5 seconds), extremely low fees (~$0.00001), and built-in DEX functionality. It\'s perfect for micro-transactions and real-world use cases like StellarGo.',
        },
        {
          q: 'What are the benefits of Stellar over other blockchains?',
          a: 'Stellar provides instant finality, minimal environmental impact, and is specifically designed for payments and asset transfers. Unlike Ethereum, you don\'t need to worry about gas fees eating into small transactions.',
        },
        {
          q: 'Is Stellar secure?',
          a: 'Yes! Stellar uses the Stellar Consensus Protocol (SCP), which is proven to be secure and efficient. The network has been operational since 2014 with no major security incidents.',
        },
      ],
    },
    {
      category: 'How to Play',
      questions: [
        {
          q: 'How do I create a Geo-Drop?',
          a: 'Connect your wallet, click any location on the map (or use "Drop Here" for your current location), enter the amount of XLM and a message, then confirm. The crypto will be locked at that location for others to find!',
        },
        {
          q: 'How close do I need to be to claim a drop?',
          a: 'You must be within 50 meters (approximately 164 feet) of a drop to claim it. This ensures you\'re actually at the physical location and prevents remote claiming.',
        },
        {
          q: 'Can I see all drops on the map?',
          a: 'Yes! All active (unclaimed) drops are visible on the map as blue markers with a dollar sign. Tap any marker to see the amount, message, and claim button if you\'re in range.',
        },
        {
          q: 'What happens to unclaimed drops?',
          a: 'Currently, drops remain active indefinitely until claimed. Future versions may include expiration times where unclaimed funds return to the creator.',
        },
      ],
    },
    {
      category: 'Security & Privacy',
      questions: [
        {
          q: 'Is my wallet safe?',
          a: 'Absolutely! StellarGo uses Freighter wallet, which means your private keys never leave your device. We only request your public key for transactions, which you must approve individually.',
        },
        {
          q: 'What location data do you store?',
          a: 'We only store the coordinates of drops you create and your location when claiming (to verify proximity). We never track your movements or store historical location data.',
        },
        {
          q: 'Can someone steal my drop?',
          a: 'Drops can only be claimed by users physically present at the location (within 50m). The blockchain ensures all transactions are immutable and transparent.',
        },
        {
          q: 'What if I lose access to my wallet?',
          a: 'Always backup your Freighter wallet recovery phrase! If you lose access and haven\'t backed up your phrase, your funds cannot be recovered. This is a fundamental principle of blockchain technology.',
        },
      ],
    },
    {
      category: 'Technical Details',
      questions: [
        {
          q: 'Is this on mainnet or testnet?',
          a: 'StellarGo is currently deployed on Stellar Testnet for hackathon and demonstration purposes. Before mainnet launch, we\'ll conduct thorough security audits and testing.',
        },
        {
          q: 'How are transactions processed?',
          a: 'When you create a drop, XLM is sent to a holding wallet with a memo. When claimed, the funds are transferred from the holding wallet to the claimer. All transactions are recorded on the Stellar blockchain.',
        },
        {
          q: 'What are the transaction fees?',
          a: 'Stellar\'s base fee is 0.00001 XLM per operation (less than $0.001). Creating and claiming drops each count as one operation, making the platform extremely cost-effective.',
        },
        {
          q: 'Are smart contracts used?',
          a: 'Yes! We\'re developing Soroban smart contracts for advanced features like time-locked drops, multi-signature claims, and automated reward pools. The MVP uses simpler transaction-based logic.',
        },
      ],
    },
    {
      category: 'Troubleshooting',
      questions: [
        {
          q: 'The map isn\'t loading. What should I do?',
          a: 'Make sure you\'ve enabled location services in your browser. Refresh the page and allow location access when prompted. If issues persist, try a different browser or check your internet connection.',
        },
        {
          q: 'My wallet won\'t connect. Help!',
          a: 'Ensure you have the Freighter wallet extension installed and unlocked. Visit freighter.app to install. Make sure you\'re using a supported browser (Chrome, Firefox, Brave, Edge).',
        },
        {
          q: 'I\'m near a drop but can\'t claim it.',
          a: 'Check that: 1) Your location services are active, 2) You\'re within 50 meters, 3) The drop hasn\'t been claimed already, 4) Your wallet is connected. Try refreshing your location.',
        },
        {
          q: 'Transaction failed. What now?',
          a: 'Common causes: insufficient XLM balance, network congestion (rare on Stellar), or wallet disconnection. Check your balance, reconnect your wallet, and try again. Contact support if issues persist.',
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-accent-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-accent-600">
          Everything you need to know about StellarGo
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-8">
        {faqs.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-2xl font-bold text-primary-600 mb-4">
              {section.category}
            </h2>
            <div className="space-y-4">
              {section.questions.map((faq, faqIndex) => (
                <Card key={faqIndex} hover>
                  <h3 className="text-lg font-semibold text-accent-900 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-accent-700 leading-relaxed">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <Card className="mt-12 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-accent-900 mb-3">
            Still have questions?
          </h2>
          <p className="text-accent-700 mb-6">
            We're here to help! Reach out to our community or support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://discord.gg/stellar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Join Discord Community
            </a>
            <a
              href="mailto:support@stellargo.example"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </Card>

      {/* Additional Resources */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold text-accent-900 mb-4">
          Additional Resources
        </h3>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a
            href="https://stellar.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 underline"
          >
            Stellar Network
          </a>
          <span className="text-accent-300">•</span>
          <a
            href="https://freighter.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 underline"
          >
            Freighter Wallet
          </a>
          <span className="text-accent-300">•</span>
          <a
            href="https://soroban.stellar.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 underline"
          >
            Soroban Docs
          </a>
          <span className="text-accent-300">•</span>
          <a
            href="https://laboratory.stellar.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 underline"
          >
            Stellar Laboratory
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

