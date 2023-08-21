"use client";
import React, { useState } from "react";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { useRouter } from "next/navigation";

interface TableProps {
  cards: Card[];
}

export const CardTable: React.FC<TableProps> = ({ cards }) => {
  const router = useRouter();
  return (
    <div className="container my-4 px-4">
      <div className="mx-auto w-4/5">
        <Table>
          <TableCaption>
            {/* 1 - 175 of 192 cards where the name includes “tha” */}
            {cards &&
              `Found ${cards.length} cards where the name includes \'str\'`}
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
                <HoverCard
                  key={card.id}
                  openDelay={300}
                  // closeDelay={300}
                  // open={dialogOpen}
                  // onOpenChange={setDialogOpen}
                >
                  <HoverCardTrigger asChild>
                    <TableRow
                      onClick={() => {
                        router.push(`/cards/${card.id}`);
                      }}
                    >
                      <TableCell className="text-left">{card.set}</TableCell>
                      <TableCell className="text-left">
                        {card.collector_number}
                      </TableCell>
                      <TableCell className="text-left">{card.name}</TableCell>
                      <TableCell className="text-left">
                        {card.mana_cost
                          ? card.mana_cost
                          : card.card_faces
                          ? card.card_faces[0]?.mana_cost
                          : ""}
                      </TableCell>
                      <TableCell className="text-left">
                        {card.type_line.split("—")[0]}
                      </TableCell>
                      <TableCell className="text-left">{card.rarity}</TableCell>
                      <TableCell className="text-left uppercase">
                        {card.lang}
                      </TableCell>
                      <TableCell className="text-left">{card.artist}</TableCell>
                      <TableCell className="text-right">
                        {card.prices?.usd ? `$${card.prices.usd}` : ""}
                      </TableCell>
                      <TableCell className="text-right">
                        {card.prices.eur ? `€${card.prices.eur}` : ""}
                      </TableCell>
                    </TableRow>
                  </HoverCardTrigger>

                  <HoverCardContent>
                    <CardPreview card={card} height={200} width={200} />
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
