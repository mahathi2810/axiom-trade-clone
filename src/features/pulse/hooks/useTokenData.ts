import { useQuery } from '@tanstack/react-query';

// Mock token data type
export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  status?: 'new' | 'final_stretch' | 'migrated';
}

// Enhanced mock data for development
const MOCK_NEW_PAIRS: Token[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 43250.50,
    change24h: 2.5,
    volume24h: 28500000000,
    marketCap: 847000000000,
    status: 'new',
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2280.75,
    change24h: -1.2,
    volume24h: 15200000000,
    marketCap: 274000000000,
    status: 'new',
  },
  {
    id: '10',
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.08,
    change24h: 8.5,
    volume24h: 850000000,
    marketCap: 11000000000,
    status: 'new',
  },
  {
    id: '11',
    symbol: 'PEPE',
    name: 'Pepe',
    price: 0.0000012,
    change24h: 15.3,
    volume24h: 450000000,
    marketCap: 500000000,
    status: 'new',
  },
  {
    id: '12',
    symbol: 'BONK',
    name: 'Bonk',
    price: 0.0000089,
    change24h: -3.7,
    volume24h: 120000000,
    marketCap: 290000000,
    status: 'new',
  },
];

const MOCK_FINAL_STRETCH: Token[] = [
  {
    id: '3',
    symbol: 'SOL',
    name: 'Solana',
    price: 98.45,
    change24h: 5.8,
    volume24h: 2100000000,
    marketCap: 42000000000,
    status: 'final_stretch',
  },
  {
    id: '8',
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 36.75,
    change24h: 4.2,
    volume24h: 680000000,
    marketCap: 13500000000,
    status: 'final_stretch',
  },
  {
    id: '9',
    symbol: 'LINK',
    name: 'Chainlink',
    price: 14.82,
    change24h: -2.1,
    volume24h: 420000000,
    marketCap: 8200000000,
    status: 'final_stretch',
  },
];

const MOCK_MIGRATED: Token[] = [
  {
    id: '4',
    symbol: 'MATIC',
    name: 'Polygon',
    price: 0.82,
    change24h: 3.2,
    volume24h: 450000000,
    marketCap: 7600000000,
    status: 'migrated',
  },
  {
    id: '5',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.58,
    change24h: 1.8,
    volume24h: 380000000,
    marketCap: 20500000000,
    status: 'migrated',
  },
  {
    id: '6',
    symbol: 'DOT',
    name: 'Polkadot',
    price: 7.23,
    change24h: -0.5,
    volume24h: 290000000,
    marketCap: 9800000000,
    status: 'migrated',
  },
  {
    id: '7',
    symbol: 'UNI',
    name: 'Uniswap',
    price: 6.45,
    change24h: 2.9,
    volume24h: 180000000,
    marketCap: 4900000000,
    status: 'migrated',
  },
];

// Simulate API call with slight price variations
const fetchTokens = async (category: 'new' | 'final_stretch' | 'migrated'): Promise<Token[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Add slight random price variations to simulate real-time data
  const addPriceVariation = (tokens: Token[]) => {
    return tokens.map(token => ({
      ...token,
      price: token.price * (1 + (Math.random() - 0.5) * 0.01), // ±0.5% variation
      change24h: token.change24h + (Math.random() - 0.5) * 1, // ±0.5% change variation
    }));
  };

  switch (category) {
    case 'new':
      return addPriceVariation(MOCK_NEW_PAIRS);
    case 'final_stretch':
      return addPriceVariation(MOCK_FINAL_STRETCH);
    case 'migrated':
      return addPriceVariation(MOCK_MIGRATED);
    default:
      return [];
  }
};

// React Query hooks for each token category
export function useNewPairs() {
  return useQuery({
    queryKey: ['tokens', 'new-pairs'],
    queryFn: () => fetchTokens('new'),
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchInterval: 60000, // Auto-refetch every 60 seconds
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });
}

export function useFinalStretch() {
  return useQuery({
    queryKey: ['tokens', 'final-stretch'],
    queryFn: () => fetchTokens('final_stretch'),
    staleTime: 30000,
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
  });
}

export function useMigrated() {
  return useQuery({
    queryKey: ['tokens', 'migrated'],
    queryFn: () => fetchTokens('migrated'),
    staleTime: 30000,
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
  });
}

// Combined hook for all token data
export function useAllTokens() {
  const newPairs = useNewPairs();
  const finalStretch = useFinalStretch();
  const migrated = useMigrated();

  return {
    newPairs: {
      data: newPairs.data || null,
      isLoading: newPairs.isLoading,
      isRefetching: newPairs.isRefetching,
      error: newPairs.error,
      refetch: newPairs.refetch,
    },
    finalStretch: {
      data: finalStretch.data || null,
      isLoading: finalStretch.isLoading,
      isRefetching: finalStretch.isRefetching,
      error: finalStretch.error,
      refetch: finalStretch.refetch,
    },
    migrated: {
      data: migrated.data || null,
      isLoading: migrated.isLoading,
      isRefetching: migrated.isRefetching,
      error: migrated.error,
      refetch: migrated.refetch,
    },
    isLoading: newPairs.isLoading || finalStretch.isLoading || migrated.isLoading,
    isError: newPairs.isError || finalStretch.isError || migrated.isError,
  };
}

export function useTokenById(id: string) {
  const { newPairs, finalStretch, migrated } = useAllTokens();
  
  const allTokens = [
    ...(newPairs.data || []),
    ...(finalStretch.data || []),
    ...(migrated.data || []),
  ];
  
  const token = allTokens.find(t => t.id === id);
  
  return { 
    token, 
    loading: newPairs.isLoading, 
    error: newPairs.error 
  };
}
