'use client';

import React, { useEffect } from 'react';

interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

interface TokenModalProps {
  token: Token | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TokenModal({ token, isOpen, onClose }: TokenModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !token) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    if (volume >= 1e3) return `$${(volume / 1e3).toFixed(2)}K`;
    return `$${volume.toFixed(2)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 rounded-lg border border-gray-800 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {token.symbol.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{token.name}</h2>
              <p className="text-gray-400">{token.symbol}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Price Section */}
          <div>
            <p className="text-sm text-gray-400 mb-1">Current Price</p>
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-bold text-white">
                {formatPrice(token.price)}
              </p>
              <span
                className={`text-lg font-medium ${
                  token.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {token.change24h >= 0 ? '+' : ''}
                {token.change24h.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">24h Volume</p>
              <p className="text-xl font-semibold text-white">
                {formatVolume(token.volume24h)}
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">Market Cap</p>
              <p className="text-xl font-semibold text-white">
                {formatVolume(token.marketCap)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
              Buy {token.symbol}
            </button>
            <button className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors">
              Sell {token.symbol}
            </button>
          </div>

          {/* Additional Info */}
          <div className="pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              Token ID: {token.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenModal;