"use client"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { FarmCard } from "@/components/farmcard"
import { useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"

interface OpportunityCarouselProps {
  farmData: {
    id: number;
    name: string;
    apr: string;
    description: string;
    rewardTokens: string[];
    link: string;
  }[];
}

export default function OpportunityCarousel({ farmData }: OpportunityCarouselProps) {
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
            delay: 5200,
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
                apr={farm.apr}
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
