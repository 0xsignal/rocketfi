"use client"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { FarmCard } from "@/components/farmcard"
import { useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"

const farmData = [
  { id: 1, name: "Contango OP Incentive", description: "Open an rETH/ETH long position of Compound to maximize incentives.", rewardTokens: ["OP", "RPL", "COMP"], link: "https://app.contango.xyz/strategies/leveraged-staking/eth?selectedChains=1%2C10%2C56%2C100%2C137%2C8453%2C42161%2C43114%2C534352%2C59144" },
  { id: 2, name: "Euler Incentive", description: "Choose an rETH-based strategy to maximize yields on Euler.", rewardTokens: ["EUL"], link: "https://app.euler.finance/strategies?collateralAsset=RETH&network=ethereum" },
  { id: 3, name: "Pancake & Cakepie Liquidity Farming", description: "Add rETH/ETH liquidity on PancakeSwap and stake the LP tokens in CakePie to boost yields.", rewardTokens: ["CAKE"], link: "https://www.pancake.magpiexyz.io/stake/0x2201d2400d30BFD8172104B4ad046d019CA4E7bd" },
  { id: 4, name: "Maia Liquidity Farming", description: "Provide liquidity for rETH (Ethereum) / rETH (Arbitrum) to earn rewards.", rewardTokens: ["MAIA"], link: "http://app.maiadao.io/earn/0x77658ecceeeb02574649055e4eda353139fbacbf" }
]

export default function OppotunityCarousel() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index)
    }
  }

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 8000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {farmData.map((farm) => (
            <CarouselItem key={farm.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <FarmCard
                name={farm.name}
                description={farm.description}
                rewardTokens={farm.rewardTokens}
                link={farm.link}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center mt-4 space-x-2 flex-wrap">
          {farmData.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-colors duration-200 m-1",
                current === index ? "bg-primary" : "bg-gray-300 hover:bg-gray-400",
              )}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}

