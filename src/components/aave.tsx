import React from "react";
import fs from "fs/promises";
import path from "path";
import { Aave } from "@/lib/type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTVL } from "@/lib/utils";

async function getData() {
  const filePath = path.join(process.cwd(), "src/_data/aave.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(fileContents);
  return data as Aave[];
}

export default async function AaveList() {
  const data = await getData();
  console.log(data);
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
                Total Supply USD
              </TableHead>
              <TableHead className="text-[#6B7280] text-xs font-medium">
                Lend APR
              </TableHead>
              <TableHead className="text-[#6B7280] text-xs font-medium">
                Borrow APR
              </TableHead>
              <TableHead className="text-[#6B7280] text-xs font-medium">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  {item.pair}
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  {item.chain}
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  {formatTVL(Number(item.data.markets[0].totalValueLockedUSD))}
                </TableCell>
                <TableCell className="font-medium text-[#272E35] text-sm">
                  {Number(item.data.markets[0].rates[1].rate)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
