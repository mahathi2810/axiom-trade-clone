'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setActiveTab } from '@/store/slices/filtersSlice';
import { useAllTokens, Token } from '@/features/pulse/hooks/useTokenData';
import { useWebSocketMock } from '@/features/pulse/hooks/useWebSocket';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TokenTable, FilterPanel, TokenModal, TableHeader } from '@/components/organisms';
import { Badge } from '@/components/atoms';

export default function PulsePage() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.filters.activeTab);
  const { newPairs, finalStretch, migrated, isLoading, isError } = useAllTokens();
  
  // Filter and sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('marketCap');
  const [priceFilter, setPriceFilter] = useState<{ minPrice?: number; maxPrice?: number }>({});
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Initialize WebSocket for real-time updates
  const { lastMessage } = useWebSocketMock();

  // Update token prices in real-time from WebSocket
  useEffect(() => {
    if (lastMessage && lastMessage.type === 'price_update') {
      console.log('Price update received:', lastMessage.data);
      // In a real app, you'd update the token data here
    }
  }, [lastMessage]);

  const handleTabChange = (value: string) => {
    dispatch(setActiveTab(value as 'new' | 'final_stretch' | 'migrated'));
  };

  // Filter and sort function
  const filterAndSortTokens = (tokens: Token[] | null) => {
    if (!tokens) return [];
    
    let filtered = [...tokens];

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (token) =>
          token.name.toLowerCase().includes(search) ||
          token.symbol.toLowerCase().includes(search)
      );
    }

    // Apply price filter
    if (priceFilter.minPrice !== undefined) {
      filtered = filtered.filter((token) => token.price >= priceFilter.minPrice!);
    }
    if (priceFilter.maxPrice !== undefined) {
      filtered = filtered.filter((token) => token.price <= priceFilter.maxPrice!);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'volume':
          return b.volume24h - a.volume24h;
        case 'change':
          return b.change24h - a.change24h;
        case 'marketCap':
        default:
          return b.marketCap - a.marketCap;
      }
    });

    return filtered;
  };

  // Get filtered/sorted data for each tab
  const filteredNewPairs = useMemo(
    () => filterAndSortTokens(newPairs.data),
    [newPairs.data, searchTerm, sortBy, priceFilter]
  );

  const filteredFinalStretch = useMemo(
    () => filterAndSortTokens(finalStretch.data),
    [finalStretch.data, searchTerm, sortBy, priceFilter]
  );

  const filteredMigrated = useMemo(
    () => filterAndSortTokens(migrated.data),
    [migrated.data, searchTerm, sortBy, priceFilter]
  );

  // Combine all tokens for modal lookup
  const allTokens = useMemo(() => {
    return [
      ...(newPairs.data || []),
      ...(finalStretch.data || []),
      ...(migrated.data || []),
    ];
  }, [newPairs.data, finalStretch.data, migrated.data]);

  const tabCounts = {
    new: filteredNewPairs.length,
    final_stretch: filteredFinalStretch.length,
    migrated: filteredMigrated.length,
  };

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedToken(null);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-green-500">Axiom</h1>
            <Badge variant="purple" size="sm">Pulse</Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-400">Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger
              value="new"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              New Pairs
              <Badge variant="default" size="sm" className="ml-2">
                {tabCounts.new}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="final_stretch"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              Final Stretch
              <Badge variant="warning" size="sm" className="ml-2">
                {tabCounts.final_stretch}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="migrated"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              Migrated
              <Badge variant="success" size="sm" className="ml-2">
                {tabCounts.migrated}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-4">
            <TableHeader
              title="New Pairs"
              subtitle="Recently discovered tokens"
            />
            <FilterPanel
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
              filters={priceFilter}
              onFilterChange={setPriceFilter}
            />
            <TokenTable
              tokens={filteredNewPairs}
              onTokenClick={handleTokenClick}
              loading={newPairs.isLoading}
            />
          </TabsContent>

          <TabsContent value="final_stretch" className="space-y-4">
            <TableHeader
              title="Final Stretch"
              subtitle="Tokens nearing migration"
            />
            <FilterPanel
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
              filters={priceFilter}
              onFilterChange={setPriceFilter}
            />
            <TokenTable
              tokens={filteredFinalStretch}
              onTokenClick={handleTokenClick}
              loading={finalStretch.isLoading}
            />
          </TabsContent>

          <TabsContent value="migrated" className="space-y-4">
            <TableHeader
              title="Migrated"
              subtitle="Successfully migrated tokens"
            />
            <FilterPanel
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
              filters={priceFilter}
              onFilterChange={setPriceFilter}
            />
            <TokenTable
              tokens={filteredMigrated}
              onTokenClick={handleTokenClick}
              loading={migrated.isLoading}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Token Detail Modal */}
      <TokenModal
        token={selectedToken}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
