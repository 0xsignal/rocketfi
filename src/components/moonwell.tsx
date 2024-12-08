import React from "react";
import fs from "fs/promises";
import path from "path";
import { Moonwell } from "@/lib/type";
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
async function getData() {
  const filePath = path.join(process.cwd(), "/tmp/moonwell.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(fileContents);
  return data as Moonwell[];
}

export default async function MoonwellList() {
  const data = await getData();
  return (
    <div className="">
      <div>
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
                Base Supply APY
              </TableHead>
              <TableHead className="text-[#6B7280] text-xs font-medium">
                Total Supply APY
              </TableHead>
              <TableHead className="text-[#6B7280] text-xs font-medium">
                Base Borrow APY
              </TableHead>
              <TableHead className="text-[#6B7280] text-xs font-medium">
                Total Borrow APY
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
                  rETH
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm ">
                  <div className="flex gap-2 items-center">
                    <div className="w-5">
                      <ChainIcon icon={getChainName(item.chain)} />
                    </div>
                    {getChainName(item.chain)}
                  </div>
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  {formatTVL(Number(item.totalSupplyUSD))}
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  {formatPercentage(Number(item.baseSupplyAPR))}
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  {formatPercentage(Number(item.supplyAPR))}
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  {formatPercentage(Number(item.baseBorrowAPR))}
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  {formatPercentage(Number(item.borrowAPR))}
                </TableCell>
                <TableCell>
                  <div className="flex gap-4 items-center">
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
                        className="bg-[#191D200F] px-2 text-sm text-[#272E35] gap-1 font-medium"
                      >
                        Borrow
                      </ExternalLinkButton>
                    )}

                    {item.chain == 8453 && (
                      <ExternalLinkButton
                        href="https://moonwell.fi/markets/supply/base/reth"
                        className="bg-[#191D200F] px-2 text-sm text-[#272E35] gap-1 font-medium"
                      >
                        Lend
                      </ExternalLinkButton>
                    )}
                    {item.chain == 8453 && (
                      <ExternalLinkButton
                        href="https://moonwell.fi/markets/borrow/base/reth"
                        className="bg-[#191D200F] px-2 text-sm text-[#272E35] gap-1 font-medium"
                      >
                        Borrow
                      </ExternalLinkButton>
                    )}
                    <ExternalLinkButton
                      href="https://moonwell.contango.xyz/strategies/leveraged-staking/eth?selectedChains=1%2C10%2C56%2C100%2C137%2C8453%2C42161%2C43114%2C534352%2C59144"
                      className="bg-[#191D200F] px-2 text-sm text-[#272E35] gap-1 font-medium"
                    >
                      Lervage
                    </ExternalLinkButton>
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
