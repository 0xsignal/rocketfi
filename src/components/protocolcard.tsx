import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLinkButton } from "@/components/ui/externallink"

interface ProtocolCardProps {
  name: string
  description: string
  link: string
}

export function ProtocolCard({ name, description, link }: ProtocolCardProps) {
  return (
    <Card className="w-full rounded-2xl bg-white">
      <CardHeader className="px-3 md:px-6">
        <CardTitle className="text-base font-inter text-[#272E35] ">{name}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 md:px-6">
        <CardDescription className="text-xs text-[#6B7280] font-inter">{description}</CardDescription>
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

