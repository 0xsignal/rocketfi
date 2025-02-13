'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useMDXComponents } from '@/components/ui/mdx'

const Longshort = `
In this tutorial, we’ll explore how to use DeFi lending protocols to take long and short positions with the example of the ETH/RPL exchange rate. By utilizing lending protocols, you can leverage your assets to potentially increase profits while managing your risks.

![Long/Short](/longshort.png)

## What are Long and Short Positions?

- **Long Position**: Betting that the price of an asset will increase. In this case, you believe that RPL will outperform ETH in the coming months.
- **Short Position**: Betting that the price of an asset will decrease, typically by borrowing and selling it, then buying it back at a lower price.

## Step 1: Understanding the Strategy with ETH/RPL

Let’s assume you expect RPL to outperform ETH over the next month. You can use the following steps to execute a long position in RPL:

- **Buy RPL**: Purchase RPL tokens, as you believe its value will rise against ETH.
- **Deposit in a Lending Protocol**: Deposit the RPL tokens into a DeFi lending protocol like Aave or Compound. This allows you to earn interest on your deposit.
- **Borrow ETH**: Use your RPL as collateral to borrow ETH from the lending protocol.
- **Swap ETH for RPL**: On a DeFi aggregator, swap the borrowed ETH for more RPL. Now, you hold more RPL, which increases your exposure to RPL’s price movement.

## Step 2: Repeating the Process

To increase your exposure, you can repeat the process:

- Deposit more RPL and borrow more ETH.
- Swap the borrowed ETH for more RPL and deposit it back into the lending protocol.
- Continue this process until you’re comfortable with your position size.

## Step 3: Monitoring the Position

While executing this strategy, it's crucial to monitor several factors to avoid liquidation:

- **ETH/RPL Exchange Rate**: Track the price fluctuations between ETH and RPL to ensure the value of your collateral (RPL) remains sufficient to cover the borrowed ETH.
- **ETH Borrowing Rates**: Keep an eye on the interest rates for borrowing ETH. High rates can eat into your profits.
- **Position Health**: Ensure your loan-to-value (LTV) ratio stays healthy to avoid liquidation. If the value of RPL drops significantly, the protocol may liquidate your position to cover the borrowed ETH.

## Step 4: Exiting the Position

Once the price of RPL has risen to your target, it’s time to close your position:

- **Withdraw RPL from the Lending Protocol**: Withdraw your RPL from the lending protocol.
- **Swap RPL for ETH**: Use a DeFi aggregator to swap your RPL back into ETH.
- **Repay the Loan**: Repay the borrowed ETH, plus any interest incurred.
- **Profit Realized**: The remaining ETH after repaying the loan is your profit, which you gained from the rise in RPL's price.

## Conclusion

This strategy allows you to leverage your assets in the DeFi space by taking advantage of price movements between ETH and RPL. However, it’s crucial to monitor the position carefully to manage risk, as fluctuations in the market and borrowing rates can lead to liquidation if not managed properly.

`
const LeverageStaking = `
Leverage staking allows ETH stakers to amplify their staking rewards by using borrowed funds in a cyclical process. This method is particularly beneficial for rETH holders seeking higher yields. Below, we outline how you can execute this strategy step-by-step, as well as key safety considerations.

![LeverageStaking](/lerverage.png)

## What is Leverage Staking?

Leverage staking involves staking ETH to mint liquid staking tokens like rETH, depositing those tokens into lending protocols, borrowing more ETH, and repeating the process. This increases your exposure to staking rewards but also carries additional risks. The strategy is particularly effective for those holding rETH from Rocket Pool, as it provides flexibility and yield opportunities.

## Step-by-Step Guide to Leverage Staking

### Step 1: Stake ETH to Mint rETH

Stake ETH on Rocket Pool to mint rETH. Rocket Pool offers decentralized ETH staking with rETH tokens representing your staked ETH plus accrued rewards.

### Step 2: Deposit rETH into a Lending Protocol

Deposit your rETH into a lending protocol that supports it, such as Aave or a similar platform. This allows you to use rETH as collateral to borrow ETH.

### Step 3: Borrow ETH Against rETH

Borrow ETH using your rETH as collateral. The amount you can borrow depends on the loan-to-value (LTV) ratio set by the protocol.

### Step 4: Swap Borrowed ETH for More rETH

Use a DeFi aggregator (e.g., 1inch or Matcha) to swap the borrowed ETH for more rETH.

### Step 5: Repeat the Process

- Deposit the newly minted rETH back into the lending protocol.
- Borrow additional ETH and repeat the steps to amplify your staking position.
- Continue this loop until you reach a comfortable leverage level. Avoid over-leveraging to reduce the risk of liquidation.

## Exiting the Position

When you decide to unwind your leveraged staking:

- **Withdraw rETH from the Lending Protocol**: Start by withdrawing rETH from the lending protocol.
- **Swap or Unstake rETH for ETH**: Swap the withdrawn rETH for ETH using a DeFi aggregator or unstake it directly on Rocket Pool to convert it back to ETH.
- **Repay the Loan**: Use the ETH to repay your borrowed amount, including any interest.
- **Repeat Until Fully Closed**: Continue withdrawing, swapping/unstaking, and repaying until your entire borrowing position is cleared.

## Automating Leverage Staking

For those who prefer not to manage these steps manually, platforms like [Contango](https://app.contango.xyz/strategies/leveraged-staking/eth?selectedChains=1%2C10%2C56%2C100%2C137%2C8453%2C42161%2C43114%2C534352%2C59144) provide automated leverage staking services. These protocols handle the repetitive steps for you, streamlining the process.

## Safety Considerations

- **Monitor Position Health**: Keep an eye on the health factor of your position in the lending protocol to avoid liquidation.
- **Interest Rate Differential**: Ensure the difference between the ETH borrowing rate and the rETH staking yield is favorable. Negative spreads can erode your profits.
- **Leverage Levels**: Avoid excessive leverage, as it increases the risk of losing your collateral in volatile markets.

## Conclusion

Leverage staking with rETH can significantly enhance your ETH staking rewards, but it requires careful management and monitoring. By following the steps outlined and keeping safety considerations in mind, you can optimize your yield while mitigating risks. If you’re unsure about manual operations, automated solutions like Contango offer a convenient alternative to engage in leverage staking with less hassle.

`

