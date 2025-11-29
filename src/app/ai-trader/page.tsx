'use client';

import React, { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AITraderPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI trading assistant. I can analyze tokens on the Stellar Network and provide insights. Try asking me about a specific token!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const mockResponses = [
    {
      keywords: ['xlm', 'stellar', 'lumen'],
      response: "📊 **XLM (Stellar Lumens) Analysis**\n\n**Current Status:** Strong fundamentals\n\n**Strengths:**\n- Fast transaction speeds (~5 seconds)\n- Low fees (~$0.00001 per transaction)\n- Strong partnerships with financial institutions\n- Growing DeFi ecosystem\n\n**Recommendation:** 🟢 **BUY/HOLD**\n\nStellar has solid long-term potential, especially for cross-border payments and DeFi applications.",
    },
    {
      keywords: ['usdc', 'usd coin', 'stablecoin'],
      response: "💵 **USDC Analysis**\n\n**Current Status:** Stable and reliable\n\n**Overview:**\n- Fully backed 1:1 with US dollars\n- Excellent for preserving value\n- High liquidity on Stellar DEX\n- Low volatility\n\n**Recommendation:** 🟡 **HOLD**\n\nPerfect for stable value storage and trading pairs. Not for speculation, but essential for portfolio stability.",
    },
    {
      keywords: ['aqua', 'aquarius'],
      response: "🌊 **AQUA Token Analysis**\n\n**Current Status:** Growing community token\n\n**Highlights:**\n- Native governance token for Aquarius\n- Rewards for liquidity providers\n- Active community\n- Regular airdrops\n\n**Recommendation:** 🟢 **CONSIDER BUY**\n\nGood entry point for Stellar DeFi ecosystem participation. Medium risk, medium reward potential.",
    },
    {
      keywords: ['yxlm', 'ultra stellar'],
      response: "⚡ **yXLM (Ultra Stellar) Analysis**\n\n**Current Status:** Innovative DeFi product\n\n**Features:**\n- Liquid staking derivative\n- Earn while maintaining liquidity\n- Automated yield optimization\n- Low smart contract risk\n\n**Recommendation:** 🟢 **BUY**\n\nExcellent for passive income while staying liquid. Lower risk than traditional staking.",
    },
  ];

  const generateMockResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    // Check for keyword matches
    for (const mock of mockResponses) {
      if (mock.keywords.some(keyword => lowerInput.includes(keyword))) {
        return mock.response;
      }
    }

    // Generic response
    if (lowerInput.includes('buy') || lowerInput.includes('sell') || lowerInput.includes('trade')) {
      return "📈 I can analyze specific tokens for you! Try asking about:\n\n- XLM (Stellar Lumens)\n- USDC (Stablecoin)\n- AQUA (Aquarius)\n- yXLM (Ultra Stellar)\n\nJust mention the token name and I'll provide an analysis with buy/sell recommendations!";
    }

    if (lowerInput.includes('portfolio') || lowerInput.includes('diversify')) {
      return "💼 **Portfolio Diversification Strategy**\n\n**Recommended Allocation:**\n- 40% XLM (Core holding)\n- 30% USDC (Stability)\n- 20% AQUA (Growth potential)\n- 10% yXLM (Passive income)\n\n**Risk Level:** Medium\n\nThis balanced approach provides stability while capturing growth opportunities in the Stellar ecosystem.";
    }

    if (lowerInput.includes('risk') || lowerInput.includes('safe')) {
      return "🛡️ **Risk Management Tips**\n\n1. **Never invest more than you can afford to lose**\n2. **Diversify across multiple assets**\n3. **Use stablecoins to preserve profits**\n4. **Set stop-loss orders**\n5. **Stay informed about market conditions**\n\n**Current Market Sentiment:** Cautiously optimistic\n\nWould you like analysis on a specific token?";
    }

    return "🤖 I'm here to help with token analysis on the Stellar Network!\n\n**I can help with:**\n- Token price analysis\n- Buy/Sell recommendations\n- Portfolio diversification\n- Risk assessment\n- Market trends\n\n**Try asking:**\n- \"Analyze XLM\"\n- \"Should I buy AQUA?\"\n- \"What's your portfolio recommendation?\"\n- \"Is now a good time to trade?\"";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: generateMockResponse(input),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-accent-900 mb-2">
            AI Trading Assistant
          </h1>
          <p className="text-accent-600">
            Get intelligent insights and recommendations for Stellar Network tokens
          </p>
        </div>

        {/* Chat Container */}
        <Card className="flex-1 flex flex-col overflow-hidden" padding="none">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-accent-100 text-accent-900'
                  }`}
                >
                  <p className="text-sm md:text-base whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-primary-100' : 'text-accent-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-accent-100 rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-accent-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about tokens, get trading insights..."
                className="flex-1 px-4 py-3 border-2 border-accent-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors text-accent-900 placeholder-accent-400"
                disabled={loading}
              />
              <Button
                variant="primary"
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-6"
              >
                Send
              </Button>
            </div>
          </div>
        </Card>

        {/* Disclaimer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-accent-500">
            ⚠️ This is a mock AI assistant for demonstration purposes. Not financial advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AITraderPage;

