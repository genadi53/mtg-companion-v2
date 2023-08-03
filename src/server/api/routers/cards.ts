import axios, { type AxiosResponse } from "axios";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type FetchSymbolsResponce } from "~/utils/fetchTypes";

export const cardsRouter = createTRPCRouter({
  fetchAllSymbols: publicProcedure.query(async ({ ctx }) => {
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
});
