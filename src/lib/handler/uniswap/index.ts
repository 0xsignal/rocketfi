import { GraphQLClient } from "graphql-request";
import { z } from "zod";
import { env } from "@/env/server";
import { uniswapEthereumQuery, uniswapArbitrumQuery } from "@/lib/query";
import { Uniswap } from "@/lib/type";

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
      Authorization: `Bearer ${env.API_KEY}`, 
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

export async function updateUniswapData(): Promise<Uniswap[]> {

  try {
    const results = await Promise.all(endpoints.map(Process));

    const successfulResults = results.filter(
      (result): result is Uniswap => result !== null
    );


    return successfulResults.map((result) => ({
      chain: result.chain,
      link: result.link,
      data: result.data,
    }));


  } catch (error) {
    console.error("Failed to update Uniswap data:", error);
    return []
  }
}