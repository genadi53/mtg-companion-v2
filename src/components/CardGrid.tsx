"use client";
import React from "react";
import { type Card } from "~/utils/fetchTypes";
import { CardPreview } from "./CardPreview";

interface GridProps {
  cards: Card[];
}

export const CardsGrid: React.FC<GridProps> = ({ cards }) => {
  return (
    <div className="my-4 grid gap-2 px-2">
      <div className="flex flex-row flex-wrap items-center justify-between">
        {cards.map((card) => (
          <div key={card.id} className="my-2">
            <CardPreview card={card} height={200} width={200} />
          </div>
        ))}
      </div>
    </div>
  );
};
