export type Market = {
  id: string;
  name: string;
  rates: {
    rate: string;
    side: "BORROWER" | "LENDER";
  }[];
  totalValueLockedUSD: string;
};

export type AaveData = {
  markets: Market[];
};

export type Aave = {
  protocol: string;
  chain: string;
  pair: string;
  link: string;
  data: AaveData;
};

export type Silo = {
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
};

export type Moonwell = {
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
};

export type MoonwellIncentive = {
  liquidStakingApr: number;
  borrowApr: number;
  supplyApr: number;
  token: {
    address: string;
    decimals: number;
    name: string;
    symbol: string;
  };
};

export type Morpho = {
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
    netSupplyApy: number;
    netBorrowApy: number;
    rewards: {
      asset: {
        address: string;
      };
      supplyApr: number;
      borrowApr: number;
    }[];
  };
};

export type PoolToken = {
  address: string;
  symbol: string;
  balance: string;
  hasNestedPool: boolean;
};

export type AprItem = {
  type: string;
  apr: number;
};

export type DynamicData = {
  totalLiquidity: string;
  aprItems: AprItem[];
};

export type Balancer = {
  id: string;
  name: string;
  type: string;
  version: number;
  chain: string;
  poolTokens: PoolToken[];
  dynamicData: DynamicData;
};

export type BalancerResponse = {
  [key: string]: Balancer;
};

export type PoolDayData = {
  date: number;
  feesUSD: string;
  tvlUSD: string;
  volumeUSD: string;
};

export type Pool = {
  poolDayData: PoolDayData[];
  totalValueLockedUSD: string;
};

export type ChainData = {
  [poolName: string]: Pool;
};

export type Uniswap = {
  chain: string;
  link: string;
  data: ChainData;
};

export type Curve = {
  pair: string;
  chain: string;
  tvlUSD: string;
};

export type poolData = {
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
};

export type poolInfo = {
  address: string;
  latestDailyApy: number;
  latestWeeklyApy: number;
  volumeUSD: number;
};

export type CurveMarket = {
  name: string;
  address: string;
  n_coins: number;
  tvl_usd: number;
  balances: number[];
  trading_volume_24h: number;
  trading_fee_24h: number;
  liquidity_volume_24h: number;
  liquidity_fee_24h: number;
  coins: {
    pool_index: number;
    symbol: string;
    address: string;
    decimals: number;
  }[];
  base_daily_apr: number;
  base_weekly_apr: number;
  virtual_price: number;
  pool_methods: string[];
};

export type CurveMarketGauge = {
  name: string;
  address: string;
  n_coins: number;
  tvl_usd: number;
  balances: number[];
  trading_volume_24h: number;
  trading_fee_24h: number;
  liquidity_volume_24h: number;
  liquidity_fee_24h: number;
  coins: {
    pool_index: number;
    symbol: string;
    address: string;
    decimals: number;
  }[];
  base_daily_apr: number;
  base_weekly_apr: number;
  virtual_price: number;
  pool_methods: string[];
  guage_apy_min: number;
  guage_apy_max: number;
  url: string;
};

export type PendleMarket = {
  name: string;
  address: string;
  expiry: string; // ISO string
  pt: string;
  yt: string;
  sy: string;
  underlyingAsset: string;
  details: {
    liquidity: number;
    pendleApy: number;
    impliedApy: number;
    feeRate: number;
    yieldRange: {
      min: number;
      max: number;
    };
    aggregatedApy: number;
    maxBoostedApy: number;
  };
  isNew: boolean;
  isPrime: boolean;
  timestamp: string; // ISO string
};
