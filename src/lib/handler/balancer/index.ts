import { GraphQLClient } from "graphql-request";
import { env } from "@/env/server";
import { balancerQuery } from "@/lib/query";
import { Balancer, BalancerResponse } from "@/lib/type";

const endpoints = [
  {
    protocol: "Balancer",
    url: "https://api-v3.balancer.fi/",
    query: balancerQuery,
  },
];

async function Process(
  endpoint: (typeof endpoints)[0],
): Promise<{ data?: BalancerResponse; error?: string }> {
  const client = new GraphQLClient(endpoint.url, {
    fetch: (url, options) =>
      fetch(url, {
        ...options,
        next: { revalidate: 10 },
      }),
  });

  try {
    const data = await client.request(endpoint.query);
    return { data: data as BalancerResponse };
  } catch (error) {
    console.error(`Failed to fetch data:`, error);
    return {
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateBalancerData(): Promise<Balancer[]> {
  try {
    const results = await Promise.all(
      endpoints.map((endpoint) => Process(endpoint)),
    );

    const successfulResults = results.filter((result) => !result.error);

    const unifiedData: Balancer[] = successfulResults.flatMap((result) =>
      result.data ? Object.values(result.data) : [],
    );

    console.log(`BAL data updated successfully`);
    return unifiedData;
  } catch (error) {
    console.error("Failed to update BAL data:", error);
    return [];
  }
}
