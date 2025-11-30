import React from "react";
import { Balancer } from "@/lib/type";
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
import { RewardsIcon } from "@/components/icon";

interface BalancerListProps {
  data: Balancer[];
}
interface AprItem {
  type: string;
  apr: number;
}
function calculateTotalApr(items: AprItem[]): number {
  const typesToSum = [
    "VEBAL_EMISSIONS",
    "STAKING",
    "STAKING_BOOST",
    "IB_YIELD",
    "SWAP_FEE_24H",
  ];

  const sum = items
    .filter((item) => typesToSum.includes(item.type))
    .reduce((total, item) => total + item.apr, 0);

  return sum;
}

function getSwapFeeValue(items: AprItem[]): number | undefined {
  const swapFeeItem = items.find((item) => item.type === "SWAP_FEE_24H");
  return swapFeeItem ? swapFeeItem.apr : undefined;
}

const BalancerList: React.FC<BalancerListProps> = ({ data }) => {
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
                <TableHead className="w-[160px] text-[#6B7280] text-xs font-medium">
                  Pool
                </TableHead>
                <TableHead className=" text-[#6B7280] text-xs font-medium">
                  Chain
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  Total Value Locked USD
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  <div className="flex items-center gap-1">
                    <div className="">Fee APR</div>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoCircledIcon className="ml-1 h-4 w-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="select-none rounded-xl bg-white px-2 py-1.5 text-xs text-[#272E35] leading-relaxed w-[200px]">
                        <p>
                          The Fee APR represents the annualized return based on
                          trading fees earned by the liquidity pool over the
                          past 24 hours.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  <div className="flex items-center gap-1">
                    <div className="">Total Max APR</div>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoCircledIcon className="ml-1 h-4 w-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="select-none rounded-xl bg-white px-2 py-1.5 text-xs text-[#272E35] leading-relaxed w-[200px]">
                        <p>
                          The Total APR reflects the maximum potential return,
                          including fees, veBAL incentives, BAL rewards, and
                          additional rewards. Click "Add Liquidity" for a
                          detailed breakdown.
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
              {data.map((item: Balancer, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-[#272E35] text-sm items-center">
                    {item.name}
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm">
                    <div className="flex gap-2 items-center">
                      <div className="w-5">
                        <ChainIcon icon={item.chain.toLowerCase()} />
                      </div>
                      {item.chain}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm">
                    {formatTVL(Number(item.dynamicData.totalLiquidity))}
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm">
                    {toPercentage(
                      Number(getSwapFeeValue(item.dynamicData.aprItems)),
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm">
                    <div className="flex items-center gap-2">
                      <div className="">
                        {toPercentage(
                          Number(calculateTotalApr(item.dynamicData.aprItems)),
                        )}
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
                              Fee APR :{" "}
                              {toPercentage(
                                Number(
                                  getSwapFeeValue(item.dynamicData.aprItems),
                                ),
                              )}
                            </div>
                            {item.dynamicData.aprItems
                              .filter(
                                (items: AprItem) =>
                                  !items.type.includes("SWAP_FEE_24H"),
                              )
                              .map((items: AprItem, j: number) => {
                                const rewardToken =
                                  items.type === "STAKING"
                                    ? "Incentive"
                                    : items.type === "VEBAL_EMISSIONS"
                                      ? "BAL"
                                      : items.type === "STAKING_BOOST"
                                        ? "VeBAL Boost"
                                        : items.type === "IB_YIELD"
                                          ? "LST Yield"
                                          : "Unknown";

                                return (
                                  <div className="mt-1" key={j}>
                                    {rewardToken} :{" "}
                                    {toPercentage(Number(items.apr))}
                                  </div>
                                );
                              })}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 md:gap-4 items-center">
                      {item.id ==
                        "0x1ea5870f7c037930ce1d5d8d9317c670e89e13e3" && (
                        <ExternalLinkButton
                          href="https://balancer.fi/pools/ethereum/v3/0x1ea5870f7c037930ce1d5d8d9317c670e89e13e3"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Add Liquidity
                        </ExternalLinkButton>
                      )}
                      {item.id ==
                        "0x1ea5870f7c037930ce1d5d8d9317c670e89e13e3" && (
                        <ExternalLinkButton
                          href="https://app.aura.finance/#/1/pool/271"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          LP APR Boost
                        </ExternalLinkButton>
                      )}
                      {item.id ==
                        "0x5418a64e0cdb20548acb394f5d00a089baf02161" && (
                        <ExternalLinkButton
                          href="https://balancer.fi/pools/arbitrum/v3/0x5418a64e0cdb20548acb394f5d00a089baf02161"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Add Liquidity
                        </ExternalLinkButton>
                      )}
                      {item.id ==
                        "0x5418a64e0cdb20548acb394f5d00a089baf02161" && (
                        <ExternalLinkButton
                          href="https://app.aura.finance/#/42161/pool/104"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          LP APR Boost
                        </ExternalLinkButton>
                      )}
                      {item.id ==
                        "0xb7b8b3afc010169779c5c2385ec0eb0477fe3347" && (
                        <ExternalLinkButton
                          href="https://balancer.fi/pools/base/v3/0xb7b8b3afc010169779c5c2385ec0eb0477fe3347"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Add Liquidity
                        </ExternalLinkButton>
                      )}
                      {item.id ==
                        "0xb7b8b3afc010169779c5c2385ec0eb0477fe3347" && (
                        <ExternalLinkButton
                          href="https://app.aura.finance/#/8453/pool/24"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          LP APR Boost
                        </ExternalLinkButton>
                      )}
                      {item.id ==
                        "0x870c0af8a1af0b58b4b0bd31ce4fe72864ae45be" && (
                        <ExternalLinkButton
                          href="https://balancer.fi/pools/optimism/v3/0x870c0af8a1af0b58b4b0bd31ce4fe72864ae45be"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Add Liquidity
                        </ExternalLinkButton>
                      )}
                      {item.id ==
                        "0x870c0af8a1af0b58b4b0bd31ce4fe72864ae45be" && (
                        <ExternalLinkButton
                          href="https://app.aura.finance/#/10/pool/29"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          LP APR Boost
                        </ExternalLinkButton>
                      )}
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

export default BalancerList;
