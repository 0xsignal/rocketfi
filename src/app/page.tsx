import React from "react";
import { LogoIcon } from "@/components/icon";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, BarChart2, Zap } from "lucide-react";
import LendingList from "@/components/lendingList";
import LiquidityList from "@/components/liquidityList";
import AaveList from "@/components/aave";

const lendingStrategies = [
  {
    id: 1,
    name: "Deposit rETH/Borrow ETH Strategy",
    apy: "Low",
    risk: "Low",
    description:
      "Suitable for rETH holders, this setup allows you to benefit from both the ETH yield and the utility of ETH.",
    details:
      "This strategy offers low risk and is suitable for most rETH holders. As long as the combined yield from borrowing ETH and rETH APR exceeds the lending ETH rate, it results in a net positive return.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    name: "Deposit ETH/Borrow RPL Strategy",
    apy: "Medium",
    risk: "Medium",
    description:
      "This strategy is suitable for node operators who prefer not to purchase RPL but still want to participate in Rocket Pool node operations or earn RPL staking rewards",
    details:
      "This strategy presents moderate risk and is ideal for node operators. It applies in two scenarios: one, when you want to become a node operator without purchasing RPL, and two, when the effective RPL stake is low. In this case, borrowing RPL before the snapshot allows you to earn RPL staking rewards. The main risk is a sudden rise in RPL price, which could lead to liquidation of the ETH collateral.",
    icon: BarChart2,
  },
  {
    id: 3,
    name: "Loop Leverage Strategy",
    apy: "High",
    risk: "Medium",
    description:
      "This is a moderate-risk strategy where you continuously borrow, purchase from the market, and then stake or collateralize in a loop to seek higher yields.",
    details:
      "Loop leverage lending is ideal for high-incentive scenarios, where users continuously borrow and collateralize to maximize returns. Generally, the higher the number of loops, the greater the potential reward, but also the higher the risk. The main risk lies in managing leverage, as overexposure or market volatility could trigger liquidation if the borrowed asset's price increases sharply or if the collateral's value decreases significantly.",
    icon: Zap,
  },
];

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

export default function Home() {
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
            <div className="text-base text-[#272E35] font-medium font-inter">
              Lending/Borrow Market
            </div>
            <div className="mt-10 bg-white rounded-xl overflow-hidden px-6 py-4 text-gray-500">
              <Accordion type="single" collapsible className="w-full">
                {lendingStrategies.map((strategy) => (
                  <AccordionItem
                    value={`strategy-${strategy.id}`}
                    key={strategy.id}
                  >
                    <AccordionTrigger>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <strategy.icon className="mr-2 h-5 w-5" />
                          <span className="font-medium text-[#272E35]">
                            {strategy.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <Badge
                            variant={
                              strategy.risk === "Low"
                                ? "secondary"
                                : strategy.risk === "Medium"
                                  ? "destructive"
                                  : "outline"
                            }
                          >
                            {strategy.risk}Risk
                          </Badge>
                          <span className="">APR: {strategy.apy}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-4 space-y-4">
                        <p className="text-sm">{strategy.description}</p>
                        <p className="text-sm text-gray-900">
                          {strategy.details}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="mt-10">
              <div className="mt-4">
                <div className="text-base text-[#272E35] font-medium font-inter">
                  AAVE
                </div>
                <AaveList />
              </div>
            </div>
            <div className="mt-24">
              <div className="text-2xl text-[#272E35] font-medium">
                Liquidity Market
              </div>
              <div className="mt-10 bg-white rounded-lg overflow-hidden px-6 py-4 text-gray-500">
                <Accordion type="single" collapsible className="w-full">
                  {liquidityStrategies.map((strategy) => (
                    <AccordionItem
                      value={`strategy-${strategy.id}`}
                      key={strategy.id}
                    >
                      <AccordionTrigger>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <span className="font-medium text-[#272E35]">
                              {strategy.name}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-base">
                            <Badge
                              variant={
                                strategy.risk === "Low"
                                  ? "secondary"
                                  : strategy.risk === "Medium"
                                    ? "destructive"
                                    : "outline"
                              }
                            >
                              {strategy.risk}Risk
                            </Badge>
                            <span className="">APR: {strategy.apy}</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="mt-4 space-y-4">
                          <p className="text-base">{strategy.description}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <div className=""></div>
          </div>
        </div>
      </div>
    </main>
  );
}
