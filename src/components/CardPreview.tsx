"use client";
import Image from "next/image";
import React, { useState } from "react";
import SwitchButton from "~/components/SwitchButton";
import { type Card } from "~/utils/fetchTypes";
import { PlaceholderCard } from "./PlaceholderCard";

// type CardSize = {}

interface CardPreviewProps {
  card: Card;
  width: number;
  height: number;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  card,
  width,
  height,
}) => {
  let display = null;
  const isDoubleFaced = card.card_faces?.[0]?.image_uris ? true : false;
  const imageUrl: string | null = card.image_uris
    ? card.image_uris.normal
    : null;
  const imageUrls: (string | null)[] =
    card.card_faces && card.card_faces.length > 0
      ? [
          card.card_faces[0]?.image_uris
            ? card.card_faces[0].image_uris.normal
            : null,
          card.card_faces[1]?.image_uris
            ? card.card_faces[1].image_uris.normal
            : null,
        ]
      : [];
  const [activeIdx, setActive] = useState<number>(0);

  if (isDoubleFaced) {
    display = (
      <div className="relative inline-block">
        <Image
          src={imageUrls[activeIdx]!}
          alt="card face"
          width={width}
          height={height}
        />
        <SwitchButton
          size={35}
          onClick={() => {
            setActive(activeIdx === 0 ? 1 : 0);
          }}
        />
      </div>
    );
  } else {
    display = imageUrl ? (
      <Image src={imageUrl} alt="card face" width={width} height={height} />
    ) : (
      <PlaceholderCard width={width} height={height} />
    );
  }

  return <div className="flex">{display}</div>;
};