const Rpleth = `
For node operators participating in the Rocket Pool ecosystem, staking RPL can unlock additional rewards and enhance yield. However, not every node operator is eager to purchase RPL outright. Fortunately, DeFi lending protocols offer a flexible alternative to obtain RPL without upfront investment.

![Node](/node.png)

## Guide

Here’s how node operators can leverage their ETH holdings to borrow RPL and stake it:

### Deposit ETH in a Lending Protocol

- Select a reliable DeFi lending platform such as Aave or Compound that supports ETH deposits.
- Deposit ETH into the protocol as collateral. This provides you with the ability to borrow assets against your deposited ETH.

### Borrow RPL

- Use your ETH collateral to borrow RPL tokens from the protocol.
- Ensure you borrow within safe limits to maintain a healthy collateralization ratio and avoid liquidation risks.

### Stake Borrowed RPL

- Use the borrowed RPL to meet Rocket Pool’s staking requirements.

By staking RPL, you unlock additional rewards for your node operation, enhancing your overall yield.

## Risk Management and Position Health

While this strategy can be highly effective, it’s critical to actively manage the associated risks:

### Price Volatility

- RPL’s value relative to ETH can fluctuate significantly. If the price of RPL rises, the cost of your borrowed position increases.
- Regularly monitor the RPL/ETH exchange rate to ensure your collateral remains sufficient.

### Loan-to-Value (LTV) Ratio

- Keep your LTV ratio at a safe level. DeFi protocols typically have a liquidation threshold—if your collateral value drops too low, your position may be liquidated.

### Leave a buffer of ETH to top up collateral if needed.

- **Interest Rates**: Borrowing RPL incurs interest. Ensure that the staking rewards outweigh the borrowing costs to maintain profitability.

- **Buffer for Market Swings**: To safeguard against unexpected market movements, maintain an additional buffer in your collateral. This reduces the risk of forced liquidation.

# Conclusion

By leveraging ETH to borrow RPL, node operators can participate in Rocket Pool’s staking ecosystem without purchasing RPL outright. This strategy provides a flexible way to maximize rewards, but it requires diligent monitoring of collateral health and market conditions. With proper risk management, node operators can enhance their yield while maintaining financial flexibility.
`

const strategies = [
  {
    title: "Long/Short",
    description: "Take long or short positions on the RPL/ETH exchange rate, or the rETH/USDC exchange rate to generate profits.",
    apy: "Medium",
    risk: "Medium",
    details: Longshort,
  },
  {
    title: "Leverage Staking",
    description: "Stake rETH, borrow ETH against it, and repeatedly use the borrowed ETH to purchase rETH to maximize staking rewards.",
    apy: "High",
    risk: "Low",
    details: LeverageStaking,
  },
  {
    title: "RPL/ETH",
    description: "Node operators can use ETH as collateral to borrow RPL, instead of  purchasing it, which helps increase their node’s APR.",
    apy: "Medium",
    risk: "Medium",
    details: Rpleth,
  }
]


export default function LendingStrategy() {
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
              <div className='text-sm md:text-base font-bold text-[#272E35] tracking-wide'>
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
            <CardContent className='text-sm text-[#6B7280] font-sans'>
              <CardDescription className='leading-relaxed'>{strategy.description}</CardDescription>
              <div className="flex items-center space-x-2 text-xs mt-6">
                <Badge
                  className="tracking-wide"
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
                  className="tracking-wide"
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


