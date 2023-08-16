"use client";
import Image from "next/image";
import React from "react";
import { Skeleton } from "./ui/skeleton";

interface PlaceholderCardProps {
  width: number;
  height: number;
  onClick?: (e: React.MouseEvent) => void;
  skeleton?: boolean;
}

export const PlaceholderCard: React.FC<PlaceholderCardProps> = ({
  width,
  height,
  onClick,
  skeleton,
}) => {
  const imageUrl =
    "https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg";

  if (skeleton) {
    return <Skeleton style={{ width, height }} />;
  }

  return (
    <Image
      src={imageUrl}
      alt="placeholder cardback"
      width={width}
      height={height}
      onClick={onClick}
    />
  );
};
