import { relations, type InferModel } from "drizzle-orm";
import {
  boolean,
  decimal,
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/mysql-core";

export const account = mysqlTable("account", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("userId", { length: 191 }).notNull(),
  type: varchar("type", { length: 191 }).notNull(),
  provider: varchar("provider", { length: 191 }).notNull(),
  providerAccountId: varchar("providerAccountId", { length: 191 }).notNull(),
  refresh_token: varchar("refresh_token", { length: 191 }),
  access_token: varchar("access_token", { length: 191 }),
  expires_at: int("expires_at"),
  token_type: varchar("token_type", { length: 191 }),
  scope: varchar("scope", { length: 191 }),
  id_token: varchar("id_token", { length: 191 }),
  session_state: varchar("session_state", { length: 191 }),
});

export type Account = InferModel<typeof account>;

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const session = mysqlTable("session", {
  id: varchar("id", { length: 191 }).primaryKey(),
  sessionToken: varchar("sessionToken", { length: 191 }).unique(),
  userId: varchar("userId", { length: 191 }).notNull(),
  expires: timestamp("expires"),
});

export type Session = InferModel<typeof session>;

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const user = mysqlTable("user", {
  id: varchar("id", { length: 191 }).primaryKey(),
  name: varchar("name", { length: 191 }),
  email: varchar("email", { length: 191 }).unique(),
  emailVerified: timestamp("emailVerified"),
  image: varchar("image", { length: 191 }),
});

export type User = InferModel<typeof user>;

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  sessions: many(session),
  decks: many(deck),
}));

export const verificationToken = mysqlTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 191 }),
    token: varchar("token", { length: 191 }).unique(),
    expires: timestamp("expires"),
  },
  (table) => ({
    unq: unique().on(table.identifier, table.token),
  })
);

export type VerificationToken = InferModel<typeof verificationToken>;

export const set = mysqlTable("set", {
  id: varchar("id", { length: 191 }).primaryKey(),
  code: varchar("code", { length: 191 }),
  mtgo_code: varchar("mtgo_code", { length: 191 }),
  arena_code: varchar("arena_code", { length: 191 }),
  tcgplayer_id: int("tcgplayer_id"),
  name: varchar("name", { length: 191 }),
  set_type: varchar("set_type", { length: 191 }),
  released_at: varchar("released_at", { length: 191 }),
  block_code: varchar("block_code", { length: 191 }),
  block: varchar("block", { length: 191 }),
  parent_set_code: varchar("parent_set_code", { length: 191 }),
  card_count: int("card_count"),
  printed_size: int("printed_size"),
  digital: boolean("digital"),
  foil_only: boolean("foil_only"),
  nonfoil_only: boolean("nonfoil_only"),
  uri: varchar("uri", { length: 191 }),
  scryfall_uri: varchar("scryfall_uri", { length: 191 }),
  search_uri: varchar("search_uri", { length: 191 }),
  icon_svg_uri: varchar("icon_svg_uri", { length: 191 }),
});

export type Set = InferModel<typeof set>;

export const setRelations = relations(set, ({ many }) => ({
  cards: many(card),
}));

export const card = mysqlTable("card", {
  id: varchar("id", { length: 191 }).primaryKey(),
  lang: varchar("lang", { length: 191 }),
  mtgo_id: int("mtgo_id"),
  oracle_id: varchar("oracle_id", { length: 191 }),
  arena_id: int("arena_id"),
  tcgplayer_id: int("tcgplayer_id"),
  cardmarket_id: int("cardmarket_id"),
  scryfall_uri: varchar("scryfall_uri", { length: 191 }),
  uri: varchar("uri", { length: 191 }),
  name: varchar("name", { length: 191 }),
  cmc: int("cmc"),
  color_identity: varchar("color_identity", { length: 191 }),
  keywords: varchar("keywords", { length: 191 }),
  layout: varchar("layout", { length: 191 }),
  loyalty: varchar("loyalty", { length: 191 }),
  mana_cost: varchar("mana_cost", { length: 191 }),
  oracle_text: text("oracle_text"),
  power: varchar("power", { length: 191 }),
  produced_mana: varchar("produced_mana", { length: 191 }),
  reserved: boolean("reserved"),
  type_line: varchar("type_line", { length: 191 }),
  toughness: varchar("toughness", { length: 191 }),
  booster: boolean("booster"),
  card_back_id: varchar("card_back_id", { length: 191 }),
  collector_number: varchar("collector_number", { length: 191 }),
  digital: boolean("digital"),
  finishes: varchar("finishes", { length: 191 }),
  frame: varchar("frame", { length: 191 }),
  games: varchar("games", { length: 191 }),
  highres_image: boolean("highres_image"),
  illustration_id: varchar("illustration_id", { length: 191 }),
  released_at: varchar("released_at", { length: 191 }),
  reprint: boolean("reprint"),
  promo: boolean("promo"),
  textless: boolean("textless"),
  variation: boolean("variation"),
  foil: boolean("foil"),
  nonfoil: boolean("nonfoil"),
  set_id: varchar("set_id", { length: 191 }),
  border_color: mysqlEnum("border_color", [
    "black",
    "white",
    "borderless",
    "silver",
    "gold",
  ]),
  image_status: mysqlEnum("image_status", [
    "missing",
    "placeholder",
    "highres_scan",
    "lowres",
  ]),
  rarity: mysqlEnum("rarity", [
    "common",
    "rare",
    "uncommon",
    "bonus",
    "special",
    "mythic",
  ]),
});

