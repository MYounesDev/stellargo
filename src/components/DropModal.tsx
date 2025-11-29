'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { DropFormData } from '@/types';

interface DropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DropFormData) => Promise<void>;
  latitude: number;
  longitude: number;
}

const DropModal: React.FC<DropModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  latitude,
  longitude,
}) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < 0.1) {
      setError('Amount must be at least 0.1 XLM');
      return;
    }

    if (message.trim().length === 0) {
      setError('Please enter a message');
      return;
    }

    if (message.length > 200) {
      setError('Message must be 200 characters or less');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        amount: amountNum,
        message: message.trim(),
        latitude,
        longitude,
      });

      // Reset form
      setAmount('');
      setMessage('');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create drop');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Geo-Drop" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Display */}
        <div className="bg-accent-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-accent-700 mb-2">
            Drop Location
          </h3>
          <p className="text-xs text-accent-600">
            Latitude: {latitude.toFixed(6)}
          </p>
          <p className="text-xs text-accent-600">
            Longitude: {longitude.toFixed(6)}
          </p>
        </div>

        {/* Amount Input */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-semibold text-accent-900 mb-2"
          >
            Amount (XLM)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.1"
            min="0.1"
            placeholder="10.0"
            className="w-full px-4 py-3 border-2 border-accent-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors text-accent-900 placeholder-accent-400"
            required
          />
        </div>

        {/* Message Input */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-accent-900 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message for the finder..."
            rows={4}
            maxLength={200}
            className="w-full px-4 py-3 border-2 border-accent-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors text-accent-900 placeholder-accent-400 resize-none"
            required
          />
          <p className="text-xs text-accent-500 mt-1 text-right">
            {message.length}/200 characters
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="flex-1"
          >
            Create Drop
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DropModal;

