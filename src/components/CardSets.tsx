/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import type { Card, FetchCardsResponce, Rarity } from "~/utils/fetchTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { CONSTANTS } from "~/utils/constants";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { CardPreview } from "./CardPreview";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";

interface CardSetsProps {
  card: Card;
}

const getRarityColor = (rarity: Rarity) => {
  if (rarity === "common") return "#000000";
  if (rarity === "uncommon") return "#6C848C";
  if (rarity === "rare") return "#C19C00";
  if (rarity === "bonus") return "#F64800";
  if (rarity === "mythic") return "#F64800";
  if (rarity === "special") return "#F64800";
};

export default async function CardSets({ card }: CardSetsProps) {
  const defaultSetUrl =
    "https://c2.scryfall.com/file/scryfall-symbols/sets/default.svg?1655697600";

  const fetchAllPrints = async () => {
    try {
      if (!card.prints_search_uri) return [];
      const fetch_url = card.prints_search_uri;
      const allPrints: Card[] = [];
      let isFinished = false;
      let res = await fetch(fetch_url);

      do {
        if (res.status !== 200)
          throw new Error("Something went wrong with fetch.");

        const { data, has_more, next_page } =
          (await res.json()) as FetchCardsResponce;
        allPrints.push(...data);

        if (has_more && next_page) {
          res = await fetch(next_page);
        } else {
          isFinished = true;
        }
      } while (!isFinished);

      return allPrints.slice(0, CONSTANTS.MAX_PRINTS_SHOWED);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const prints = await fetchAllPrints();
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
            src={defaultSetUrl}
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
        <Separator className="my-4 h-[2px]" orientation="horizontal" />
      </div>
      <div>
        <Table className="border-x-2 ">
          <TableHeader className="bg-[#343242] font-medium">
            <TableRow className="text-center">
              <TableHead className="w-[75%] text-white">Prints</TableHead>
              <TableHead className="text-white">USD</TableHead>
              <TableHead className="text-white">EUR</TableHead>
              <TableHead className="text-white">TIX</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prints?.map((card, idx) => {
              return (
                <HoverCard key={card.id} openDelay={300}>
                  <HoverCardTrigger asChild>
                    <TableRow
                      className="align-middle"
                      key={`${card.set_name}${idx}`}
                    >
                      <TableCell className="relative flex items-center pl-0 font-medium">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 12 12"
                          aria-hidden="true"
                          focusable="false"
                          xmlns="http://www.w3.org/2000/svg"
                          className="min-h-5 min-w-5 absolute -left-[0.65rem] h-5 w-5 rounded-full border border-slate-800 p-1"
                        >
                          <path
                            d="M12 4.435c0 .106-.063.221-.188.346l-2.618 2.553.62 3.606.007.144c0 .101-.025.186-.076.256-.05.07-.124.105-.22.105-.091 0-.188-.029-.288-.087l-3.238-1.702-3.238 1.702c-.106.058-.202.087-.288.087-.101 0-.177-.035-.227-.105-.05-.07-.076-.155-.076-.256l.014-.144.62-3.606-2.625-2.553c-.12-.13-.18-.245-.18-.346 0-.178.135-.288.404-.332l3.62-.526 1.623-3.281c.091-.197.209-.296.353-.296s.262.099.353.296l1.623 3.281 3.62.526c.269.043.404.154.404.332z"
                            fill={getRarityColor(card.rarity)}
                          ></path>
                        </svg>
                        <div className="ml-3.5">
                          {card.set_name} #{card.collector_number}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {card.prices.usd ? `$${card.prices.usd}` : ""}
                      </TableCell>
                      <TableCell className="text-center">
                        {card.prices.eur ? `€${card.prices.eur}` : ""}
                      </TableCell>
                      <TableCell className="text-center">
                        {card.prices.tix ? card.prices.tix : ""}
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
    </>
  );
}
