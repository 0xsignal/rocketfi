/* AAVE Ethereum rETH 0xcc9ee9483f662091a1de4795249e24ac0ac2630f */
export const aaveEthereumQuery = `{
  markets(where:{id:"0xcc9ee9483f662091a1de4795249e24ac0ac2630f"}){
    id
    name
    totalValueLockedUSD
    rates {
      rate
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


/* Morpho Ethereum rETH */
export const morphEthereumQuery = `{
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
