export interface RangeFilter {
  min: number | null;
  max: number | null;
}

export interface TokenFilters {
  search: string;
  ageMinutes: RangeFilter;
  holders: RangeFilter;
  topHoldersPercent: RangeFilter;
  devHoldingPercent: RangeFilter;
  snipersPercent: RangeFilter;
  insidersPercent: RangeFilter;
  liquidity: RangeFilter;
  volume: RangeFilter;
  marketCap: RangeFilter;
  txns: RangeFilter;
  buys: RangeFilter;
  sells: RangeFilter;
  showVerifiedOnly: boolean;
  excludeHighRisk: boolean;
}

export type SortField = 
  | 'createdAt' 
  | 'price' 
  | 'marketCap' 
  | 'liquidity' 
  | 'volume24h' 
  | 'holders'
  | 'bondingProgress';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export const DEFAULT_FILTERS: TokenFilters = {
  search: '',
  ageMinutes: { min: null, max: null },
  holders: { min: null, max: null },
  topHoldersPercent: { min: null, max: null },
  devHoldingPercent: { min: null, max: null },
  snipersPercent: { min: null, max: null },
  insidersPercent: { min: null, max: null },
  liquidity: { min: null, max: null },
  volume: { min: null, max: null },
  marketCap: { min: null, max: null },
  txns: { min: null, max: null },
  buys: { min: null, max: null },
  sells: { min: null, max: null },
  showVerifiedOnly: false,
  excludeHighRisk: false,
};
