/* AAVE Ethereum rETH 0xcc9ee9483f662091a1de4795249e24ac0ac2630f */
export const aaveEthereumQuery = `{
  markets(where:{id:"0xcc9ee9483f662091a1de4795249e24ac0ac2630f"}){
    id
    name
    totalValueLockedUSD
    rates {
      rate
      side
    }
  }
}`;

/* AAVE Arbitrum rETH  0x8eb270e296023e9d92081fdf967ddd7878724424 */
export const aaveArbitrumQuery = `{
  markets(where:{id:"0x8eb270e296023e9d92081fdf967ddd7878724424"}){
    id
    name
    totalValueLockedUSD
    rates {
      rate
      side
    }
  }
}`;

/* AAVE Optimism rETH 0x724dc807b04555b71ed48a6896b6f41593b8c637 */
export const aaveOptimismQuery = `{
  markets(where:{id:"0x724dc807b04555b71ed48a6896b6f41593b8c637"}){
    id
    name
    totalValueLockedUSD
    rates {
      rate
      side
    }
  }
}`;

export const aaveEthereumRPLQuery = `{
    markets(where:{id:"0xb76cf92076adbf1d9c39294fa8e7a67579fde357"}){
      id
      name
      totalValueLockedUSD
      rates {
        rate
        side
      }
    }
}`;

/* Silo Arbitrum rETH/ETH */
export const siloArbitrumETHQuery = `{
  markets(where:{id:"0x170a90981843461295a6ce0e0a631ee440222e29-0x82af49447d8a07e3bd95bd0d56f35241523fbab1"}){
    name
    id
    totalValueLockedUSD
    rates {
      id
      rate
    }
  }
}`;

/* Silo Arbitrum rETH/USDC.e */
export const siloArbitrumUSDCQuery = `{
  markets(where:{id:"0x170a90981843461295a6ce0e0a631ee440222e29-0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"}){
      name
      id
      totalValueLockedUSD
      rates {
        id
        rate
      }
    }
}`;

/* Silo Optimism rETH/ETH */
export const siloOptimismETHQuery = `{
  markets(where:{id:"0xa0cf0085f3df7d44eaa7ab7eff41d7867210db62-0x4200000000000000000000000000000000000006"}){
    name
    id
    totalValueLockedUSD
    rates {
      id
      rate
    }
  }
}`;

/* Silo Optimism rETH/USDC */
export const siloOptimismUSDCQuery = `{
  markets(where:{id:"0xa0cf0085f3df7d44eaa7ab7eff41d7867210db62-0x0b2c639c533813f4aa9d7837caf62653d097ff85"}){
    name
    id
    totalValueLockedUSD
    rates {
      id
      rate
    }
  }
}`;

/* MOONWELL Base */
export const moonwellBaseQuery = `{
  markets(where:{name:"Moonwell Rocket Ether"}) {
    id
    name
    rates{
      id
      side
      rate
    }
    totalValueLockedUSD
    }
  }
}`;

/* MOONWELL OP */
export const moonwellOpQuery = `{
    markets(where:{name:"Moonwell Rocket Ether"}) {
      id
      name
      rates{
        id
        side
        rate
      }
      totalValueLockedUSD
      }
}`;

/* Morpho Ethereum rETH */
export const morphoQuery = `{
  markets{
      items {
        uniqueKey
        loanAsset {
          address
          symbol
          decimals
        }
        collateralAsset {
          address
          symbol
          decimals
          chain {
            id
            network
          }
        }
        state {
          borrowApy
          borrowAssets
          borrowAssetsUsd
          supplyApy
          supplyAssetsUsd
        }
      }
    }
}`;

