"use client";
import React from "react";
import { type Card } from "~/utils/fetchTypes";
import { CardPreview } from "./CardPreview";

interface GridProps {
  cards: Card[];
}

export const CardsGrid: React.FC<GridProps> = ({ cards }) => {
  return (
    <div className="container my-4 px-4">
      <div className="mx-auto w-4/5">
        <div className="grid grid-cols-2 justify-items-center gap-2 sm:grid-cols-3 xl:grid-cols-4">
          {cards.map((card) => (
            <div key={card.id} className="my-2">
              <CardPreview card={card} height={200} width={200} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
