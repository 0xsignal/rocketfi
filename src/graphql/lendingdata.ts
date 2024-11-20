import fs from 'fs';
import path from 'path';
import { GraphQLClient } from 'graphql-request';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { env } from '@/env/server';



// replace this with your Subgrah URL
const endpoints = [
  {
    protocol: 'AAVE',
    url: 'https://api.thegraph.com/subgraphs/name/aave/protocol',
    pair: 'rETH',
    chain: 'Ethereum',
    query: aaveQuery,
    handler: handleAaveData,
  },
  {
    name: 'AAVE',
    url: 'https://api.thegraph.com/subgraphs/name/balancer/protocol',
    pair: 'rETH'
    chain: 'Aribitrum',
    query: balancerQuery,
    handler: handleBalancerData,
  },
  {
    name: 'AAVE',
    url: 'https://api.thegraph.com/subgraphs/name/balancer/protocol',
    pair: 'rETH'
    chain: 'Optimism',
    query: balancerQuery,
    handler: handleBalancerData,
  },
  {
    name: 'SILO',
    url: 'https://api.thegraph.com/subgraphs/name/silo/protocol',
    pair: 'rETH/ETH/USDC.e'
    chain: 'Arbitrum',
    query: siloQuery,
    handler: handleSiloData,
  },
  {
    name: 'SILO',
    url: 'https://api.thegraph.com/subgraphs/name/silo/protocol',
    pair: 'rETH/ETH/USDC.e'
    chain: 'Optimism',
    query: siloQuery,
    handler: handleSiloData,
  },
  {
    name: 'MOONWELL',
    url: 'https://api.thegraph.com/subgraphs/name/balancer/protocol',
    chain: 'Optimism',
    pair: 'rETH'
    query: balancerQuery,
    handler: handleBalancerData,
  },
  {
    name: 'MOONWELL',
    url: 'https://api.thegraph.com/subgraphs/name/balancer/protocol',
    chain: 'Base',
    pair: 'rETH'
    query: balancerQuery,
    handler: handleBalancerData,
  },
  {
    name: 'MORPHO',
    url: 'https://api.thegraph.com/subgraphs/name/balancer/protocol',
    chain: 'Ethereum',
    pair: 'rETH/ETH'
    query: balancerQuery,
    handler: handleBalancerData,
  },
  {
    name: 'MORPHO',
    url: 'https://api.thegraph.com/subgraphs/name/balancer/protocol',
    chain: 'Base',
    pair: 'rETH/ETH'
    query: balancerQuery,
    handler: handleBalancerData,
  },
  {
    name: 'MORPHO',
    url: 'https://api.thegraph.com/subgraphs/name/balancer/protocol',
    chain: 'Base',
    pair: 'rETH/USDC'
    query: balancerQuery,
    handler: handleBalancerData,
  },
  {
    name: 'MORPHO',
    url: 'https://api.thegraph.com/subgraphs/name/balancer/protocol',
    chain: 'Base',
    pair: 'rETH/EURC'
    query: balancerQuery,
    handler: handleBalancerData,
  },
  {
    protocol: 'AAVE',
    url: 'https://api.thegraph.com/subgraphs/name/aave/protocol',
    pair: 'RPL'
    chain: 'Ethereum',
    query: aaveQuery,
    handler: handleAaveData,
  },
  {
    protocol: 'SILO',
    url: 'https://api.thegraph.com/subgraphs/name/aave/protocol',
    pair: 'RPL/ETH/XAI'
    chain: 'Ethereum',
    query: aaveQuery,
    handler: handleAaveData,
  },

];


const client = new GraphQLClient(subgraphQueryUrl, {
  headers: {
    Authorization: `Bearer ${env.API_KEY}`,
  },
});

const GraphqlReqSchema = z.object({
  query: z.string().min(1),
  operationName: z.string().optional().nullable(),
  variables: z.record(z.unknown()).optional().nullable(),
});




async function process(request: Request) {
  const body = await request.json();
  const parsedGqlRequest = GraphqlReqSchema.safeParse(body);
  if (!parsedGqlRequest.success) {
    return NextResponse.json({ error: parsedGqlRequest.error }, { status: 400 });
  }
  const gqlRequest = parsedGqlRequest.data;

  const gqlResponse = await client.request(gqlRequest.query, gqlRequest.variables ?? undefined);

  return NextResponse.json({ data: gqlResponse }, { status: 200 });
}

export async function GET(request: Request) {
  return process(request);
}

export async function POST(request: Request) {
  return process(request);
}