/* Balancer Pool */
export const balancerQuery = `{
  query {
    pool1:poolGetPool(id:"0x1e19cf2d73a72ef1332c882f20534b6519be0276000200000000000000000112",chain:MAINNET){
      id
      name
      type
      version
      poolTokens {
        address
        symbol
        balance
        hasNestedPool
      }
      dynamicData {
        totalLiquidity
        aprItems {
          type
          apr
        }
      }
    },
    pool2:poolGetPool(id:"0x05ff47afada98a98982113758878f9a8b9fdda0a000000000000000000000645",chain:MAINNET){
      id
      name
      type
      version
      poolTokens {
        address
        symbol
        balance
        hasNestedPool
      }
      dynamicData {
        totalLiquidity
        aprItems {
          type
          apr
        }
      }
    },
    pool3:poolGetPool(id:"0x42ed016f826165c2e5976fe5bc3df540c5ad0af700000000000000000000058b",chain:MAINNET){
      id
      name
      type
      version
      poolTokens {
        address
        symbol
        balance
        hasNestedPool
      }
      dynamicData {
        totalLiquidity
        aprItems {
          type
          apr
        }
      }
    },
    pool4:poolGetPool(id:"0xd0ec47c54ca5e20aaae4616c25c825c7f48d40690000000000000000000004ef",chain:ARBITRUM){
      id
      name
      type
      version
      poolTokens {
        address
        symbol
        balance
        hasNestedPool
      }
      dynamicData {
        totalLiquidity
        aprItems {
          type
          apr
        }
      }
    },
    pool5:poolGetPool(id:"0x5f8893506ddc4c271837187d14a9c87964a074dc000000000000000000000106",chain:OPTIMISM){
      id
      name
      type
      version
      poolTokens {
        address
        symbol
        balance
        hasNestedPool
      }
      dynamicData {
        totalLiquidity
        aprItems {
          type
          apr
        }
      }
    },
    pool6:poolGetPool(id:"0xc771c1a5905420daec317b154eb13e4198ba97d0000000000000000000000023",chain:BASE){
      id
      name
      type
      version
      poolTokens {
        address
        symbol
        balance
        hasNestedPool
      }
      dynamicData {
        totalLiquidity
        aprItems {
          type
          apr
        }
      }
    }
  }
}`;

export const uniswapEthereumQuery = `{
    pool1:pool(id: "0x553e9c493678d8606d6a5ba284643db2110df823") {
      totalValueLockedUSD
      poolDayData(first: 1, orderBy: date, where: {
      pool: "0x553e9c493678d8606d6a5ba284643db2110df823",
      date_gt: ${Math.floor(Date.now() / 1000) - 24 * 60 * 60}} ) {
      date
      volumeUSD
      feesUSD
      tvlUSD
    }
	}
    pool2:pool(id: "0xe42318ea3b998e8355a3da364eb9d48ec725eb45") {
      totalValueLockedUSD
      poolDayData(first: 1, orderBy: date, where: {
      pool: "0xe42318ea3b998e8355a3da364eb9d48ec725eb45",
      date_gt: ${Math.floor(Date.now() / 1000) - 24 * 60 * 60}} ) {
      date
      volumeUSD
      feesUSD
      tvlUSD
    }
	}
}`;

export const uniswapArbitrumQuery = `{
    pool1:pool(id: "0x09ba302a3f5ad2bf8853266e271b005a5b3716fe") {
      totalValueLockedUSD
      poolDayData(first: 1, orderBy: date, where: {
      pool: "0x09ba302a3f5ad2bf8853266e271b005a5b3716fe",
      date_gt: ${Math.floor(Date.now() / 1000) - 24 * 60 * 60}} ) {
      date
      volumeUSD
      feesUSD
      tvlUSD
    }
	}
    pool2:pool(id: "0x7a3e4da2cf488c9c1f62bfa3abaa92c19c30c7c1") {
      totalValueLockedUSD
      poolDayData(first: 1, orderBy: date, where: {
      pool: "0x7a3e4da2cf488c9c1f62bfa3abaa92c19c30c7c1",
      date_gt: ${Math.floor(Date.now() / 1000) - 24 * 60 * 60}} ) {
      date
      volumeUSD
      feesUSD
      tvlUSD
    }
	}
}`;
