"use client";
import React from "react";
import type { Legalities } from "~/utils/fetchTypes";

interface LegalFormatsProps {
  legalities: Record<string, Legalities>;
}

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
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(legalities).map(([format, legal], idx) => {
        // console.log(format, legal);
        return (
          <div key={idx} className="grid grid-cols-2 gap-2">
            <div
              style={{
                backgroundColor: matchColor(legal),
              }}
            >
              <p className="text-center">
                {legal.replace("_", " ").toUpperCase()}
              </p>
            </div>
            <div style={{ marginLeft: 10 }}>
              <p>{format}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
