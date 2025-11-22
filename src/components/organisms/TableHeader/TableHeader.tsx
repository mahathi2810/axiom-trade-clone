'use client';

import React from 'react';

interface TableHeaderProps {
  title?: string;
  subtitle?: string;
  quickBuyAmount?: number;
  onQuickBuyChange?: (amount: number) => void;
  actions?: React.ReactNode;
}

export function TableHeader({
  title = "Token List",
  subtitle = "Real-time market data",
  quickBuyAmount = 1,
  onQuickBuyChange,
  actions,
}: TableHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {onQuickBuyChange && (
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Quick Buy:</label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={quickBuyAmount}
              onChange={(e) => onQuickBuyChange(parseFloat(e.target.value) || 0)}
              className="w-20 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-400">SOL</span>
          </div>
        )}
        
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export default TableHeader;
