'use client';

import React, { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import Button from './Button';
import { Wallet, ExternalLink, X, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConnectWalletProps {
  onConnect?: (publicKey: string) => void;
  className?: string;
}

/**
 * ConnectWallet Component
 * Handles Freighter wallet connection following Stellar best practices
 * Reference: https://developers.stellar.org/docs/build/guides/dapps/frontend-guide
 */
const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect, className = '' }) => {
  const { publicKey, isConnected, isLoading, error, connect, disconnect } = useWallet();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConnect = async () => {
    try {
      setShowError(false);
      setShowSuccess(false);
      
      console.log('🔵 Connect button clicked');
      const pk = await connect();
      
      if (pk) {
        console.log('✅ Connection successful!');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        
        if (onConnect) {
          onConnect(pk);
        }
      }
    } catch (err: any) {
      console.error('❌ Connection failed:', err);
      setShowError(true);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowError(false);
    setShowSuccess(false);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Connected state - show wallet info
  if (isConnected && publicKey) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={className}
      >
        <div className="glass-dark rounded-2xl p-4 flex items-center justify-between border border-cyber-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-500 to-cyan-500 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-dark-500" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-xs text-slate-400">Connected</p>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-sm font-semibold text-white font-mono">{truncateAddress(publicKey)}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDisconnect}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 glass-dark rounded-xl p-3 border border-green-500/30"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <p className="text-sm text-green-400 font-medium">Wallet connected successfully!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Not connected state - show connect button
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Button
        variant="primary"
        onClick={handleConnect}
        loading={isLoading}
        disabled={isLoading}
        className="w-full"
      >
        <Wallet className="w-5 h-5 mr-2" />
        {isLoading ? 'Connecting...' : 'Connect Freighter Wallet'}
      </Button>

      {/* Loading state hint */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 glass-dark rounded-xl p-3 border border-cyan-500/30"
        >
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-cyan-500" />
            <p className="text-sm text-cyan-400">Please check the Freighter popup in your browser</p>
          </div>
        </motion.div>
      )}
      
      {/* Error Message */}
      <AnimatePresence>
        {showError && error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 glass-dark rounded-xl p-4 border border-red-500/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-400 font-medium">Connection Failed</p>
                </div>
                <p className="text-xs text-slate-400">{error}</p>
                
                {/* Helpful actions based on error type */}
                {(error.includes('not installed') || error.includes('extension')) && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-slate-400">To fix this:</p>
                    <ol className="text-xs text-slate-400 space-y-1 ml-4 list-decimal">
                      <li>Install Freighter from the official website</li>
                      <li>Restart your browser</li>
                      <li>Refresh this page and try again</li>
                    </ol>
                    <a
                      href="https://www.freighter.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-cyber-500 hover:text-cyber-400 transition-colors text-xs font-medium mt-2"
                    >
                      <span>Install Freighter</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                
                {error.includes('locked') && (
                  <p className="text-xs text-slate-500 mt-2">
                    Click the Freighter icon in your browser toolbar and unlock your wallet with your password.
                  </p>
                )}
                
                {error.includes('declined') && (
                  <p className="text-xs text-slate-500 mt-2">
                    Click "Connect Freighter Wallet" again and approve the request in the popup.
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowError(false)}
                className="text-green-300 hover:text-white transition-colors ml-2 bg-green-900/60 hover:bg-green-800/80 rounded-lg p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help text */}
      <div className="mt-3 text-center">
        <p className="text-slate-500 text-xs">
          Don't have Freighter?{' '}
          <a
            href="https://www.freighter.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyber-500 hover:text-cyber-400 transition-colors font-medium"
          >
            Get it here
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default ConnectWallet;
