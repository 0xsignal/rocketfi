import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Percent } from "lucide-react"
import Link from "next/link"

const lendingMarkets = [
  { id: 1, name: "Aave", tvl: 5.2, chain:"Ethereum", apy: 3.8, pair: "ETH/RPL", detailsUrl:"https://app.aave.com/reserve-overview/?underlyingAsset=0xae78736cd615f374d3085123a210448e74fc6393&marketName=proto_mainnet_v3"},
  { id: 2, name: "Aave", tvl: 3.7, chain:"Ethereum", apy: 4.2, token: "rETH/ETH", detailsUrl:"https://app.aave.com/reserve-overview/?underlyingAsset=0xae78736cd615f374d3085123a210448e74fc6393&marketName=proto_mainnet_v3" },
  { id: 3, name: "Silo", tvl: 7.1, chain:"Arbitrum", apy: 2.9, token: "rETH/ETH/USDC", detailsUrl:"https://app.silo.finance/silo/0x170A90981843461295a6CE0e0a631eE440222E29" },
  { id: 4, name: "Silo", tvl: 4.5, chain:"Optimism", apy: 5.1, token: "rETH/ETH/USDC", detailsUrl:"https://app.silo.finance/silo/0xa0Cf0085F3DF7d44EAa7AB7EFF41D7867210dB62" },
  { id: 5, name: "Contago", tvl: 4.5, chain:"Base", apy: 5.1, token: "rETH/USDC", detailsUrl:"https://app.contango.xyz/" }
]

export default function LendingList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lendingMarkets.map((market) => (
        <Card key={market.id} className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {market.name}
              <Badge variant="outline">{market.token}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center">
                  <DollarSign className="mr-1 h-4 w-4" />
                  TVL
                </span>
                <span className="font-bold">${market.tvl}B</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center">
                  <Percent className="mr-1 h-4 w-4" />
                  APR
                </span>
                <span className="font-bold">{market.apy}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center">
                  Chain
                </span>
                <span className="font-bold">{market.chain}</span>
              </div>
            </div>
            <Link href={market.detailsUrl} target="_blank" className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border-[1px] border-[#FF6E30] rounded-md text-[#FF6E30] bg-white hover:bg-white/80">
              <div className="text-center text-sm font-medium">
                Lend/Borrow
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}