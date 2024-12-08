import { GraphQLClient } from "graphql-request";
import { z } from "zod";
import { env } from "@/env/server";
import { balancerQuery } from "@/lib/query";


const endpoints = [
  {
    protocol: "Balancer",
    url: "https://api-v3.balancer.fi/",
    query: balancerQuery,
  },
];

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
      data: data,
    };
  } catch (error) {
    console.error(`Failed to fetch data:`, error);
    return {
      protocol: endpoint.protocol,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateBalData() {


  try {
    const results = await Promise.all(
      endpoints.map((endpoint) => Process(endpoint)),
    );

    // Collect only successful results
    const successfulResults = results.filter((result) => !result.error);

    const unifiedData = successfulResults.map((result) => ({
      protocol: result.protocol,
      data: result.data,
    }));

    return unifiedData

    console.log(`BAL data updated successfully `);
  } catch (error) {
    console.error("Failed to update BAL data:", error);
  }
}
