export interface Set {
  object: string;
  id: string;
  code: string;
  mtgo_code?: string;
  tcgplayer_id?: number;
  arena_code?: string;
  name: string;
  set_type: string;
  released_at?: string;
  block_code?: string;
  block?: string;
  parent_set_code?: string;
  card_count: number;
  printed_size?: number;
  digital: boolean;
  foil_only: boolean;
  nonfoil_only: boolean;
  scryfall_uri: string;
  uri: string;
  search_uri?: string;
  icon_svg_uri: string;
}

export interface MTG_Symbol {
  object: string;
  symbol: string;
  svg_uri: string;
  loose_variant: string | null;
  english: string;
  transposable: boolean;
  represents_mana: boolean;
  mana_value: number;
  appears_in_mana_costs: boolean;
  cmc: number | null;
  funny: boolean;
  colors: string[];
  gatherer_alternates: string[] | null;
}

export interface GenericFetchResponce {
  object: string;
  has_more?: boolean;
  next_page?: string;
  total_cards?: number;
  warnings?: [];
}

export interface FetchSetsResponce extends GenericFetchResponce {
  data: Set[];
}

export interface FetchSymbolsResponce extends GenericFetchResponce {
  data: MTG_Symbol[];
}
