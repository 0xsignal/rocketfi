import { GraphQLClient } from "graphql-request";
import { z } from "zod";
import { env } from "@/env/server";
import {
  siloArbitrumETHQuery,
  siloArbitrumUSDCQuery,
  siloOptimismETHQuery,
  siloOptimismUSDCQuery,
} from "@/lib/query";
import fs from "fs";
import path from "path";
import {
  ethers,
  JsonRpcProvider,
  Contract,
  formatUnits,
  BigNumberish,
} from "ethers";
import { ContractABIs } from "./abi";

const DATA_DIR = path.join(process.cwd(), "/tmp", "_data");
const SILO_JSON_PATH = path.join(DATA_DIR, "silo.json");

const OP_RPC_URL = "https://optimism.llamarpc.com";
const ARB_RPC_URL = "https://arbitrum.llamarpc.com";
const rETHWETH__OP_CONTRACT_ADDRESS =
  "0xb69841c679fe733c550a351a896a2169be5da13e";
const rETHUSDC_OP_CONTRACT_ADDRESS =
  "0xe7265df285ED7eC35cf502666Df997DF7B25034e";
const rETHUSDC_ARB_CONTRACT_ADDRESS = "";
const rETHWETH__ARB_CONTRACT_ADDRESS = "";

const endpoints = [
  {
    protocol: "SILO",
    url: "https://gateway.thegraph.com/api/subgraphs/id/2ufoztRpybsgogPVW6j9NTn1JmBWFYPKbP7pAabizADU",
    pair: "rETH/ETH",
    chain: "Arbitrum",
    query: siloArbitrumETHQuery,
    link: "",
    leverageLink: "",
  },
  {
    name: "SILO",
    url: "https://gateway.thegraph.com/api/subgraphs/id/2ufoztRpybsgogPVW6j9NTn1JmBWFYPKbP7pAabizADU",
    pair: "rETH/USDC.e",
    chain: "Arbitrum",
    query: siloArbitrumUSDCQuery,
    link: "",
    leverageLink: "",
  },
  {
    protocol: "SILO",
    url: "https://gateway.thegraph.com/api/subgraphs/id/HVhUwbDrY5uGyz5u3bvKQVfmagVet3Uwy7jWjFrvT6s6",
    pair: "rETH/ETH",
    chain: "Optimism",
    query: siloOptimismETHQuery,
    link: "",
    leverageLink: "",
  },
  {
    protocol: "SILO",
    url: "https://gateway.thegraph.com/api/subgraphs/id/HVhUwbDrY5uGyz5u3bvKQVfmagVet3Uwy7jWjFrvT6s6",
    pair: "rETH/USDC",
    chain: "Optimism",
    query: siloOptimismUSDCQuery,
    link: "",
    leverageLink: "",
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

async function readContractMethod(
  contractAddress: string,
  contractABI: string[],
  methodName: string,
  methodArgs: any[] = [],
  providerUrl: string = "https://mainnet.infura.io/v3/YOUR-PROJECT-ID",
): Promise<any> {
  try {
    const provider = ethers.getDefaultProvider(providerUrl);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider,
    );

    if (!contract[methodName]) {
      throw new Error(`Method ${methodName} not found in contract ABI`);
    }

    const result = await contract[methodName](...methodArgs);

    if (result && typeof result === "object" && "toString" in result) {
      try {
        return formatUnits(result as BigNumberish, 18);
      } catch {
        return result.toString();
      }
    }

    return result;
  } catch (error) {
    console.error(`Error reading contract method ${methodName}:`, error);
    throw error;
  }
}

export async function updateSiloData() {
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
      SILO_JSON_PATH,
      JSON.stringify(unifiedData, null, 2),
      "utf-8",
    );
    console.log(`SILO data updated successfully at ${SILO_JSON_PATH}`);
  } catch (error) {
    console.error("Failed to update SILO data:", error);
  }
}
