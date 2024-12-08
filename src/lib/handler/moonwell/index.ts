import { createMoonwellClient } from "@moonwell-fi/moonwell-sdk";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "/tmp");
const MOONWELL_JSON_PATH = path.join(DATA_DIR, "moonwell.json");

async function fetchMoonwellMarketData() {
  try {
    const moonwellClient = createMoonwellClient({
      networks: {
        base: {
          rpcUrls: ["https://mainnet.base.org", "https://base.llamarpc.com"],
        },
        optimism: {
          rpcUrls: ["https://mainnet.optimism.io"],
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

export async function updateMoonwellData() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }

  try {
    const rETHMarketData = await fetchMoonwellMarketData();

    const rETHMarketDetails = rETHMarketData.map((rETHMarket, index) => ({
      marketIndex: index + 1,
      totalSupplyUSD: rETHMarket.totalSupplyUsd?.toString(),
      supplyAPR: rETHMarket.totalSupplyApr?.toString(),
      borrowAPR: rETHMarket.totalBorrowApr?.toString(),
      baseSupplyAPR: rETHMarket.baseSupplyApy?.toString(),
      baseBorrowAPR: rETHMarket.baseSupplyApy?.toString(),
      chain: rETHMarket.chainId,
      incentive: rETHMarket.rewards,
    }));

    fs.writeFileSync(
      MOONWELL_JSON_PATH,
      JSON.stringify(rETHMarketDetails, null, 2),
      "utf-8",
    );
  } catch (error) {
    console.error("Application error:", error);
  }
}
