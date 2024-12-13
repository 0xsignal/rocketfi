import React from "react";
import { Moonwell, MoonwellIncentive } from "@/lib/type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTVL, formatPercentage, getChainName } from "@/lib/utils";
import { ExternalLinkButton } from "@/components/ui/externallink";
import { ChainIcon } from "@/components/icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { RewardsIcon } from "@/components/icon";

interface MoonwellListProps {
  data: Moonwell[];
}

const MoonwellList: React.FC<MoonwellListProps> = ({ data }) => {
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
                  Assert
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  Chain
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  Total Suppy USD
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  <div className="flex items-center gap-1">
                    <div className="">
                      Supply APY
                    </div>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoCircledIcon className="ml-1 h-4 w-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="select-none rounded-xl bg-white px-2 py-1.5 text-xs text-[#272E35] leading-relaxed w-[200px]">
                        <p>
                          The Annual Percentage Yield (APY) represents the interest earned for supplying assets to the protocol, including compound interest.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  <div className="flex items-center gap-1">
                    <div className="">
                      Borrow APY
                    </div>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoCircledIcon className="ml-1 h-4 w-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="select-none rounded-xl bg-white px-2 py-1.5 text-xs text-[#272E35] leading-relaxed w-[200px]">
                        <p>
                          The Annual Percentage Yield (APY) represents the interest paid for supplying assets to the protocol, including compound interest.
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
              {data.map((item: Moonwell, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-[#272E35] text-sm items-center">
                    rETH
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm ">
                    <div className="flex gap-2 items-center">
                      <div className="w-5">
                        <ChainIcon icon={getChainName(item.chain).toLowerCase()} />
                      </div>
                      {getChainName(item.chain)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm">
                    {formatTVL(Number(item.totalSupplyUSD))}
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm">
                    <div className="flex gap-2 place-items-center">
                      <div>
                        {formatPercentage(Number(item.supplyAPR))}
                      </div>
                      <div>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="h-4 w-4 cursor-pointer mt-1">
                              <RewardsIcon />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="select-none rounded-xl bg-white px-2 py-1.5 text-xs text-[#272E35] leading-relaxed w-[200px]">
                            <div className="">
                              Base APY : {formatPercentage(Number(item.baseSupplyAPR))}
                            </div>
                            {item.incentive.map((items: MoonwellIncentive, j: number) => (
                              <div className="mt-1" key={j}>
                                {items.token.symbol} Rewards APY : {formatPercentage(Number(items.supplyApr))}
                              </div>
                            ))}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm">
                    <div className="flex gap-2 place-items-center">
                      <div>
                        {formatPercentage(Number(item.borrowAPR))}
                      </div>
                      <div>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="h-4 w-4 cursor-pointer mt-1">
                              <RewardsIcon />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="select-none rounded-xl bg-white px-2 py-1.5 text-xs text-[#272E35] leading-relaxed w-[200px]">
                            <div className="">
                              Base APY : {formatPercentage(Number(item.baseBorrowAPR))}
                            </div>
                            {item.incentive.map((items: MoonwellIncentive, j: number) => (
                              <div className="mt-1" key={j}>
                                {items.token.symbol} Rewards APY : {formatPercentage(Number(items.borrowApr))}
                              </div>
                            ))}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 md:gap-4 items-center">
                      {item.chain == 10 && (
                        <ExternalLinkButton
                          href="https://moonwell.fi/markets/supply/optimism/reth"
                          className="bg-[#191D200F] px-2 text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Lend
                        </ExternalLinkButton>
                      )}
                      {item.chain == 10 && (
                        <ExternalLinkButton
                          href="https://moonwell.fi/markets/borrow/optimism/reth"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Borrow
                        </ExternalLinkButton>
                      )}

                      {item.chain == 8453 && (
                        <ExternalLinkButton
                          href="https://moonwell.fi/markets/supply/base/reth"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Lend
                        </ExternalLinkButton>
                      )}
                      {item.chain == 8453 && (
                        <ExternalLinkButton
                          href="https://moonwell.fi/markets/borrow/base/reth"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Borrow
                        </ExternalLinkButton>
                      )}
                      <ExternalLinkButton
                        href="https://moonwell.contango.xyz/strategies/leveraged-staking/eth?selectedChains=1%2C10%2C56%2C100%2C137%2C8453%2C42161%2C43114%2C534352%2C59144"
                        className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                      >
                        Lervage
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
}

export default MoonwellList