'use client';

import React from 'react';

interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

interface TokenTableProps {
  tokens: Token[];
  onTokenClick?: (token: Token) => void;
  loading?: boolean;
}

export function TokenTable({ tokens, onTokenClick, loading = false }: TokenTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Loading tokens...</div>
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">No tokens found</div>
      </div>
    );
  }

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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Token
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              24h Change
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Volume (24h)
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Market Cap
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {tokens.map((token) => (
            <tr
              key={token.id}
              onClick={() => onTokenClick?.(token)}
              className="hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                    {token.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-white">{token.symbol}</div>
                    <div className="text-sm text-gray-400">{token.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-right text-white font-medium">
                {formatPrice(token.price)}
              </td>
              <td className="px-4 py-4 text-right">
                <span
                  className={`font-medium ${
                    token.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {token.change24h >= 0 ? '+' : ''}
                  {token.change24h.toFixed(2)}%
                </span>
              </td>
              <td className="px-4 py-4 text-right text-gray-300">
                {formatVolume(token.volume24h)}
              </td>
              <td className="px-4 py-4 text-right text-gray-300">
                {formatVolume(token.marketCap)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TokenTable;