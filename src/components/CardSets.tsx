"use client";
import Image from "next/image";
import React from "react";
import type { Card } from "~/utils/fetchTypes";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface CardSetsProps {
  card: Card;
}

export default function CardSets({ card }: CardSetsProps) {
  const defaultSetUrl =
    "https://c2.scryfall.com/file/scryfall-symbols/sets/default.svg?1655697600";

  return (
    <>
      <div className="mb-2 mt-4 w-full bg-[#343242]">
        <div className="flex items-center p-2">
          <img
            //   source={{
            //     uri: setUri
            //       ? setUri
            //       : "",
            //   }}
            alt="card-set"
            className="ml-2 h-8 w-8 rounded-2xl bg-[#FDFDFD]"
            src={"https://svgs.scryfall.io/sets/mh2.svg?1692590400"}
            style={{ objectFit: "fill" }}
            //   width={16}
            //   height={16}
            //   style={[styles.icon, { resizeMode: "stretch" }]}
          />

          <div className="ml-4">
            <p className="text-base text-[#FDFDFD]">
              {/* {card.set_name} ({card.set.toUpperCase()}) */}
            </p>
            <div className="items-center justify-center">
              <p className="text-base capitalize text-[#FDFDFD]">
                #{card.collector_number} · {card.rarity} ·{" "}
                {card.finishes.map((variant, idx) => {
                  return idx + 1 === card.finishes.length
                    ? `${variant}`
                    : `${variant}/`;
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead>Prints</TableHead>
              <TableHead>USD</TableHead>
              <TableHead>EUR</TableHead>
              <TableHead>TIX</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{}</TableBody>
        </Table>
      </div>
    </>
  );
}
