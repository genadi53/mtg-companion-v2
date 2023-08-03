import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { FetchSetsResponce } from "~/utils/fetchTypes";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { type Set } from "@prisma/client";

export const setRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  fetchAllSets: publicProcedure.query(async ({ ctx }) => {
    const result: AxiosResponse<FetchSetsResponce> = await axios.request({
      url: `https://api.scryfall.com/sets`,
      method: "GET",
    });
    const sets: FetchSetsResponce = result.data;
    // console.log(sets);

    const dataForSave: Set[] = [];
    const ids: string[] = [];

    for (const set of sets.data) {
      ids.push(set.id);
      dataForSave.push({
        id: set.id,
        code: set.code,
        mtgo_code: set.mtgo_code ? set.mtgo_code : null,
        arena_code: set.arena_code ? set.arena_code : null,
        tcgplayer_id: set.tcgplayer_id ? set.tcgplayer_id : null,
        name: set.name,
        set_type: set.set_type,
        released_at: set.released_at ? set.released_at : null,
        block_code: set.block_code ? set.block_code : null,
        block: set.block ? set.block : null,
        parent_set_code: set.parent_set_code ? set.parent_set_code : null,
        card_count: set.card_count,
        printed_size: set.printed_size ? set.printed_size : null,
        digital: set.digital,
        foil_only: set.foil_only,
        nonfoil_only: set.nonfoil_only,
        uri: set.uri,
        scryfall_uri: set.scryfall_uri,
        search_uri: set.search_uri ? set.search_uri : null,
        icon_svg_uri: set.icon_svg_uri,
      });
    }

    await ctx.prisma.set.createMany({
      data: dataForSave,
      skipDuplicates: true,
    });
    return sets;
  }),
});
