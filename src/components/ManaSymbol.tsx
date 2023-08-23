import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";

interface ManaSymbolPops {
  manaStr: string;
  size?: number;
  cmc?: number;
}

export const ManaSymbol: React.FC<ManaSymbolPops> = ({ manaStr, size }) => {
  const { data: symbolsUrls } = api.card.getCardSymbols.useQuery({
    text: manaStr,
  });
  return (
    <div className="flex">
      {symbolsUrls?.map((url, idx) => {
        return (
          <Image
            key={`${idx}`}
            src={{
              src: url,
              width: size ? size : 25,
              height: size ? size : 25,
            }}
            alt="mtg symbol"
          />
        );
      })}
    </div>
  );
};
