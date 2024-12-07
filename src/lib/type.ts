export interface Aave {
  protocol: string;
  chain: string;
  pair: string;
  link: string;
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

export interface Silo {
  protocol: string;
  chain: string;
  pair: string;
  link: string;
  data: {
    markets: {
      id: string;
      name: string;
      rates: {
        id: string;
        rate: string;
      }[];
      totalValueLockedUSD: string;
    }[];
  };
}

export interface Moowell {
  marketIndex: number;
  totalSupplyUSD: string;
  supplyAPR: string;
  borrowAPR: string;
  baseSupplyAPR: string;
  baseBorrowAPR: string;
  chain: number;
  incentive: {
    liquidStakingApr: number;
    borrowApr: number;
    supplyApr: number;
    token: {
      address: string;
      decimals: number;
      name: string;
      symbol: string;
    };
  }[];
}
