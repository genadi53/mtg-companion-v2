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
