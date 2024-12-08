import { GraphQLClient } from "graphql-request";
import { z } from "zod";
import { env } from "@/env/server";
import { balancerQuery } from "@/lib/query";
import fs from "fs";
import path from "path";
import os from "os"

const TEMP_DIR = os.tmpdir();

const DATA_DIR = path.join(process.cwd(), TEMP_DIR);

const BAL_JSON_PATH = path.join(DATA_DIR, "balancer.json");

const endpoints = [
  {
    protocol: "Balancer",
    url: "https://api-v3.balancer.fi/",
    query: balancerQuery,
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
      data: result.data,
    }));

    // Write results to JSON
    fs.writeFileSync(
      BAL_JSON_PATH,
      JSON.stringify(unifiedData, null, 2),
      "utf-8",
    );
    console.log(`BAL data updated successfully at ${BAL_JSON_PATH}`);
  } catch (error) {
    console.error("Failed to update BAL data:", error);
  }
}
