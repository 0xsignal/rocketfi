import { GraphQLClient } from "graphql-request";
import { morphoQuery } from "@/lib/query";
import fs from "fs";
import path from "path";
import os from "os"
import { Morpho } from "@/lib/type";

const TEMP_DIR = os.tmpdir();

const DATA_DIR = path.join(process.cwd(), TEMP_DIR);

const MORPHO_JSON_PATH = path.join(DATA_DIR, "morpho.json");

const MORPHO_GRAPHQL_URL = "https://blue-api.morpho.org/graphql";

async function Process() {
  const client = new GraphQLClient(MORPHO_GRAPHQL_URL);
  try {
    
    const data: { markets: { items: Morpho[] } } = await client.request<{ markets: { items: Morpho[] } }>(morphoQuery);
  
    const rethMarkets = data.markets.items.filter(
      (market) => market.collateralAsset && market.collateralAsset.symbol === "rETH"
    );
    return rethMarkets;
  } catch (error) {
    console.error(`Failed to fetch data `, error);
  }
}

export async function updateMorphoData() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }

  try {
    const rETHMarketData = await Process();

    fs.writeFileSync(
      MORPHO_JSON_PATH,
      JSON.stringify(rETHMarketData, null, 2),
      "utf-8",
    );
    console.log(`MORPHO data updated successfully at ${MORPHO_JSON_PATH}`);
  } catch (error) {
    console.error("Application error:", error);
  }
}
