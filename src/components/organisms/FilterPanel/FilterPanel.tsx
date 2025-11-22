'use client';

import React, { useState } from 'react';

interface FilterPanelProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  sortBy?: string;
  onSortChange?: (value: string) => void;
  filters?: {
    minPrice?: number;
    maxPrice?: number;
    minChange?: number;
    maxChange?: number;
  };
  onFilterChange?: (filters: any) => void;
}

export function FilterPanel({
  searchTerm: externalSearchTerm,
  onSearchChange,
  sortBy: externalSortBy,
  onSortChange,
  filters: externalFilters,
  onFilterChange,
}: FilterPanelProps) {
  // Use internal state if no external handlers provided
  const [internalSearchTerm, setInternalSearchTerm] = useState('');
  const [internalSortBy, setInternalSortBy] = useState('marketCap');
  const [internalFilters, setInternalFilters] = useState<any>({});

  const searchTerm = externalSearchTerm !== undefined ? externalSearchTerm : internalSearchTerm;
  const sortBy = externalSortBy !== undefined ? externalSortBy : internalSortBy;
  const filters = externalFilters !== undefined ? externalFilters : internalFilters;

  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
    } else {
      setInternalSearchTerm(value);
    }
  };

  const handleSortChange = (value: string) => {
    if (onSortChange) {
      onSortChange(value);
    } else {
      setInternalSortBy(value);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    if (onFilterChange) {
      onFilterChange(newFilters);
    } else {
      setInternalFilters(newFilters);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-6 border border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label htmlFor="search-token" className="block text-sm font-medium text-gray-400 mb-2">
            Search Token
          </label>
          <input
            id="search-token"
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by name or symbol..."
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoComplete="off"
          />
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sort-by" className="block text-sm font-medium text-gray-400 mb-2">
            Sort By
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="marketCap">Market Cap</option>
            <option value="volume">Volume</option>
            <option value="price">Price</option>
            <option value="change">24h Change</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Price Range
          </label>
          <div className="flex gap-2">
            <input
              id="min-price"
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) => {
                const value = e.target.value;
                handleFilterChange({
                  ...filters,
                  minPrice: value ? parseFloat(value) : undefined,
                });
              }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoComplete="off"
            />
            <input
              id="max-price"
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) => {
                const value = e.target.value;
                handleFilterChange({
                  ...filters,
                  maxPrice: value ? parseFloat(value) : undefined,
                });
              }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(filters.minPrice || filters.maxPrice || searchTerm) && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-400">Active filters:</span>
          {searchTerm && (
            <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">
              Search: {searchTerm}
            </span>
          )}
          {filters.minPrice && (
            <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">
              Min: ${filters.minPrice}
            </span>
          )}
          {filters.maxPrice && (
            <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">
              Max: ${filters.maxPrice}
            </span>
          )}
          <button
            onClick={() => {
              handleSearchChange('');
              handleFilterChange({});
            }}
            className="px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterPanel;
