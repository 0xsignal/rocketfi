import { GraphQLClient } from "graphql-request";
import { morphoQuery } from "@/lib/query";
import { Morpho } from "@/lib/type";

const MORPHO_GRAPHQL_URL = "https://blue-api.morpho.org/graphql";

export async function updateMorphoData(): Promise<Morpho[]> {
  const client = new GraphQLClient(MORPHO_GRAPHQL_URL, {
    fetch: (url, options) =>
      fetch(url, {
        ...options,
        next: { revalidate: 10 },
      }),
  });
  try {
    const data: { markets: { items: Morpho[] } } = await client.request<{
      markets: { items: Morpho[] };
    }>(morphoQuery);

    const rethMarkets = data.markets.items.filter(
      (market) =>
        market.collateralAsset && market.collateralAsset.symbol === "rETH",
    );
    console.log(rethMarkets);
    return rethMarkets;
  } catch (error) {
    console.error(`Failed to fetch data `, error);
    return [];
  }
}
