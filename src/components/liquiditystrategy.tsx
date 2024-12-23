'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useMDXComponents } from '@/components/ui/mdx'

const Lpfarm = `

LP (Liquidity Provider) farming is a popular DeFi strategy where users earn rewards by providing liquidity to decentralized exchanges (DEXs). It’s a way to generate passive income while contributing to the liquidity of trading pairs. 

## How LP Farming Works

- **Deposit Assets**: Users deposit two assets (e.g., rETH and ETH) into a liquidity pool on a DEX. This liquidity enables smooth trading between these assets and earns the user trading fees.
- **Earn LP Tokens**: In return for providing liquidity, users receive LP tokens. These tokens represent the user’s share of the liquidity pool and entitle them to a proportion of the trading fees generated by the pool.
- **Stake LP Tokens**: Users can stake their LP tokens in farming contracts, which are often available on the same or partnered platforms. Staking LP tokens provides additional rewards, usually in the form of the platform’s native tokens.

## Benefits of LP Farming

- **Passive Income**: Earn trading fees and additional farming rewards without active management.
- **Token Incentives**: Many platforms offer attractive token rewards to incentivize liquidity provision.

## Risks of LP Farming

- **Impermanent Loss**: Occurs when the price ratio of the deposited assets changes, potentially reducing the value of your liquidity compared to simply holding the assets.This is a significant risk in volatile markets but is offset by trading fees and rewards in some cases.
- **Fluctuating Yields**: Farming rewards and trading fees can vary based on market activity and token emission rates. Rewards might decrease over time as the platform matures or competition increases.
- **Smart Contract Risks**: DeFi protocols rely on smart contracts, which can be vulnerable to bugs or exploits. Always ensure the platform you use has been audited.
- **Market Volatility**: The value of rewards and LP tokens can fluctuate with market conditions, potentially impacting overall profitability.

## rETH/ETH/RPL

For the rETH/ETH pair, being a stable pair, the risks of LP farming are relatively low. If there are substantial yields available, it can be a good opportunity to participate. For rETH paired with other LSTs, participants can continuously earn ETH yield, making the LP rewards quite attractive. However, for RPL/ETH LPs, the price fluctuations are significant, posing higher risks. It’s crucial to monitor the market range and price movements carefully. 
`
const Lpboost = `
Many decentralized exchanges (DEXs) leverage the ve (vote-escrowed) model to enhance the utility of their native tokens and boost liquidity pool (LP) incentives. This tutorial focuses on how the ve model works and how it can benefit LPs, using Balancer and Aura as examples.

## What is the ve Model?

The ve model is a tokenomics mechanism that encourages long-term commitment from token holders by offering boosted incentives. Here’s how it works:

- Lock Native Tokens: Token holders lock their DEX’s native tokens (e.g., BAL for Balancer) to receive vote-escrowed tokens (e.g., veBAL). The locking period can vary, and longer locks often result in more ve tokens.
- Boost LP Rewards: ve token holders can direct additional incentives to specific LP positions, increasing their APR (Annual Percentage Rate).This mechanism incentivizes LPs to lock tokens and align with the protocol’s long-term goals.

## For LPs Without ve Tokens

If you are an LP who doesn’t hold or wish to lock native tokens like BAL, you can still benefit from boosted rewards by leveraging third-party platforms such as Aura. Here’s how:

- Stake LP Tokens on Aura: Aura is built on top of platforms like Balancer, allowing LPs to stake their tokens. By staking on Aura, LPs gain access to boosted APRs without needing veBAL.
- Performance Fees: Aura charges a small performance fee for providing this service. The remaining boosted rewards are distributed to the LPs.
- Safety Considerations: Since your LP tokens are staked with Aura, understanding its security measures and risks is essential. Always verify if the platform has undergone audits and evaluate its track record in managing funds securely.

`

