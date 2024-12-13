import { GraphQLClient } from "graphql-request";
import { z } from "zod";
import { env } from "@/env/server";
import {
  aaveArbitrumQuery,
  aaveEthereumQuery,
  aaveOptimismQuery,
  aaveEthereumRPLQuery,
} from "@/lib/query";
import { Aave } from "@/lib/type";
import { unstable_cache } from 'next/cache';


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
    protocol: "AAVE",
    url: "https://gateway.thegraph.com/api/subgraphs/id/4xyasjQeREe7PxnF6wVdobZvCw5mhoHZq3T7guRpuNPf",
    pair: "rETH",
    chain: "Arbitrum",
    query: aaveArbitrumQuery,
    link: "https://app.aave.com/reserve-overview/?underlyingAsset=0xec70dcb4a1efa46b8f2d97c310c9c4790ba5ffa8&marketName=proto_arbitrum_v3",
  },
  {
    protocol: "AAVE",
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

export async function Process(endpoint: (typeof endpoints)[0]) {
  const client = new GraphQLClient(endpoint.url, {
    headers: {
      Authorization: `Bearer ${env.API_KEY}`, // Set if needed, otherwise remove
    },
  });

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  try {
    await delay(100);
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

export const updateAaveData = unstable_cache(
  async () => {

    const results = await Promise.all(endpoints.map(Process));

    console.log(results)

    const successfulResults = results.filter(
      (result): result is Aave => result !== null
    );

    console.log("Aave data updated from cache");

    return successfulResults.map((result) => ({
      protocol: result.protocol,
      chain: result.chain,
      pair: result.pair,
      link: result.link,
      data: result.data,
    }));
  },
  ['aave-data'],
  {
    revalidate: 300,
    tags: ['aave-data']
  }
);

export async function revalidateAaveData() {
  const { revalidateTag } = require('next/cache');
  console.log("Aave data revalidate");
  revalidateTag('aave-data');
}