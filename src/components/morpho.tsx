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
import { formatTVL, formatPercentage } from "@/lib/utils";
import { ExternalLinkButton } from "@/components/ui/externallink";
import { ChainIcon } from "@/components/icon";
import { capitalizeFirstLetter } from "@/lib/utils";


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
                Supply APY
              </TableHead>
              <TableHead className="text-[#6B7280] text-xs font-medium">
                Borrow APY
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
                  {formatPercentage(Number(item.state.supplyApy))}
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  {formatPercentage(Number(item.state.borrowApy))}
                </TableCell>
                <TableCell>
                  <div className="flex gap-4 items-center">
                    {item.loanAsset.symbol == "WETH" && (
                      <ExternalLinkButton
                        href="https://app.morpho.org/market?id=0xdc69cf2caae7b7d1783fb5a9576dc875888afad17ab3d1a3fc102f741441c165&network=base"
                        className="bg-[#191D200F] px-2 text-sm text-[#272E35] gap-1 font-medium"
                      >
                        Lend
                      </ExternalLinkButton>
                    )}
                    {item.loanAsset.symbol == "WETH" && (
                      <ExternalLinkButton
                        href="https://app.morpho.org/market?id=0xdc69cf2caae7b7d1783fb5a9576dc875888afad17ab3d1a3fc102f741441c165&network=base"
                        className="bg-[#191D200F] px-2 text-sm text-[#272E35] gap-1 font-medium"
                      >
                        Borrow
                      </ExternalLinkButton>
                    )}
                    {item.loanAsset.symbol == "USDC" && (
                      <ExternalLinkButton
                        href="https://app.morpho.org/market?id=0xdb0bc9f10a174f29a345c5f30a719933f71ccea7a2a75a632a281929bba1b535&network=base"
                        className="bg-[#191D200F] px-2 text-sm text-[#272E35] gap-1 font-medium"
                      >
                        Lend
                      </ExternalLinkButton>
                    )}
                    {item.loanAsset.symbol == "USDC" && (
                      <ExternalLinkButton
                        href="https://app.morpho.org/market?id=0xdb0bc9f10a174f29a345c5f30a719933f71ccea7a2a75a632a281929bba1b535&network=base"
                        className="bg-[#191D200F] px-2 text-sm text-[#272E35] gap-1 font-medium"
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
      </div>
    </div>
  );
}

export default MorphoList