import { GraphQLClient } from "graphql-request";
import { z } from "zod";
import { env } from "@/env/server";
import { uniswapEthereumQuery, uniswapArbitrumQuery } from "@/lib/query";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "/tmp", "_data");
const UNI_JSON_PATH = path.join(DATA_DIR, "uniswap.json");

const endpoints = [
  {
    url: "https://gateway.thegraph.com/api/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
    chain: "Ethereum",
    query: uniswapEthereumQuery,
    link: "",
  },
  {
    url: "https://gateway.thegraph.com/api/subgraphs/id/FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM",
    chain: "Arbitrum",
    query: uniswapArbitrumQuery,
    link: "",
  },
];

const GraphqlReqSchema = z.object({
  query: z.string().min(1),
  operationName: z.string().optional().nullable(),
  variables: z.record(z.unknown()).optional().nullable(),
});

async function Process(endpoint: (typeof endpoints)[0]) {
  const client = new GraphQLClient(endpoint.url, {
    headers: {
      Authorization: `Bearer ${env.API_KEY}`, // Set if needed, otherwise remove
    },
  });

  try {
    const data = await client.request(endpoint.query);
    console.log(data);
    return {
      chain: endpoint.chain,
      link: endpoint.link,
      data: data,
    };
  } catch (error) {
    console.error(`Failed to fetch data from ${endpoint.chain}:`, error);
    return {
      chain: endpoint.chain,
      link: endpoint.link,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateUniData() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }

  try {
    const results = await Promise.all(
      endpoints.map((endpoint) => Process(endpoint)),
    );

    // Collect only successful results
    const successfulResults = results.filter((result) => !result.error);

    const unifiedData = successfulResults.map((result) => ({
      chain: result.chain,
      link: result.link,
      data: result.data,
    }));

    // Write results to JSON
    fs.writeFileSync(
      UNI_JSON_PATH,
      JSON.stringify(unifiedData, null, 2),
      "utf-8",
    );
    console.log(`Uniswap data updated successfully at ${UNI_JSON_PATH}`);
  } catch (error) {
    console.error("Failed to update AAVE data:", error);
  }
}
