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
      totalValueLockedUSD?: string;
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
      totalValueLockedUSD?: string;
    }[];
  };
}

export interface Moonwell {
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

export interface Morpho {
  uniqueKey: string;
  loanAsset: {
    address: string;
    symbol: string;
    decimals: number;
  };
  collateralAsset: {
    address: string;
    symbol: string;
    decimals: number;
    chain: {
      id: number;
      network: string;
    };
  };
  state: {
    borrowApy: number;
    borrowAssets: string;
    borrowAssetsUsd: number;
    supplyApy: number;
    supplyAssetsUsd: number;
  };
}

export interface Balancer {
  id: string;
  name: string;
  type: string;
  version: number;
  chain: string;
  poolTokens: {
    address: string;
    symbol: string;
    balance: string;
    hasNestedPool: boolean;
  }[];
  dynamicData: {
    totalLiquidity: string;
    aprItems: {
      type: string;
      apr: number;
    }[];
  };
}
