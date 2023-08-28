"use client";
import React from "react";
import { Card } from "~/components/ui/card";
import type { Card as CardType } from "~/utils/fetchTypes";
import { CardLegalFormats } from "./Legalities";
import { cn } from "~/utils/cn";
import { ManaSymbol } from "./ManaSymbol";
import Image from "next/image";

interface CardInfoProps {
  card: CardType;
}

export const CardInfo: React.FC<CardInfoProps> = ({ card }) => {
  const checkTextForSymbols = (text: string) => {
    // const symbolRegex = /{\w+}/g;
    // const symbolsArray = text.match(symbolRegex) ?? [];

    const symbolRegex = /(\{[^\}]+\})/g;
    const parts = text.split(symbolRegex);
    console.log(parts);
    const replacedParts = parts.map((part: string, idx) => {
      console.log("part " + part);
      if (part.includes("}")) {
        console.log("part2 " + part);
        // const url = cardSymbols.find((val) => {
        //   console.log("val " + val);
        //   console.log(cardSymbols);
        //   return val.includes(part);
        // });
        return (
          <Image
            key={`${part}${idx}`}
            src={""}
            alt="mana symbol"
            height={16}
            width={16}
            className="inline-block"
          />
        );
      } else {
        return part;
      }
    });
    return <span>{replacedParts}</span>;
  };

  const divStyles = "w-full border-b border-b-slate-400 p-2 text-left my-1";
  const isDoubleFaced = !!card.card_faces?.[0]?.name;

  let display: React.ReactNode | null = null;
  if (isDoubleFaced && card.card_faces) {
    display = (
      <>
        {card.card_faces.map((face) => (
          <>
            <div
              className={cn(
                divStyles,
                "flex flex-row items-center text-base font-medium"
              )}
            >
              <div className="mr-2">{face.name}</div>
              <div>
                <ManaSymbol manaStr={face.mana_cost} size={18} />
              </div>
            </div>
            <div className={cn(divStyles, "text-base font-medium")}>
              {face.type_line}
            </div>
            <div
              className={cn(
                divStyles,
                "whitespace-pre-line text-base font-normal"
              )}
            >
              <p className="mb-2">
                {face.oracle_text}
                {checkTextForSymbols(face.oracle_text ? face.oracle_text : "")}
              </p>
              <p className="text-[15px] italic">
                {face.flavor_text ? face.flavor_text : ""}
              </p>
            </div>
            {face.power ?? face.toughness ? (
              <div className={cn(divStyles, "text-lg font-medium")}>
                {face.power}/{face.toughness}
              </div>
            ) : null}
          </>
        ))}
      </>
    );
  } else {
    display = (
      <>
        <div
          className={cn(
            divStyles,
            "flex flex-row items-center text-base font-medium"
          )}
        >
          <div className="mr-2">{card.name}</div>
          <div>
            <ManaSymbol
              manaStr={card.mana_cost ? card.mana_cost : ""}
              size={18}
            />
          </div>
        </div>
        <div className={cn(divStyles, "text-base font-medium")}>
          {card.type_line}
        </div>
        <div
          className={cn(divStyles, "whitespace-pre-line text-base font-normal")}
        >
          <p className="mb-2">
            {card.oracle_text}
            {/* {checkTextForSymbols(card.oracle_text ? card.oracle_text : "")} */}
          </p>
          <p className="text-[15px] italic">{card.flavor_text}</p>
        </div>
        <div className={cn(divStyles, "text-lg font-medium")}>
          {card.power}/{card.toughness}
        </div>
      </>
    );
  }

  return (
    <div className="grid">
      {card && (
        <Card className="border-2 border-y-slate-800">
          {display}
          <div className={cn(divStyles, "text-[15px]")}>
            Illustrated by {card.artist}
          </div>
          <div className={cn(divStyles, "mb-0")}>
            <CardLegalFormats legalities={card.legalities} />
          </div>
        </Card>
      )}
    </div>
  );
};
