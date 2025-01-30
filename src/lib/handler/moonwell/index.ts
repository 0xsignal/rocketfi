import { createMoonwellClient } from "@moonwell-fi/moonwell-sdk";
import { Moonwell } from "@/lib/type";

async function fetchMoonwellMarketData() {
  try {
    const moonwellClient = createMoonwellClient({
      networks: {
        base: {
          rpcUrls: ["https://mainnet.base.org", "https://base.llamarpc.com"],
        },
        optimism: {
          rpcUrls: ["https://mainnet.optimism.io", "https://optimism.llamarpc.com"],
        },
      },
    });

    const markets = await moonwellClient.getMarkets();

    const rETHMarkets = markets.filter(
      (market) => market.underlyingToken.symbol === "rETH",
    );
    return rETHMarkets;
  } catch (error) {
    console.error("Error fetching Moonwell market data:", error);
    throw error;
  }
}

export async function updateMoonwellData(): Promise<Moonwell[]> {

  try {
    const rETHMarketData = await fetchMoonwellMarketData();


    const rETHMarketDetails = rETHMarketData.map((rETHMarket, index) => ({
      marketIndex: index + 1,
      totalSupplyUSD: rETHMarket.totalSupplyUsd?.toString(),
      supplyAPR: rETHMarket.totalSupplyApr?.toString(),
      borrowAPR: rETHMarket.totalBorrowApr?.toString(),
      baseSupplyAPR: rETHMarket.baseSupplyApy?.toString(),
      baseBorrowAPR: rETHMarket.baseBorrowApy?.toString(),
      chain: rETHMarket.chainId,
      incentive: rETHMarket.rewards,
    }));

    console.log(rETHMarketDetails)


    return rETHMarketDetails


  } catch (error) {
    console.error("Application error:", error);
    return []
  }
}
