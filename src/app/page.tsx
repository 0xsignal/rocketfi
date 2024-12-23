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
import { ExternalLinkButton } from "@/components/ui/externallink";
import { ProtocolCard } from "@/components/protocolcard";

const protocols = [
  {
    name: "EigenLayer",
    description: "Stake rETH on EigenLayer to participate in Restaking, earn rewards, and boost your rETH yield.",
    link: "https://app.eigenlayer.xyz/restake/rETH",
  },
  {
    name: "Pendle",
    description: "Deposit rETH on Pendle to earn swap fee, PENDLE incentives, fixed yield and underlying yield. ",
    link: "https://app.pendle.finance/trade/pools/0x14fbc760efaf36781cb0eb3cb255ad976117b9bd/zap/in?chain=arbitrum",
  },
  {
    name: "Curve",
    description: "Provide rETH liquidity on Curve like Balancer to earn yield and enhance your returns.",
    link: "https://curve.fi/#/ethereum/pools/factory-stable-ng-15/deposit",
  },
  {
    name: "Pancake",
    description: "Provide rETH liquidity on Pancake like Balancer to earn yield and enhance your returns.",
    link: "https://pancakeswap.finance/liquidity/pool/eth/0x2201d2400d30BFD8172104B4ad046d019CA4E7bd",
  },
  {
    name: "Contango",
    description: "Automate low-cost leverage staking to boost rETH staking yields.",
    link: "https://app.contango.xyz/strategies/leveraged-staking/eth?selectedChains=1%2C10%2C56%2C100%2C137%2C8453%2C42161%2C43114%2C534352%2C59144",
  },
  {
    name: "Gravita",
    description: "Collateralize rETH to mint Grar stablecoin and earn extra DeFi rewards.",
    link: "https://app.gravitaprotocol.com/vessels/reth",
  },
  {
    name: "Spark",
    description: "Collateralize rETH to mint USDS stablecoin and earn extra DeFi rewards.",
    link: "https://app.spark.fi/borrow",
  },
]

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
          </div>

          <div className="mt-10 md:mt-16">
            <div className="text-sm md:text-base text-[#272E35] font-inter leading-relaxed">
              RocketFi is a community-driven, unofficial explorer for Rocket Pool DeFi integration. It helps rETH holders maximize their participation in DeFi to earn rewards and unlock the utility of rETH. Additionally, it supports node operators in leveraging DeFi to enhance their node operations.
            </div>
            <div className="mt-4 md:flex md:items-center gap-2 md:gap-3 grid grid-cols-3">
              <ExternalLinkButton
                href="https://rocketpool.net"
                className="bg-white px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium grid-cols-1"
              >
                RocketPool
              </ExternalLinkButton>
              <ExternalLinkButton
                href="https://stake.rocketpool.net/"
                className="bg-white px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium grid-cols-1"
              >
                Get rETH
              </ExternalLinkButton>
              <ExternalLinkButton
                href="https://rocketpool.net/protocol/integrations"
                className="bg-white px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium grid-cols-1"
              >
                Integrate rETH
              </ExternalLinkButton>
              <ExternalLinkButton
                href="https://rocketpool.net/node-staking/what-is-node-staking"
                className="bg-white px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium grid-cols-1"
              >
                Run a Node
              </ExternalLinkButton>
            </div>
          </div>
          <div className="mt-12 md:mt-16">
            <div className="text-xl md:text-2xl text-[#272E35] font-medium font-serif">
              Lending/Borrow Market
            </div>
            <div className="mt-8 md:mt-16">
              <div className="text-[#272E35] text-sm md:text-base font-inter font-medium">
                Learn
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
                <div className="mt-4 md:flex md:items-center gap-2 md:gap-3 grid grid-cols-2">
                  <ExternalLinkButton
                    href="https://aave.com/"
                    className="bg-white px-1 text-xs text-[#272E35] gap-1 font-medium grid-cols-1"
                  >
                    since 2017 aave.com
                  </ExternalLinkButton>
                  <ExternalLinkButton
                    href="https://aave.com/security"
                    className="bg-white px-1 text-xs text-[#272E35] gap-1 font-medium grid-cols-1"
                  >
                    Audit
                  </ExternalLinkButton>
                </div>
                <div className="mt-10">
                  <AaveList data={aaveData} />
                </div>
              </div>
              <div className="mt-10">
                <div className="w-24 h-fit bg-[#2474DA] p-2 rounded-md">
                  <ProtocolIcon icon="Moonwell" />
                </div>
                <div className="mt-4 md:flex md:items-center gap-2 md:gap-3 grid grid-cols-2">
                  <ExternalLinkButton
                    href="https://moonwell.fi/"
                    className="bg-white px-1 text-xs text-[#272E35] gap-1 font-medium grid-cols-1"
                  >
                    since 2021 moonwell.fi
                  </ExternalLinkButton>
                  <ExternalLinkButton
                    href="https://docs.moonwell.fi/moonwell/protocol-information/audits"
                    className="bg-white px-1 text-xs text-[#272E35] gap-1 font-medium grid-cols-1"
                  >
                    Audit
                  </ExternalLinkButton>
                </div>
                <div className="mt-10">
                  <MoonwellList data={moonwellData} />
                </div>
              </div>
              <div className="mt-10">
                <div className="w-14">
                  <ProtocolIcon icon="Silo" />
                </div>
                <div className="mt-4 md:flex md:items-center gap-2 md:gap-3 grid grid-cols-2">
                  <ExternalLinkButton
                    href="https://silo.finance/"
                    className="bg-white px-1 text-xs text-[#272E35] gap-1 font-medium grid-cols-1"
                  >
                    since 2020 silo.finance
                  </ExternalLinkButton>
                  <ExternalLinkButton
                    href="https://silopedia.silo.finance/security/audit"
                    className="bg-white px-1 text-xs text-[#272E35] gap-1 font-medium grid-cols-1"
                  >
                    Audit
                  </ExternalLinkButton>
                </div>
                <div className="mt-10">
                  <SiloList data={siloData} />
                </div>
              </div>
              <div className="mt-10">
                <div className="w-24 h-fit">
                  <ProtocolIcon icon="Morpho" />
                </div>
                <div className="mt-4 md:flex md:items-center gap-2 md:gap-3 grid grid-cols-2">
                  <ExternalLinkButton
                    href="https://morpho.org/"
                    className="bg-white px-1 text-xs text-[#272E35] gap-1 font-medium grid-cols-1"
                  >
                    since 2021 morpho.org
                  </ExternalLinkButton>
                  <ExternalLinkButton
                    href="https://docs.morpho.org/security-reviews"
                    className="bg-white px-1 text-xs text-[#272E35] gap-1 font-medium grid-cols-1"
                  >
                    Audit
                  </ExternalLinkButton>
                </div>
                <div className="mt-10">
                  <MorphoList data={morphoData} />
                </div>
              </div>
            </div>
            <div className="mt-12 md:mt-16">
              <div className="text-xl md:text-2xl text-[#272E35] font-medium font-serif">
                Liquidity Market
              </div>
              <div className="mt-8 md:mt-16">
                <div className="text-[#272E35] text-sm md:text-base font-inter font-medium">
                  Learn
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
              <div className="mt-4 md:flex md:items-center gap-2 md:gap-3 grid grid-cols-2">
                <ExternalLinkButton
                  href="https://balancer.fi/"
                  className="bg-white px-1 text-xs text-[#272E35] gap-1 font-medium grid-cols-1"
                >
                  since 2019 balancer.fi
                </ExternalLinkButton>
                <ExternalLinkButton
                  href="https://silopedia.silo.finance/security/audit"
                  className="bg-white px-1 text-xs text-[#272E35] gap-1 font-medium grid-cols-1"
                >
                  Audit
                </ExternalLinkButton>
              </div>
              <div className="mt-10">
                <BalancerList data={balancerData} />
              </div>
            </div>
            <div className="mt-10">
              <div className="w-24 h-fit">
                <ProtocolIcon icon="Uniswap" />
              </div>
              <div className="mt-4 md:flex md:items-center gap-2 md:gap-3 grid grid-cols-2">
                <ExternalLinkButton
                  href="https://uniswap.org/"
                  className="bg-white px-1 text-xs text-[#272E35] gap-1 font-medium grid-cols-1"
                >
                  since 2018 uniswap.org
                </ExternalLinkButton>
                <ExternalLinkButton
                  href="https://github.com/Uniswap/v3-periphery/blob/main/bug-bounty.md"
                  className="bg-white px-1 text-xs text-[#272E35] gap-1 font-medium grid-cols-1"
                >
                  Audit
                </ExternalLinkButton>
              </div>
              <div className="mt-10">
                <UniswapList data={uniswapData} />
              </div>
            </div>
          </div>
          <div className="mt-12 md:mt-16">
            <div className="text-xl md:text-2xl text-[#272E35] font-medium font-serif">
              More Integration
            </div>
            <div className="mt-8 md:mt-16">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {protocols.map((protocol, index) => (
                  <div className="col-span-1">
                    <ProtocolCard
                      key={index}
                      name={protocol.name}
                      description={protocol.description}
                      link={protocol.link}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

