"use client";
import React from "react";
import { Card } from "~/components/ui/card";
import type { Card as CardType } from "~/utils/fetchTypes";
import { CardLegalFormats } from "./Legalities";
import { cn } from "~/utils/cn";

interface CardInfoProps {
  card: CardType;
}

export const CardInfo: React.FC<CardInfoProps> = ({ card }) => {
  const divStyles = "w-full border-b border-b-slate-400 p-2 text-left my-1";
  const isDoubleFaced = !!card.card_faces?.[0]?.name;

  let display: React.ReactNode | null = null;
  if (isDoubleFaced && card.card_faces) {
    display = (
      <>
        {card.card_faces.map((face) => (
          <>
            <div className={cn(divStyles, "text-base font-medium")}>
              {face.name} {face.mana_cost}
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
              <p className="mb-2">{face.oracle_text}</p>
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
        <div className={cn(divStyles, "text-base font-medium")}>
          {card.name} {card.mana_cost}
        </div>
        <div className={cn(divStyles, "text-base font-medium")}>
          {card.type_line}
        </div>
        <div
          className={cn(divStyles, "whitespace-pre-line text-base font-normal")}
        >
          <p className="mb-2">{card.oracle_text}</p>
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
      <Card className="border-2 border-y-slate-800">
        {display}
        <div className={cn(divStyles, "text-[15px]")}>
          Illustrated by {card.artist}
        </div>
        <div className={cn(divStyles, "mb-0")}>
          <CardLegalFormats legalities={card.legalities} />
        </div>
      </Card>
    </div>
  );
};
