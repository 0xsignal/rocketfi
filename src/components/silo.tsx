import React from "react";
import fs from "fs/promises";
import path from "path";
import { Silo } from "@/lib/type";
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
import { ChainIcon } from "@/components//icon";

async function getData() {
  const filePath = path.join(process.cwd(), "src/_data/silo.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(fileContents);
  return data as Silo[];
}

export default async function SiloList() {
  const data = await getData();
  return (
    <div className="">
      <div>
        <Table className="bg-white rounded-2xl">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-[#6B7280] text-xs font-medium">
                Pair
              </TableHead>
              <TableHead className="text-[#6B7280] text-xs font-medium">
                Chain
              </TableHead>
              <TableHead className="text-[#6B7280] text-xs font-medium">
                Total Value Locked USD
              </TableHead>
              <TableHead className="text-[#6B7280] text-xs font-medium">
                Supply APR
              </TableHead>
              <TableHead className="text-[#6B7280] text-xs font-medium">
                Borrow APR
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
                  {item.pair}
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm ">
                  <div className="flex gap-2 items-center">
                    <div className="w-5">
                      <ChainIcon icon={item.chain} />
                    </div>
                    {item.chain}
                  </div>
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  {formatTVL(Number(item.data.markets[0].totalValueLockedUSD))}
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  {formatPercentage(Number(item.data.markets[0].rates[1].rate))}
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  {formatPercentage(Number(item.data.markets[0].rates[0].rate))}
                </TableCell>
                <TableCell>
                  <div className="flex gap-4 items-center">
                    <ExternalLinkButton
                      href={item.link}
                      className="bg-[#191D200F] px-2 text-sm text-[#272E35] gap-1 font-medium"
                    >
                      Lend
                    </ExternalLinkButton>
                    <ExternalLinkButton
                      href={item.link}
                      className="bg-[#191D200F] px-2 text-sm text-[#272E35] gap-1 font-medium"
                    >
                      Borrow
                    </ExternalLinkButton>
                    {item.pair == "rETH/ETH" && (
                      <ExternalLinkButton
                        href="https://silo.contango.xyz/strategies/leveraged-staking/eth?selectedChains=1%2C10%2C56%2C100%2C137%2C8453%2C42161%2C43114%2C534352%2C59144"
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
