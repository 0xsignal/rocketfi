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
import { unstable_cache } from "next/cache";

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

// Schema for GraphQL request
const GraphqlReqSchema = z.object({
  query: z.string().min(1),
  operationName: z.string().optional().nullable(),
  variables: z.record(z.unknown()).optional().nullable(),
});

// Schema for endpoint configuration
const EndpointSchema = z.object({
  protocol: z.string(),
  url: z.string().url(),
  pair: z.string(),
  chain: z.string(),
  query: z.string(),
  link: z.string().url(),
});

// Schema for successful response data
// Note: This is a basic schema, you should adjust it based on your actual data structure
const AaveResponseSchema = z.object({
  reserve: z
    .object({
      name: z.string().optional(),
      symbol: z.string().optional(),
      decimals: z.number().optional(),
      liquidityRate: z.string().optional(),
      utilizationRate: z.string().optional(),
      totalATokenSupply: z.string().optional(),
      totalCurrentVariableDebt: z.string().optional(),
      // Add other fields as needed
    })
    .optional(),
  // You may need to adjust this based on your actual query response
});

// Schema for process result
const ProcessResultSchema = z.object({
  protocol: z.string(),
  chain: z.string(),
  pair: z.string(),
  link: z.string().url(),
  data: z.unknown(),
  error: z.string().optional(),
});

export async function Process(endpoint: (typeof endpoints)[0]) {
  try {
    // Validate endpoint
    const validatedEndpoint = EndpointSchema.parse(endpoint);

    const client = new GraphQLClient(validatedEndpoint.url, {
      headers: {
        Authorization: `Bearer ${env.API_KEY}`, // Set if needed, otherwise remove
      },
    });

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      await delay(100);

      // Make the request
      const data = await client.request(validatedEndpoint.query);

      // Try to validate the response data
      // This is optional and can be adjusted based on your needs
      try {
        AaveResponseSchema.parse(data);
      } catch (validationError) {
        console.warn(
          `Response validation warning for ${endpoint.chain}:`,
          validationError,
        );
        // Continue even if validation fails, but log the warning
      }

      // Validate and return the result
      return ProcessResultSchema.parse({
        protocol: validatedEndpoint.protocol,
        chain: validatedEndpoint.chain,
        pair: validatedEndpoint.pair,
        link: validatedEndpoint.link,
        data: data,
      });
    } catch (error) {
      console.error(
        `Failed to fetch data from ${validatedEndpoint.chain}:`,
        error,
      );

      // Validate and return error result
      return ProcessResultSchema.parse({
        protocol: validatedEndpoint.protocol,
        chain: validatedEndpoint.chain,
        pair: validatedEndpoint.pair,
        link: validatedEndpoint.link,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } catch (validationError) {
    // Handle endpoint validation error
    console.error(`Invalid endpoint configuration:`, validationError);
    return {
      protocol: endpoint.protocol || "UNKNOWN",
      chain: endpoint.chain || "UNKNOWN",
      pair: endpoint.pair || "UNKNOWN",
      link: endpoint.link || "#",
      error: "Invalid endpoint configuration",
    };
  }
}

export const updateAaveData = unstable_cache(
  async () => {
    // Validate all endpoints before processing
    const validEndpoints = endpoints.filter((endpoint) => {
      try {
        EndpointSchema.parse(endpoint);
        return true;
      } catch (error) {
        console.error(`Invalid endpoint skipped:`, endpoint, error);
        return false;
      }
    });

    const results = await Promise.all(validEndpoints.map(Process));
    console.log(results);

    // Define a type guard for successful results
    const isSuccessfulResult = (result: any): result is Aave => {
      return result !== null && !result.error;
    };

    const successfulResults = results.filter(isSuccessfulResult);

    console.log("Aave data updated from cache");

    return successfulResults.map((result) => ({
      protocol: result.protocol,
      chain: result.chain,
      pair: result.pair,
      link: result.link,
      data: result.data,
    }));
  },
  ["aave-data"],
  {
    revalidate: 300,
    tags: ["aave-data"],
  },
);

export async function revalidateAaveData() {
  const { revalidateTag } = require("next/cache");
  console.log("Aave data revalidate");
  revalidateTag("aave-data");
}
