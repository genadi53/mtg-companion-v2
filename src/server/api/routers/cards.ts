import axios, { type AxiosResponse } from "axios";
import { z } from "zod";
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
        const { data } = result.data;
        return data;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }),

  searchMultipleCards: publicProcedure
    .input(z.object({ text: z.string().min(2) }))
    .query(async ({ input }) => {
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
        console.log(cards.length);
        return cards;
      } catch (error) {
        console.log(error);
        return null;
      }
    }),

  searchCard: publicProcedure
    .input(z.object({ text: z.string().min(2) }))
    .query(async ({ input }) => {
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
});
