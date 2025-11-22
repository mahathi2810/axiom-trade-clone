export type TokenStatus = 'new' | 'final_stretch' | 'migrated';
export type PriceDirection = 'up' | 'down' | 'neutral';

export interface TokenMetrics {
  holders: number;
  topHoldersPercent: number;
  devHoldingPercent: number;
  snipersPercent: number;
  insidersPercent: number;
  bundlePercent: number;
  proTradersPercent: number;
}

export interface TokenVolume {
  volume24h: number;
  volumeChange24h: number;
  buys: number;
  sells: number;
  txns: number;
}

export interface Token {
  id: string;
  address: string;
  name: string;
  symbol: string;
  image: string | null;
  createdAt: string;
  ageMinutes: number;
  price: number;
  priceChange24h: number;
  priceDirection: PriceDirection;
  marketCap: number;
  liquidity: number;
  bondingProgress: number; // 0-100 for bonding curve
  status: TokenStatus;
  metrics: TokenMetrics;
  volume: TokenVolume;
  isVerified: boolean;
  hasTwitter: boolean;
  hasTelegram: boolean;
  hasWebsite: boolean;
  riskScore: number; // 0-100
  dexPaid: boolean;
}

export interface TokenUpdate {
  id: string;
  price?: number;
  priceDirection?: PriceDirection;
  marketCap?: number;
  liquidity?: number;
  volume?: Partial<TokenVolume>;
  metrics?: Partial<TokenMetrics>;
}

export interface TokensState {
  newPairs: Token[];
  finalStretch: Token[];
  migrated: Token[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}
