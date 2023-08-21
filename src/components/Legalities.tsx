"use client";
import React from "react";
import type { Legalities } from "~/utils/fetchTypes";

interface LegalFormatsProps {
  legalities: Record<string, Legalities>;
}

const importantFormats = [
  "standard",
  "alchemy",
  "pioneer",
  "explorer",
  "modern",
  "brawl",
  "legacy",
  "historic",
  "vintage",
  "pauper",
  "commander",
  "penny",
  "oathbreaker",
];

const matchColor = (legality: string) => {
  const colors = {
    notLegal: "#AEAEAE",
    banned: "rgba(167,31,42,0.58)",
    legal: "#75986E",
    restricted: "rgba(36,103,130,0.58)",
  };

  if (legality === "not_legal") return colors.notLegal;
  else if (legality === "legal") return colors.legal;
  else if (legality === "banned") return colors.banned;
  if (legality === "restricted") return colors.restricted;
  else return colors.notLegal;
};
export const CardLegalFormats: React.FC<LegalFormatsProps> = ({
  legalities,
}) => {
  console.log(legalities);
  return (
    //  border-2 p-4
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(legalities).map(([format, legal], idx) => {
        // console.log(format, legal);
        const isImportant = importantFormats.includes(format);
        if (isImportant) {
          return (
            <div key={idx} className="grid grid-cols-2 justify-items-center">
              <div
                className="w-min-20 w-20 rounded-sm p-1"
                style={{
                  backgroundColor: matchColor(legal),
                }}
              >
                <p className="text-center text-xs	font-semibold text-white">
                  {legal.replace("_", " ").toUpperCase()}
                </p>
              </div>
              <div className="justify-self-start text-left text-lg">
                {format}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