export type Card = InferModel<typeof card>;

export const cardRelations = relations(card, ({ many, one }) => ({
  cardsInDecks: many(cardsInDecks),
  cardFace: many(cardFace),
  cardLegality: many(cardLegality),
  set: one(set, { fields: [card.set_id], references: [set.id] }),
}));

export const deck = mysqlTable("deck", {
  id: varchar("id", { length: 191 }).primaryKey(),
  name: varchar("name", { length: 191 }),
  format: mysqlEnum("format", [
    "standard",
    "future",
    "historic",
    "gladiator",
    "pioneer",
    "explorer",
    "modern",
    "legacy",
    "pauper",
    "vintage",
    "penny",
    "commander",
    "oathbreaker",
    "brawl",
    "historicbrawl",
    "alchemy",
    "paupercommander",
    "duel",
    "oldschool",
    "premodern",
    "predh",
  ]),
  cover_image_url: varchar("cover_image_url", { length: 191 }),
  creator_id: varchar("creator_id", { length: 191 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Deck = InferModel<typeof deck>;

export const deckRelations = relations(deck, ({ many, one }) => ({
  cardsInDecks: many(cardsInDecks),
  creator: one(user, { fields: [deck.creator_id], references: [user.id] }),
}));

export const cardsInDecks = mysqlTable("cards_in_decks", {
  deck_id: varchar("deck_id", { length: 191 }),
  card_id: varchar("card_id", { length: 191 }),
  number_copies: int("number_copies"),
  addedAt: timestamp("addedAt").defaultNow(),

  //   deck: foreignKey("deck", { table: "deck", column: "deck_id" }),
  //   card: foreignKey("card", { table: "card", column: "card_id" }),

  //   primaryKeys: [["deck_id", "card_id"]],
});

export type CardsInDecks = InferModel<typeof cardsInDecks>;

export const cardsInDecksRelations = relations(cardsInDecks, ({ one }) => ({
  card: one(card, { fields: [cardsInDecks.card_id], references: [card.id] }),
  deck: one(deck, { fields: [cardsInDecks.deck_id], references: [deck.id] }),
}));

export const cardLegality = mysqlTable(
  "card_legality",
  {
    card_id: varchar("card_id", { length: 191 }),
    format: mysqlEnum("format", [
      "standard",
      "future",
      "historic",
      "gladiator",
      "pioneer",
      "explorer",
      "modern",
      "legacy",
      "pauper",
      "vintage",
      "penny",
      "commander",
      "oathbreaker",
      "brawl",
      "historicbrawl",
      "alchemy",
      "paupercommander",
      "duel",
      "oldschool",
      "premodern",
      "predh",
    ]),
    legality: mysqlEnum("legality", [
      "legal",
      "not_legal",
      "restricted",
      "banned",
    ]),
  },
  (table) => ({
    unq: unique().on(table.card_id, table.format),
  })
);

export type CardLegality = InferModel<typeof cardLegality>;

export const cardLegalityRelations = relations(cardLegality, ({ one }) => ({
  card: one(card, { fields: [cardLegality.card_id], references: [card.id] }),
}));

export const cardFace = mysqlTable("card_face", {
  id: serial("id").primaryKey(),
  artist: varchar("artist", { length: 191 }),
  cmc: int("cmc"),
  name: varchar("name", { length: 191 }),
  mana_cost: varchar("mana_cost", { length: 191 }),
  type_line: varchar("type_line", { length: 191 }),
  oracle_text: text("oracle_text"),
  colors: varchar("colors", { length: 191 }),
  artist_id: varchar("artist_id", { length: 191 }),
  illustration_id: varchar("illustration_id", { length: 191 }),
  image_url: varchar("image_url", { length: 191 }),
  card_id: varchar("card_id", { length: 191 }),
});

export type CardFace = InferModel<typeof cardFace>;

export const cardFaceRelations = relations(cardFace, ({ one }) => ({
  card: one(card, { fields: [cardFace.card_id], references: [card.id] }),
}));

export const symbol = mysqlTable("symbol", {
  id: serial("id").primaryKey(),
  symbol: varchar("symbol", { length: 191 }).unique(),
  svg_uri: varchar("svg_uri", { length: 191 }),
  loose_variant: varchar("loose_variant", { length: 191 }),
  english: varchar("english", { length: 191 }),
  transposable: boolean("transposable").default(false),
  represents_mana: boolean("represents_mana").default(false),
  appears_in_mana_costs: boolean("appears_in_mana_costs").default(false),
  mana_value: int("mana_value"),
  cmc: int("cmc"),
  funny: boolean("funny").default(false),
  colors: varchar("colors", { length: 191 }),
  gatherer_alternates: varchar("gatherer_alternates", { length: 191 }),
});

export type Symbol = InferModel<typeof symbol>;
