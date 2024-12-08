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
import { formatTVL, formatPercentage } from "@/lib/utils";
import { ExternalLinkButton } from "@/components/ui/externallink";
import { ChainIcon } from "@/components/icon";


interface BalancerListProps {
  data: Balancer[]; 
}

const BalancerList: React.FC<BalancerListProps>  = ({ data }) => {
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
                Pool
              </TableHead>
              <TableHead className="w-[100px] text-[#6B7280] text-xs font-medium">
                Chain
              </TableHead>
              <TableHead className="text-[#6B7280] text-xs font-medium">
                Total Liquidity USD
              </TableHead>
              <TableHead className="text-[#6B7280] text-xs font-medium">
                Fee APR
              </TableHead>
              <TableHead className="text-[#6B7280] text-xs font-medium">
                Total APR
              </TableHead>
              <TableHead className="text-[#6B7280] text-xs font-medium">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="items-center">
            {data.map((item, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium text-[#272E35] text-sm items-center">
                  {item.name}
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm items-center">
                  {item.chain}
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  <div className="flex gap-2 items-center">
                    <div className="w-5">
                      <ChainIcon icon={item.chain} />
                    </div>
                    {item.chain}
                  </div>
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  {formatTVL(Number(item.dynamicData.totalLiquidity))}
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  {formatPercentage(Number(item.dynamicData.aprItems))}
                </TableCell>
                <TableCell>
                  <ExternalLinkButton
                    href="https://morpho.contango.xyz/strategies/leveraged-staking/eth?selectedChains=1%2C10%2C56%2C100%2C137%2C8453%2C42161%2C43114%2C534352%2C59144"
                    className="bg-[#191D200F] px-2 text-sm text-[#272E35] gap-1 font-medium"
                  >
                    Boost APR
                  </ExternalLinkButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
