import React from "react";
import { LogoIcon, ProtocolIcon } from "@/components/icon";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import AaveList from "@/components/aave";
import SiloList from "@/components/silo";
import MoonwellList from "@/components/moonwell";
import MorphoList from "@/components/morpho";
import BalancerList from "@/components/balancer";
import UniswapList from "@/components/uniswap";
import { updateUniswapData } from "@/lib/handler/uniswap";
import { updateBalancerData } from "@/lib/handler/balancer";
import { updateAaveData } from "@/lib/handler/aave";
import { updateMoonwellData } from "@/lib/handler/moonwell";
import { updateSiloData } from "@/lib/handler/silo";
import { updateMorphoData } from "@/lib/handler/morpho";
import LendingStrategy from "@/components/lendingstrategy";
import LiquidityStrategy from "@/components/liquiditystrategy";

const liquidityStrategies = [
  {
    id: 1,
    name: "rETH/ETH Stable Concentrated",
    apy: "Medium",
    risk: "Low",
    description:
      "rETH/ETH stable concentrated pools experience low volatility, which can provide steady returns. Since rETH is a yield-bearing token, its exchange rate with ETH will steadily rise over time. As a result, you'll need to frequently adjust your pool position to account for this changing ratio to maintain optimal returns.",
  },
  {
    id: 2,
    name: "RPL/ETH Wide Concentrated",
    apy: "Medium",
    risk: "Low",
    description:
      "RPL/ETH concentrated pools are subject to high volatility, making it easy to fall out of the market-making range. It is advisable to use automated liquidity management protocols, such as Gamma, to effectively manage these risks and optimize returns.",
  },
  {
    id: 3,
    name: "Auto Market Liquidity Management",
    apy: "Medium",
    risk: "Low",
    description:
      "Liquidity management protocols, such as Gamma and Steer, can assist in managing pool positions automatically, eliminating the need for frequent manual adjustments due to price fluctuations. These tools optimize liquidity and enhance yield potential, allowing users to respond more effectively to market changes.",
  },
  {
    id: 4,
    name: "LP APR Boost",
    apy: "High",
    risk: "Low",
    description:
      "LP APR Boost allows users to stake LP tokens in protocols like Aura, Beefy, and Cakepie to earn enhanced yields. Typically, this can result in an APR boost of 1.5x to 2.5x, maximizing returns on liquidity provision.",
  },
];


export default async function Home() {

  const [aaveData, moonwellData, siloData, morphoData, balancerData, uniswapData] = await Promise.all([
    updateAaveData(),
    updateMoonwellData(),
    updateSiloData(),
    updateMorphoData(),
    updateBalancerData(),
    updateUniswapData(),
  ]);

  return (
    <main className="bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="px-12 py-12">
          <div className="flex items-center justify-center space-x-2 cursor-pointer">
            <Link href="/">
              <div className="w-10 h-10">
                <LogoIcon />
              </div>
            </Link>
            <Link href="/">
              <div className="text-2xl text-[#272E35] font-bold">RocketFi</div>
            </Link>
            <div className="grow"></div>
            <nav>
              <div className="flex items-center justify-center space-x-6">
                <Link href="https://rocketpool.net" target="_blank">
                  <div className="text-lg text-[#1E2528]">RocketPool</div>
                </Link>
                <Link
                  href="https://rocketpool.net/node-staking/what-is-node-staking"
                  target="_blank"
                >
                  <div className="text-lg text-[#1E2528]">Node Staking</div>
                </Link>
                <Link
                  href="https://rocketpool.net/liquid-staking/what-is-liquid-staking"
                  target="_blank"
                >
                  <div className="text-lg text-[#1E2528]">Liquid Staking</div>
                </Link>
              </div>
            </nav>
          </div>
          <div className="mt-24">
            <div className="text-3xl text-[#272E35] font-medium font-serif">
              Lending/Borrow Market
            </div>
            <div className="mt-20">
              <div className="text-[#272E35] text-base font-inter font-medium">
                Learn Strategy
              </div>
              <div className="mt-10">
                <LendingStrategy />
              </div>
            </div>
            <div className="mt-10">
              <div className="mt-10">
                <div className="w-20 h-fit">
                  <ProtocolIcon icon="Aave" />
                </div>
                <div className="mt-10">
                  <AaveList data={aaveData} />
                </div>
              </div>
              <div className="mt-10">
                <div className="w-24 h-fit bg-[#2474DA] p-2 rounded-md">
                  <ProtocolIcon icon="Moonwell" />
                </div>
                <div className="mt-10">
                  <MoonwellList data={moonwellData} />
                </div>
              </div>
              <div className="mt-10">
                <div className="w-14">
                  <ProtocolIcon icon="Silo" />
                </div>
                <div className="mt-10">
                  <SiloList data={siloData} />
                </div>
              </div>
              <div className="mt-10">
                <div className="w-24 h-fit">
                  <ProtocolIcon icon="Morpho" />
                </div>
                <div className="mt-10">
                  <MorphoList data={morphoData} />
                </div>
              </div>
            </div>
            <div className="mt-24">
              <div className="text-3xl text-[#272E35] font-medium font-serif">
                Liquidity Market
              </div>
              <div className="mt-20">
                <div className="text-[#272E35] text-base font-inter font-medium">
                  Learn Strategy
                </div>
                <div className="mt-10">
                  <LiquidityStrategy />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <div className="mt-10">
              <div className="w-24 h-fit">
                <ProtocolIcon icon="Balancer" />
              </div>
              <div className="mt-10">
                <BalancerList data={balancerData} />
              </div>
            </div>
            <div className="mt-10">
              <div className="w-24 h-fit">
                <ProtocolIcon icon="Uniswap" />
              </div>
              <div className="mt-10">
                <UniswapList data={uniswapData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

