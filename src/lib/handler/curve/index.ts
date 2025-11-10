import { CurveMarket, CurveMarketGauge } from "@/lib/type";

const CURVE_API = "https://prices.curve.finance/v1/chains/ethereum";
const CURVE_GAUGES_API = "https://api.curve.finance/api/getAllGauges";

// 预置数据
const PRESET_LIST: {
  address: string;
  name: string;
  guage: string;
  url: string;
}[] = [
  {
    address: "0xe080027Bd47353b5D1639772b4a75E9Ed3658A0d",
    name: "rETH/osETH Pool",
    guage: "osETH+rETH (0xe080…8A0d)",
    url: "hhttps://www.curve.finance/dex/ethereum/pools/factory-stable-ng-15/deposit",
  },
  {
    address: "0x9EfE1A1Cbd6Ca51Ee8319AFc4573d253C3B732af",
    name: "rETH/ETH Pool",
    guage: "WETH+rETH (0x9EfE…32af)",
    url: "https://www.curve.finance/dex/ethereum/pools/factory-stable-ng-52/deposit",
  },
  {
    address: "0x447Ddd4960d9fdBF6af9a790560d0AF76795CB08",
    name: "rETH/wstETH Pool",
    guage: "rETH+wstETH (0x447D…CB08)",
    url: "https://www.curve.finance/dex/ethereum/pools/factory-v2-89/deposit",
  },
];

export default async function updateCurveData(): Promise<CurveMarketGauge[]> {
  try {
    const [marketsRes, gaugesRes] = await Promise.all([
      fetch(CURVE_API, { next: { revalidate: 10 } }),
      fetch(CURVE_GAUGES_API, { next: { revalidate: 10 } }),
    ]);

    if (!marketsRes.ok) throw new Error(`Markets HTTP ${marketsRes.status}`);
    if (!gaugesRes.ok) throw new Error(`Gauges HTTP ${gaugesRes.status}`);

    const marketsJson = await marketsRes.json();
    const gaugesJson = await gaugesRes.json();

    if (!marketsJson.data || !gaugesJson.data) {
      return [];
    }

    const markets = marketsJson.data as CurveMarket[];
    const gauges = gaugesJson.data ?? {};

    // address 对比，返回带 name + apy 的结果
    const result: CurveMarketGauge[] = PRESET_LIST.flatMap((preset) => {
      const matched = markets.find(
        (m) => m.address.toLowerCase() === preset.address.toLowerCase(),
      );

      if (!matched) return [];

      // 从 gauge 数据里找 apy
      const gaugeInfo = gauges[preset.guage];
      const minapy = gaugeInfo?.gaugeCrvApy[0];
      const maxapy = gaugeInfo?.gaugeCrvApy[1];

      return [
        {
          ...matched,
          guage_apy_min: minapy,
          guage_apy_max: maxapy,
          url: preset.url,
        },
      ];
    });

    return result;
  } catch (err) {
    console.error("Failed to fetch Curve pools:", err);
    return [];
  }
}
