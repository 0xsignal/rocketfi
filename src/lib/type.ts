export interface Market {
  id: string;
  name: string;
  rates: {
    rate: string;
    side: "BORROWER" | "LENDER";
  }[];
  totalValueLockedUSD: string;
}

export interface AaveData {
  markets: Market[];
}

export interface Aave {
  protocol: string;
  chain: string;
  pair: string;
  link: string;
  data: AaveData;
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

export interface MoonwellIncentive {
  liquidStakingApr: number;
  borrowApr: number;
  supplyApr: number;
  token: {
    address: string;
    decimals: number;
    name: string;
    symbol: string;
  };
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
};

export interface PoolToken {
  address: string;
  symbol: string;
  balance: string;
  hasNestedPool: boolean;
}

export interface AprItem {
  type: string;
  apr: number;
}

export interface DynamicData {
  totalLiquidity: string;
  aprItems: AprItem[];
}

export interface Balancer {
  id: string;
  name: string;
  type: string;
  version: number;
  chain: string;
  poolTokens: PoolToken[];
  dynamicData: DynamicData;
}

export interface BalancerResponse {
  [key: string]: Balancer;
}

export interface PoolDayData {
  date: number;
  feesUSD: string;
  tvlUSD: string;
  volumeUSD: string;
}

export interface Pool {
  poolDayData: PoolDayData[];
  totalValueLockedUSD: string;
}

export interface ChainData {
  [poolName: string]: Pool;
}

export interface Uniswap {
  chain: string;
  link: string;
  data: ChainData;
}

export interface Curve {
  pair: string;
  chain: string;
  tvlUSD: string;

}

export interface poolData {
  id: string;
  address: string;
  name: string;
  symbol: string;
  coins: Array<{
    address: string;
    usdPrice: number;
    symbol: string;
    name: string;
  }>;
  usdTotal: number;
}

export interface poolInfo {
  address: string;
  latestDailyApy: number;
  latestWeeklyApy: number;
  volumeUSD: number;
}

export interface gaugeData {

}