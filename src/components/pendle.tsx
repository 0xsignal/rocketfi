import React from "react";
import { PendleMarket } from "@/lib/type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTVL, toPercentage } from "@/lib/utils";
import { ExternalLinkButton } from "@/components/ui/externallink";
import { ChainIcon } from "@/components/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface PendleMarketListProps {
  data: PendleMarket[];
}

const PendleMarketList: React.FC<PendleMarketListProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }
  return (
    <div className="">
      <div>
        <TooltipProvider>
          <Table className="bg-white rounded-2xl">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-[#6B7280] text-xs font-medium">
                  Pool
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  Total Liquidity USD
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  Expire Date
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  <div className="flex items-center gap-1">
                    <div className="">LP APY</div>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoCircledIcon className="ml-1 h-4 w-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="select-none rounded-xl bg-white px-2 py-1.5 text-xs text-[#272E35] leading-relaxed w-[200px]">
                        <p>
                          Estimates annual yield by multiplying the current TVL
                          by the 24-hour Fee, then annualizing it.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="items-center">
              {data.map((item: PendleMarket, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-[#272E35] text-sm items-center">
                    {item.name}
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm">
                    {formatTVL(Number(item.details.liquidity))}
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm">
                    {item.expiry}
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm">
                    {toPercentage(Number(item.details.aggregatedApy))} ~{" "}
                    {toPercentage(Number(item.details.maxBoostedApy))}
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2 md:gap-4 items-center">
                      <ExternalLinkButton
                        href={`https://app.pendle.finance/trade/pools/${item.address}`}
                        className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                      >
                        Add Liquidity
                      </ExternalLinkButton>
                      <ExternalLinkButton
                        href="https://www.pendle.magpiexyz.io/stake"
                        className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                      >
                        LP APR Boost
                      </ExternalLinkButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PendleMarketList;
