// lib/fetchPendleMarkets.ts
import { PendleMarket } from "@/lib/type";

const BASE_URL = "https://api-v2.pendle.finance/core/v1";

export default async function fetchPendleMarkets(
  chainIds: number[],
  nameFilter?: string[],
) {
  const results = await Promise.all(
    chainIds.map(async (chainId) => {
      const url = `${BASE_URL}/${chainId}/markets/active`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        const allMarkets: PendleMarket[] = json.markets ?? [];

        if (nameFilter && nameFilter.length > 0) {
          return allMarkets.filter((m) =>
            nameFilter.some((key) =>
              m.name.toLowerCase().includes(key.toLowerCase()),
            ),
          );
        }

        return allMarkets;
      } catch (err) {
        console.error(`Failed to fetch chain ${chainId}:`, err);
        return [];
      }
    }),
  );

  return results.flat();
}
