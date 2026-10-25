export interface CountryResult {
  id: string;
  country: string;
  flavioVotes: number;
  lulaVotes: number;
  totalValid: number;
  flavioPct: number;
  lulaPct: number;
  winner: 'flavio' | 'lula' | 'draw';
  isFullyApurado: boolean;
  note?: string;
}

export interface ElectionTotals {
  flavioVotes: number;
  lulaVotes: number;
  totalValid: number;
  flavioPct: number;
  lulaPct: number;
  lastUpdateTime: string;
}
