import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLinkButton } from "@/components/ui/externallink"
import { TokenIcon } from "@/components/icon"

interface FarmCardProps {
  name: string
  apr: string
  description: string
  rewardTokens: string[]
  link: string
}

export function FarmCard({ name, apr, description, rewardTokens, link }: FarmCardProps) {
  return (
    <Card className="w-full rounded-2xl bg-white">
      <CardHeader className="px-3 md:px-6">
        <CardTitle className="text-base font-inter text-[#272E35] tracking-wide">{name}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 md:px-6">
        <CardDescription className="text-sm text-[#6B7280] font-inter">{description}</CardDescription>
        <div className="mt-4 flex items-center space-x-2">
          <div className="flex items-center -space-x-2 overflow-hidden">
            {rewardTokens.map((item, index) => (
              <div key={index} className="inline-block w-5 h-5">
                <TokenIcon icon={item} />
              </div>
            ))}
          </div>
          <div className="">
            <div className="text-sm font-inter text-[#272E35] font-medium">🔥 APR: {apr}%+</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-3 md:px-6">
        <ExternalLinkButton
          href={link}
          className="bg-[#191D200F] px-1 text-xs text-[#272E35] gap-1 font-medium grid-cols-1"
        >
          Detail
        </ExternalLinkButton>
      </CardFooter>
    </Card>
  )
}

