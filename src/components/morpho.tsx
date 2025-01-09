import React from "react";
import { Morpho } from "@/lib/type";
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
import { ChainIcon, RewardsIcon } from "@/components/icon";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";


interface MorphoListProps {
  data: Morpho[];
}

const MorphoList: React.FC<MorphoListProps> = ({ data }) => {
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
                  Loan Assert
                </TableHead>
                <TableHead className="w-[100px] text-[#6B7280] text-xs font-medium">
                  Collateral Assert
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  Chain
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  Total Supply USD
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
                          The Annual Percentage Yield (APY) represents the interest rate paid for borrowing assets from the protocol, including compound interest.
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
              {data.map((item: Morpho, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-[#272E35] text-sm items-center">
                    {item.loanAsset.symbol}
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm items-center">
                    {item.collateralAsset.symbol}
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm">
                    <div className="flex gap-2 items-center">
                      <div className="w-5">
                        <ChainIcon
                          icon={item.collateralAsset.chain.network}
                        />
                      </div>
                      {capitalizeFirstLetter(item.collateralAsset.chain.network)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm">
                    {formatTVL(Number(item.state.supplyAssetsUsd))}
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm">
                    {toPercentage(Number(item.state.supplyApy))}
                  </TableCell>
                  <TableCell className="font-medium text-[#272E35] text-sm">
                    <div className="flex gap-2 place-items-center">
                      <div>
                        {toPercentage(Number(item.state.netBorrowApy))}
                      </div>
                      <div>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="h-4 w-4 cursor-pointer mt-1">
                              <RewardsIcon />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="select-none rounded-xl bg-white px-2 py-1.5 text-xs text-[#272E35] leading-relaxed w-[230px]">
                            <div className="">
                              Base APY : {toPercentage(Number(item.state.borrowApy))}
                            </div>
                            {item.state.rewards.length > 0 && (
                              <div className="mt-1">
                                MORPHO Rewards APY : - {toPercentage(Number(item.state.rewards[0].borrowApr))}
                              </div>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 md:gap-4 items-center">
                      {item.loanAsset.symbol == "WETH" && item.collateralAsset.chain.network == "base" && (
                        <ExternalLinkButton
                          href="https://app.morpho.org/market?id=0xdc69cf2caae7b7d1783fb5a9576dc875888afad17ab3d1a3fc102f741441c165&network=base"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Lend
                        </ExternalLinkButton>
                      )}
                      {item.loanAsset.symbol == "WETH" && item.collateralAsset.chain.network == "base" && (
                        <ExternalLinkButton
                          href="https://app.morpho.org/market?id=0xdc69cf2caae7b7d1783fb5a9576dc875888afad17ab3d1a3fc102f741441c165&network=base"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Borrow
                        </ExternalLinkButton>
                      )}
                      {item.loanAsset.symbol == "WETH" && item.collateralAsset.chain.network == "ethereum" && (
                        <ExternalLinkButton
                          href="https://app.morpho.org/market?id=0x3c83f77bde9541f8d3d82533b19bbc1f97eb2f1098bb991728acbfbede09cc5d&network=mainnet"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Lend
                        </ExternalLinkButton>
                      )}
                      {item.loanAsset.symbol == "WETH" && item.collateralAsset.chain.network == "ethereum" && (
                        <ExternalLinkButton
                          href="https://app.morpho.org/market?id=0x3c83f77bde9541f8d3d82533b19bbc1f97eb2f1098bb991728acbfbede09cc5d&network=mainnet"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Borrow
                        </ExternalLinkButton>
                      )}
                      {item.loanAsset.symbol == "USDC" && (
                        <ExternalLinkButton
                          href="https://app.morpho.org/market?id=0xdb0bc9f10a174f29a345c5f30a719933f71ccea7a2a75a632a281929bba1b535&network=base"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Lend
                        </ExternalLinkButton>
                      )}
                      {item.loanAsset.symbol == "EURC" && (
                        <ExternalLinkButton
                          href="https://app.morpho.org/market?id=0x0103cbcd14c690f68a91ec7c84607153311e9954c94ac6eac06c9462db3fabb6&network=base"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Lend
                        </ExternalLinkButton>
                      )}
                      {item.loanAsset.symbol == "EURC" && (
                        <ExternalLinkButton
                          href="https://app.morpho.org/market?id=0x0103cbcd14c690f68a91ec7c84607153311e9954c94ac6eac06c9462db3fabb6&network=base"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Borrow
                        </ExternalLinkButton>
                      )}
                      {item.loanAsset.symbol == "USDC" && (
                        <ExternalLinkButton
                          href="https://app.morpho.org/market?id=0xdb0bc9f10a174f29a345c5f30a719933f71ccea7a2a75a632a281929bba1b535&network=base"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Borrow
                        </ExternalLinkButton>
                      )}

                      {item.loanAsset.symbol == "WETH" && (
                        <ExternalLinkButton
                          href="https://morpho.contango.xyz/strategies/leveraged-staking/eth?selectedChains=1%2C10%2C56%2C100%2C137%2C8453%2C42161%2C43114%2C534352%2C59144"
                          className="bg-[#191D200F] px-2 text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Lervage
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
}

export default MorphoList