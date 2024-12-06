import { GraphQLClient } from "graphql-request";
import { z } from "zod";
import { env } from "@/env/server";
import {
  aaveArbitrumQuery,
  aaveEthereumQuery,
  aaveOptimismQuery,
  aaveEthereumRPLQuery,
} from "@/lib/query";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "_data");
const AAVE_JSON_PATH = path.join(DATA_DIR, "aave.json");

const endpoints = [
  {
    protocol: "AAVE",
    url: "https://gateway.thegraph.com/api/subgraphs/id/JCNWRypm7FYwV8fx5HhzZPSFaMxgkPuw4TnR3Gpi81zk",
    pair: "rETH",
    chain: "Ethereum",
    query: aaveEthereumQuery,
    link: "https://app.aave.com/reserve-overview/?underlyingAsset=0xae78736cd615f374d3085123a210448e74fc6393&marketName=proto_mainnet_v3",
  },
  {
    name: "AAVE",
    url: "https://gateway.thegraph.com/api/subgraphs/id/4xyasjQeREe7PxnF6wVdobZvCw5mhoHZq3T7guRpuNPf",
    pair: "rETH",
    chain: "Arbitrum",
    query: aaveArbitrumQuery,
    link: "https://app.aave.com/reserve-overview/?underlyingAsset=0xec70dcb4a1efa46b8f2d97c310c9c4790ba5ffa8&marketName=proto_arbitrum_v3",
  },
  {
    name: "AAVE",
    url: "https://gateway.thegraph.com/api/subgraphs/id/3RWFxWNstn4nP3dXiDfKi9GgBoHx7xzc7APkXs1MLEgi",
    pair: "rETH",
    chain: "Optimism",
    query: aaveOptimismQuery,
    link: "https://app.aave.com/reserve-overview/?underlyingAsset=0x9bcef72be871e61ed4fbbc7630889bee758eb81d&marketName=proto_optimism_v3",
  },
  {
    name: "AAVE",
    url: "https://gateway.thegraph.com/api/subgraphs/id/JCNWRypm7FYwV8fx5HhzZPSFaMxgkPuw4TnR3Gpi81zk",
    pair: "RPL",
    chain: "Ethereum",
    query: aaveEthereumRPLQuery,
    link: "https://app.aave.com/reserve-overview/?underlyingAsset=0xd33526068d116ce69f19a9ee46f0bd304f21a51f&marketName=proto_mainnet_v3",
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
    return {
      protocol: endpoint.protocol,
      chain: endpoint.chain,
      pair: endpoint.pair,
      link: endpoint.link,
      data: data,
    };
  } catch (error) {
    console.error(`Failed to fetch data from ${endpoint.chain}:`, error);
    return {
      protocol: endpoint.protocol,
      chain: endpoint.chain,
      pair: endpoint.pair,
      link: endpoint.link,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateAaveData() {
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
      protocol: result.protocol,
      chain: result.chain,
      pair: result.pair,
      link: result.link,
      data: result.data,
    }));

    // Write results to JSON
    fs.writeFileSync(
      AAVE_JSON_PATH,
      JSON.stringify(unifiedData, null, 2),
      "utf-8",
    );
    console.log(`AAVE data updated successfully at ${AAVE_JSON_PATH}`);
  } catch (error) {
    console.error("Failed to update AAVE data:", error);
  }
}
