"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type Card } from "~/utils/fetchTypes";
import { CardPreview } from "./CardPreview";

interface TableProps {
  cards: Card[];
}

export const CardTable: React.FC<TableProps> = ({ cards }) => {
  return (
    <div className="container my-4 px-4">
      <div className="mx-auto w-4/5">
        <Table>
          <TableCaption>
            1 - 175 of 192 cards where the name includes “tha”
          </TableCaption>
          <TableHeader>
            <TableRow>
              {/* 	№	NAME ▼	COST	TYPE	R	LA	ARTIST	USD	EUR	TIX */}
              <TableHead className="w-[100px]">SET</TableHead>
              <TableHead className="text-left">ID</TableHead>
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-left">COST</TableHead>
              <TableHead className="text-left">TYPE</TableHead>
              <TableHead className="text-left">R</TableHead>
              <TableHead className="text-left">LA</TableHead>
              <TableHead className="text-left">ARTIST</TableHead>
              <TableHead className="text-left">USD</TableHead>
              <TableHead className="text-left">EUR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map((card) => {
              return (
                <TableRow key={card.id}>
                  <TableCell className="text-left">{card.set}</TableCell>
                  <TableCell className="text-left">
                    {card.collector_number}
                  </TableCell>
                  <TableCell className="text-left">{card.name}</TableCell>
                  <TableCell className="text-left">{card.mana_cost}</TableCell>
                  <TableCell className="text-left">
                    {card.type_line.split("—")[0]}
                  </TableCell>
                  <TableCell className="text-left">{card.rarity}</TableCell>
                  <TableCell className="text-left uppercase">
                    {card.lang}
                  </TableCell>
                  <TableCell className="text-left">{card.artist}</TableCell>
                  <TableCell className="text-right">
                    {card.prices ? `$${card.prices.usd}` : ""}
                  </TableCell>
                  <TableCell className="text-right">
                    {card.prices ? `€${card.prices.eur}` : ""}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