const Liquiditymanagement = `
Uniswap v3 revolutionized decentralized liquidity provision by introducing Concentrated Liquidity, allowing LPs to allocate their liquidity within specific price ranges. This approach enhances capital efficiency and deepens liquidity within selected ranges but introduces complexities for liquidity providers (LPs).

## Challenges of Concentrated Liquidity

- Active Management: LPs must monitor and adjust their price ranges actively to ensure their liquidity remains within the trading range. Without proper management, liquidity can become inactive, leading to missed trading fees.
- Increased Complexity:Determining optimal price ranges requires market knowledge and constant attention, which can be a barrier for many users.

## Automated Liquidity Management Solutions

To address these challenges, automated liquidity management protocols like Gamma Strategies have emerged. These platforms simplify LP participation by dynamically adjusting price ranges on behalf of the users. How Gamma Works:

- Deposit Liquidity: Users deposit their tokens into Gamma’s liquidity pools. Gamma aggregates these deposits and provides liquidity to Uniswap v3 on behalf of its users.
- Dynamic Range Adjustment: Gamma actively manages liquidity by adjusting the price ranges to maintain efficiency and maximize fee generation.
- Simplified LP Farming: By automating range adjustments, Gamma significantly lowers the barriers to entry for participating in LP farming on Uniswap v3.

## Benefits of Using Gamma

- Ease of Use: Users do not need to actively monitor the market or adjust ranges manually.
- Enhanced Capital Efficiency: Gamma’s dynamic strategies aim to maximize liquidity utilization and fee generation.
- Accessibility: By pooling resources, Gamma allows smaller LPs to participate in concentrated liquidity farming.

## Risks to Consider

- Protocol Security: Depositing tokens into Gamma’s pools introduces reliance on its smart contracts. Any vulnerabilities or exploits could result in loss of funds.Ensure the platform has undergone rigorous audits and has a strong security track record.
- Strategy Performance: Gamma’s automated strategies might not always outperform manually managed positions, especially in volatile or low-liquidity markets.
- Fee Structure: Gamma typically charges fees for its services, which can impact overall returns.
`

const strategies = [
  {
    title: "LP Farming",
    description: "Users can earn rewards by providing liquidity to a decentralized exchange.",
    apy: "Medium",
    risk: "Low",
    details: Lpfarm,
  },
  {
    title: "LP Boost APR",
    description: "Stake LP token without VE position to maxmium incentives.",
    apy: "High",
    risk: "Medium",
    details: Lpboost,
  },
  {
    title: "Liquidity Management",
    description: "Optimizing LP Yields with Automated Liquidity Management Protocols.",
    apy: "Medium",
    risk: "Medium",
    details: Liquiditymanagement,
  }
]


export default function LiquidityStrategy() {
  const [openDialog, setOpenDialog] = useState<number | null>(null)
  const [serializedContent, setSerializedContent] = useState<any>(null)

  const handleOpenDialog = async (index: number) => {
    const content = await serialize(strategies[index].details)
    setSerializedContent(content)
    setOpenDialog(index)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {strategies.map((strategy, index) => (
        <Dialog key={index} open={openDialog === index} onOpenChange={(open) => !open && setOpenDialog(null)}>
          <Card className="bg-white rounded-2xl">
            <CardHeader className='flex flex-row items-center space-x-2 space-y-0'>
              <div className='text-sm md:text-base font-bold text-[#272E35]'>
                {strategy.title}
              </div>
              <div className='grow'></div>
              <div className='px-1.5 py-1 text-xs rounded-md bg-[#F4F4F5]'>
                <DialogTrigger asChild>
                  <Link
                    href="#"
                    className="font-medium hover:underline inline-block text-[#272E35]"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpenDialog(index);
                    }}
                  >
                    How does it work?
                  </Link>
                </DialogTrigger>
              </div>
            </CardHeader>
            <CardContent className='text-xs md:text-sm text-[#6B7280]'>
              <CardDescription className='leading-relaxed'>{strategy.description}</CardDescription>
              <div className="flex items-center space-x-2 text-xs mt-4">
                <Badge
                  variant={
                    strategy.risk === "Low"
                      ? "secondary"
                      : strategy.risk === "Medium"
                        ? "destructive"
                        : "outline"
                  }
                >
                  {strategy.risk} Risk
                </Badge>
                <Badge
                  variant={
                    strategy.apy === "Low"
                      ? "secondary"
                      : strategy.apy === "Medium"
                        ? "destructive"
                        : "outline"
                  }
                >
                  {strategy.apy} APR
                </Badge>
              </div>
            </CardContent>
          </Card>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className='text-center text-[#272E35] text-base md:text-xl font-bold'>{strategy.title}</DialogTitle>
            </DialogHeader>
            {serializedContent && openDialog === index && (
              <div className="">
                <MDXRemote {...serializedContent} components={useMDXComponents({})}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}


