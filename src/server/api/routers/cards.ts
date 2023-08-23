import axios, { type AxiosResponse } from "axios";
import { z } from "zod";
import { db } from "~/db";
import { type Symbol as SymbolType, symbol } from "~/db/schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  type FetchCardsResponce,
  type Card,
  type FetchSymbolsResponce,
} from "~/utils/fetchTypes";

export const cardsRouter = createTRPCRouter({
  fetchAllSymbols: publicProcedure.query(async ({}) => {
    try {
      const result: AxiosResponse<FetchSymbolsResponce> = await axios(
        `https://api.scryfall.com/symbology`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result.status === 200) {
        const { data: symbols } = result.data;

        const dataToSave: Omit<SymbolType, "id">[] = [];
        for (const s of symbols) {
          const colorString =
            s.colors && s.colors.length > 0
              ? s.colors.reduce((prev, curr) => {
                  return prev.concat(` ${curr}`);
                }, "")
              : "";

          const alternateString =
            s.gatherer_alternates && s.gatherer_alternates.length > 0
              ? s.gatherer_alternates.reduce((prev, curr) => {
                  return prev.concat(` ${curr}`);
                }, "")
              : "";

          dataToSave.push({
            symbol: s.symbol,
            svg_uri: s.svg_uri,
            loose_variant: s.loose_variant,
            english: s.english,
            transposable: s.transposable,
            represents_mana: s.represents_mana,
            mana_value: s.mana_value,
            appears_in_mana_costs: s.appears_in_mana_costs,
            cmc: s.cmc,
            funny: s.funny,
            colors: colorString.trim(),
            gatherer_alternates: alternateString.trim(),
          });
        }

        await db.transaction(async (tx) => {
          await tx.insert(symbol).values(dataToSave);
        });
        return symbols;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }),

  searchMultipleCards: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      if (input.text.length <= 2) return [];

      try {
        const cards: Card[] = [];
        // let isFinished = false;
        const str = input.text.replace(" ", "+").toLowerCase();
        const result: AxiosResponse<FetchCardsResponce> = await axios(
          `https://api.scryfall.com/cards/search?q=${str}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // do {
        if (result === null || result.status !== 200) return null;
        const fetchData = result.data;
        cards.push(...fetchData.data);
        // console.log(cards.length);

        // if (fetchData.has_more && fetchData.next_page) {
        // result = await axios(fetchData.next_page);
        // } else {
        // isFinished = true;
        // }
        // } while (!isFinished);
        return cards;
      } catch (error) {
        console.log(error);
        return [];
      }
    }),

  searchCard: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      if (input.text.length <= 2) return null;
      try {
        const str = input.text.replace(" ", "+").toLowerCase();
        const result: AxiosResponse<Card> = await axios(
          `https://api.scryfall.com/cards/named?fuzzy=${str}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (result === null || result.status !== 200) return null;
        const card = result.data satisfies Card;
        return card;
      } catch (error) {
        console.log(error);
        return null;
      }
    }),

  getCardSymbols: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async ({ input }) => {
      if (input.text.length < 3) return [];

      const symbolsArray = input.text.match(/{\w+}/g) ?? [];
      // console.log(symbolsArray);
      const symbols: SymbolType[] = await db.select().from(symbol);
      // console.log(symbols);

      const findSymbolImgUri = (symbolStr: string) => {
        const defaultUrl =
          "https://c2.scryfall.com/file/scryfall-symbols/card-symbols/PW.svg";
        let result = defaultUrl;
        if (symbols) {
          symbols.forEach((s) => {
            if (s.symbol === symbolStr) {
              result = s.svg_uri ?? defaultUrl;
            }
          });
        }
        return result;
      };

      const allUrls: string[] = symbolsArray.map((s) => {
        return findSymbolImgUri(s);
      });
      return allUrls;
    }),
});
