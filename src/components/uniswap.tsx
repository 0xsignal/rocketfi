import React from "react";
import { Uniswap } from "@/lib/type";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface UniswapListProps {
  data: Uniswap[]
}


const UniswapList: React.FC<UniswapListProps> = ({ data }) => {
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
                  Chain
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  Total Value Locked USD
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  24h Volume USD
                </TableHead>
                <TableHead className="text-[#6B7280] text-xs font-medium">
                  <div className="flex items-center gap-1">
                    <div className="">
                      Fee APY
                    </div>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoCircledIcon className="ml-1 h-4 w-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="select-none rounded-xl bg-white px-2 py-1.5 text-xs text-[#272E35] leading-relaxed w-[200px]">
                        <p>
                          Estimates annual yield by multiplying the current TVL by the 24-hour Fee, then annualizing it.
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
              {data.flatMap((chainData) =>
                Object.entries(chainData.data).map(([poolKey, poolData]) => (
                  <TableRow key={`${chainData.chain}-${poolKey}`}>
                    <TableCell className="font-medium text-[#272E35] text-sm items-center">
                      {poolKey == "pool1" && "rETH/ETH"}
                      {poolKey == "pool2" && "RPL/ETH"}
                      {poolKey == "pool3" && "RPL/rETH"}
                      {poolKey == "pool4" && "wUSDM/rETH"}
                    </TableCell>
                    <TableCell className="font-medium text-[#272E35] text-sm">
                      <div className="flex gap-2 items-center">
                        <div className="w-5">
                          <ChainIcon icon={chainData.chain.toLowerCase()} />
                        </div>
                        {chainData.chain}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-[#272E35] text-sm">
                      {poolData.totalValueLockedUSD ? formatTVL(Number(poolData.totalValueLockedUSD)) : '-'}
                    </TableCell>
                    <TableCell className="font-medium text-[#272E35] text-sm">
                      {poolData.poolDayData[0]?.volumeUSD ? formatTVL(Number(poolData.poolDayData[0].volumeUSD)) : '-'}
                    </TableCell>
                    <TableCell className="font-medium text-[#272E35] text-sm">
                      {poolData.poolDayData[0]?.feesUSD && poolData.totalValueLockedUSD ? toPercentage((Number(poolData.poolDayData[0].feesUSD) * 365 / Number(poolData.totalValueLockedUSD))) : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 md:gap-4 items-center">
                        {(poolKey == "pool1" && chainData.chain == "Ethereum") && <ExternalLinkButton
                          href="https://app.uniswap.org/explore/pools/ethereum/0x553e9C493678d8606d6a5ba284643dB2110Df823"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Add Liquidity
                        </ExternalLinkButton>}
                        {(poolKey == "pool1" && chainData.chain == "Ethereum") && <ExternalLinkButton
                          href="https://app.gamma.xyz/vault/uni/ethereum/details/reth-weth-500-pegged-price"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Liquidity Management
                        </ExternalLinkButton>}
                        {(poolKey == "pool2" && chainData.chain == "Ethereum") && <ExternalLinkButton
                          href="https://app.uniswap.org/explore/pools/ethereum/0xe42318eA3b998e8355a3Da364EB9D48eC725Eb45"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Add Liquidity
                        </ExternalLinkButton>}
                        {(poolKey == "pool3" && chainData.chain == "Ethereum") && <ExternalLinkButton
                          href="https://app.uniswap.org/explore/pools/ethereum/0x3051607998fE3A690237af729CAa6c6d1D6d99B4"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Add Liquidity
                        </ExternalLinkButton>}
                        {(poolKey == "pool1" && chainData.chain == "Arbitrum") && <ExternalLinkButton
                          href="https://app.uniswap.org/explore/pools/arbitrum/0x09ba302A3f5ad2bF8853266e271b005A5b3716fe"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Add Liquidity
                        </ExternalLinkButton>}
                        {(poolKey == "pool1" && chainData.chain == "Arbitrum") && <ExternalLinkButton
                          href="https://app.gamma.xyz/vault/uni/arbitrum/details/weth-reth-500-pegged-price"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Liquidity Management
                        </ExternalLinkButton>}
                        {(poolKey == "pool2" && chainData.chain == "Arbitrum") && <ExternalLinkButton
                          href="https://app.uniswap.org/explore/pools/arbitrum/0x09ba302A3f5ad2bF8853266e271b005A5b3716fe"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Add Liquidity
                        </ExternalLinkButton>}
                        {(poolKey == "pool2" && chainData.chain == "Arbitrum") && <ExternalLinkButton
                          href="https://app.gamma.xyz/vault/uni/arbitrum/details/weth-rpl-10000-narrow"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Liquidity Management
                        </ExternalLinkButton>}
                        {(poolKey == "pool1" && chainData.chain == "Optimism") && <ExternalLinkButton
                          href="https://app.uniswap.org/explore/pools/optimism/0xAEfC1edaeDE6ADaDcdF3bB344577D45A80B19582"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Add Liquidity
                        </ExternalLinkButton>}
                        {(poolKey == "pool1" && chainData.chain == "Optimism") && <ExternalLinkButton
                          href="https://web3.okx.com/defi/detail/323184191#source=activitypage&activitySourcePage=uniswapv3"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          OP Incentive
                        </ExternalLinkButton>}
                        {(poolKey == "pool4" && chainData.chain == "Optimism") && <ExternalLinkButton
                          href="https://app.uniswap.org/explore/pools/optimism/0x966A8bcE7dc11f4Ec5a8885a7d31F0f170e3E00d"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          Add Liquidity
                        </ExternalLinkButton>}

                        {(poolKey == "pool4" && chainData.chain == "Optimism") && <ExternalLinkButton
                          href="https://web3.okx.com/defi/detail/30075#source=activitypage&activitySourcePage=uniswapv3"
                          className="bg-[#191D200F] px-1 md:px-2 text-xs md:text-sm text-[#272E35] gap-1 font-medium"
                        >
                          OP Incentive
                        </ExternalLinkButton>}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default UniswapList