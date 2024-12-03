export interface Aave {
  protocol?: string;
  chain: string;
  pair: string;
  link?: string;
  data: {
    markets: {
      id: string;
      name: string;
      rates: {
        rate: string;
        side: "BORROWER" | "LENDER";
      }[];
      totalValueLockedUSD: string;
    }[];
  };
}

export interface Silo {}
