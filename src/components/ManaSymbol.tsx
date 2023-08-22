import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";

interface ManaSymbolPops {
  manaStr: string;
  size?: number;
  cmc?: number;
}

export const ManaSymbol: React.FC<ManaSymbolPops> = ({ manaStr, size }) => {
  const symbolsArray = manaStr.match(/{\w+}/g) ?? [];
  const { data: symbols } = api.card.fetchAllSymbols.useQuery();

  const findSymbolImgUri = (symbolStr: string) => {
    let result =
      "https://c2.scryfall.com/file/scryfall-symbols/card-symbols/PW.svg";
    if (symbols) {
      symbols.forEach((symbol) => {
        if (symbol.symbol === symbolStr) {
          result = symbol.svg_uri;
        }
      });
    }
    return result;
  };

  return (
    <div className="flex">
      {symbolsArray.map((symbol, idx) => {
        return (
          <Image
            key={`${symbol}${idx}`}
            src={{
              src: findSymbolImgUri(symbol),
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
