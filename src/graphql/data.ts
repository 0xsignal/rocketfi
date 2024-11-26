import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

async function process(request: Request) {
  const body = await request.json();
  const parsedGqlRequest = GraphqlReqSchema.safeParse(body);
  if (!parsedGqlRequest.success) {
    return NextResponse.json(
      { error: parsedGqlRequest.error },
      { status: 400 },
    );
  }
  const gqlRequest = parsedGqlRequest.data;

  const gqlResponse = await client.request(
    gqlRequest.query,
    gqlRequest.variables ?? undefined,
  );

  return NextResponse.json({ data: gqlResponse }, { status: 200 });
}

export async function GET(request: Request) {
  return process(request);
}

export async function POST(request: Request) {
  return process(request);
}
