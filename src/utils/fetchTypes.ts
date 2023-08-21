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

export interface Card {
  object: string;
  id: string;
  lang: string;
  mtgo_id?: number | null;
  oracle_id: string;
  multiverse_ids?: number[] | null;
  arena_id?: number | null;
  tcgplayer_id?: number | null;
  cardmarket_id?: number | null;
  prints_search_uri: string;
  rulings_uri: string;
  scryfall_uri: string;
  uri: string;
  name: string;

  all_parts?: RelatedCards[] | null;
  card_faces?: CardFacesDetails[];
  cmc: number;
  color_identity: string[];
  color_indicator?: string[];
  colors?: string[];
  keywords: string[];
  layout: string;
  legalities: Record<string, Legalities>;
  loyalty?: string;
  mana_cost?: string;
  oracle_text?: string;
  flavor_text?: string;
  oversized: boolean;
  power?: string;
  toughness?: string;
  produced_mana?: string[];
  reserved: boolean;
  type_line: string;

  artist: string;
  attraction_lights?: [];
  booster: boolean;
  border_color: "black" | "white" | "borderless" | "silver" | "gold";
  card_back_id: string;
  collector_number: string;
  content_warning?: boolean;
  digital: boolean;
  finishes: string[];
  flavor_name?: string;
  frame_effects?: [];
  frame: string;
  full_art: boolean;
  games: string[];
  highres_image: boolean;
  illustration_id?: string;
  image_status: "missing" | "placeholder" | "lowres" | "highres_scan";
  image_uris?: ImageTypes;
  prices: CardPrices;
  printed_name?: string;
  printed_text?: string;
  printed_type_line?: string;
  promo: boolean;
  promo_types?: [];
  purchase_uris: Record<string, string>;
  rarity: Rarity;
  related_uris: Record<string, string>;
  released_at: string;
  reprint: boolean;
  scryfall_set_uri: string;
  set_name: string;
  set_id: string;
  set: string;
  set_type: string;
  set_uri: string;
  set_search_uri: string;
  story_spotlight: boolean;
  textless: boolean;
  variation: boolean;
  variation_of?: string;
  foil: boolean;
  nonfoil: boolean;
  artist_ids: string[];
  security_stamp?: string;
  watermark?: string;
  edhrec_rank?: number;
  penny_rank?: number;
  preview: CardPreview;
}

export interface RelatedCards {
  object: string;
  id: string;
  component: string;
  name: string;
  type_line: string;
  uri: string;
}

export interface CardFacesDetails {
  artist: string;
  cmc: number;
  object: string;
  name: string;
  mana_cost: string;
  type_line: string;
  oracle_text: string;
  flavor_text?: string;
  power?: string;
  toughness?: string;
  colors: string[];
  artist_id: string;
  illustration_id: string;
  image_uris: ImageTypes;
}

export interface ImageTypes {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop?: string;
  border_crop?: string;
}

export type Legalities = "legal" | "not_legal" | "restricted" | "banned";
export type Rarity =
  | "common"
  | "uncommon"
  | "rare"
  | "special"
  | "mythic"
  | "bonus";

export interface CardPrices {
  usd: string;
  usd_foil: string | null;
  usd_etched: string | null;
  eur: string;
  eur_foil: string | null;
  tix: string;
}

export interface CardPreview {
  source: string;
  source_uri: string;
  previewed_at: string;
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

export interface FetchCardsResponce extends GenericFetchResponce {
  data: Card[];
}
