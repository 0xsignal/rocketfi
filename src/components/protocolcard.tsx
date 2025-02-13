import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLinkButton } from "@/components/ui/externallink"
import { Badge } from "@/components/ui/badge"

interface ProtocolCardProps {
  name: string
  tags: string
  description: string
  link: string
}

export function ProtocolCard({ name, tags, description, link }: ProtocolCardProps) {
  return (
    <Card className="w-full rounded-2xl bg-white">
      <CardHeader className="flex flex-row items-center px-3 md:px-6">
        <CardTitle className="text-base font-sans text-[#272E35] tracking-wide">{name}</CardTitle>
        <div className="grow"></div>
        <Badge variant="secondary" className="ml-2 tracking-wide">
          {tags}
        </Badge>
      </CardHeader>
      <CardContent className="px-3 md:px-6">
        <CardDescription className="text-sm text-[#6B7280] font-sans">{description}</CardDescription>
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

