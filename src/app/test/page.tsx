"use client";
import Image from "next/image";
import React, { useState } from "react";
import SwitchButton from "~/components/SwitchButton";
import { api } from "~/utils/api";
import { type Card } from "~/utils/fetchTypes";
import { CardPreview as Cp } from "~/components/CardPreview";

export default function CardInfoPage() {
  const a = api.card.searchCard.useQuery({ text: "fable of the mirror" });

  console.log(a.data);

  if (a.data) {
    return (
      <div>
        <CardPreview card={a.data} height={200} width={200} />
      </div>
    );
  } else {
    return <div>No res</div>;
  }
}

interface CardPreviewProps {
  card: Card;
  width: number;
  height: number;
}

const CardPreview: React.FC<CardPreviewProps> = ({ card, width, height }) => {
  let display = null;
  const isDoubleFaced = card.card_faces?.[0]?.image_uris ? true : false;
  const imageUrl = card.image_uris
    ? card.image_uris.normal
    : "https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg";
  const imageUrls =
    card.card_faces && card.card_faces.length > 0
      ? [
          card.card_faces[0]?.image_uris
            ? card.card_faces[0].image_uris.normal
            : "https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg",
          card.card_faces[1]?.image_uris
            ? card.card_faces[1].image_uris.normal
            : "https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg",
        ]
      : "https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg";
  const [activeIdx, setActive] = useState<number>(0);
  if (isDoubleFaced) {
    display = (
      <div className="flex">
        <SwitchButton
          size={35}
          onClick={() => {
            setActive(activeIdx === 0 ? 1 : 0);
          }}
        />

        <Image
          src={imageUrls[activeIdx]!}
          alt="card face"
          width={width}
          height={height}
        />
        {/* <Image
          src={imageUrls[0] as string}
          alt="card face"
          width={width}
          height={height}
        /> */}
      </div>
    );
  } else {
    display = imageUrl ? (
      <Image src={imageUrl} alt="card face" width={width} height={height} />
    ) : (
      <p>{card.name}</p>
    );
  }

  return (
    <>
      <div className="flex">
        {display}
        {display}
      </div>
      {Object.entries(card).map(([key, val]) => (
        <div key={key}>
          {key} - {JSON.stringify(val)}
        </div>
      ))}
    </>
  );
};
