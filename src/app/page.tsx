import React from "react";
import { LogoIcon, ProtocolIcon } from "@/components/icon";
import Link from "next/link";
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
      <div className="md:max-w-7xl mx-auto">
        <div className="md:px-12 md:py-12 px-4 py-4">
          <div className="flex items-center justify-center space-x-2 cursor-pointer">
            <Link href="/">
              <div className="w-10 h-10">
                <LogoIcon />
              </div>
            </Link>
            <Link href="/">
              <div className="text-base md:text-2xl text-[#272E35] font-bold">RocketFi</div>
            </Link>
            <div className="grow"></div>
            <nav>
              <div className="flex items-center justify-center space-x-6">
                <Link href="https://rocketpool.net" target="_blank">
                  <div className="text-sm md:text-lg text-[#1E2528]">RocketPool</div>
                </Link>
                <Link
                  href="https://rocketpool.net/node-staking/what-is-node-staking"
                  target="_blank"
                >
                  <div className="text-sm md:text-lg text-[#1E2528]">Node Staking</div>
                </Link>
                <Link
                  href="https://rocketpool.net/liquid-staking/what-is-liquid-staking"
                  target="_blank"
                >
                  <div className="text-sm md:text-lg text-[#1E2528]">Liquid Staking</div>
                </Link>
              </div>
            </nav>
          </div>
          <div className="mt-16 md:mt-24">
            <div className="text-xl md:text-3xl text-[#272E35] font-medium font-serif">
              Lending/Borrow Market
            </div>
            <div className="mt-12 md:mt-20">
              <div className="text-[#272E35] text-sm md:text-base font-inter font-medium">
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
            <div className="mt-16 md:mt-24">
              <div className="text-xl md:text-3xl text-[#272E35] font-medium font-serif">
                Liquidity Market
              </div>
              <div className="mt-12 md:mt-20">
                <div className="text-[#272E35] text-sm md:text-base font-inter font-medium">
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

