CREATE TABLE `account` (
	`id` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`type` varchar(191) NOT NULL,
	`provider` varchar(191) NOT NULL,
	`providerAccountId` varchar(191) NOT NULL,
	`refresh_token` varchar(191),
	`access_token` varchar(191),
	`expires_at` int,
	`token_type` varchar(191),
	`scope` varchar(191),
	`id_token` varchar(191),
	`session_state` varchar(191),
	CONSTRAINT `account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `card` (
	`id` varchar(191) NOT NULL,
	`lang` varchar(191),
	`mtgo_id` int,
	`oracle_id` varchar(191),
	`arena_id` int,
	`tcgplayer_id` int,
	`cardmarket_id` int,
	`scryfall_uri` varchar(191),
	`uri` varchar(191),
	`name` varchar(191),
	`cmc` int,
	`color_identity` varchar(191),
	`keywords` varchar(191),
	`layout` varchar(191),
	`loyalty` varchar(191),
	`mana_cost` varchar(191),
	`oracle_text` text,
	`power` varchar(191),
	`produced_mana` varchar(191),
	`reserved` boolean,
	`type_line` varchar(191),
	`toughness` varchar(191),
	`booster` boolean,
	`card_back_id` varchar(191),
	`collector_number` varchar(191),
	`digital` boolean,
	`finishes` varchar(191),
	`frame` varchar(191),
	`games` varchar(191),
	`highres_image` boolean,
	`illustration_id` varchar(191),
	`released_at` varchar(191),
	`reprint` boolean,
	`promo` boolean,
	`textless` boolean,
	`variation` boolean,
	`foil` boolean,
	`nonfoil` boolean,
	`set_id` varchar(191),
	`border_color` enum('black','white','borderless','silver','gold'),
	`image_status` enum('missing','placeholder','highres_scan','lowres'),
	`rarity` enum('common','rare','uncommon','bonus','special','mythic'),
	CONSTRAINT `card_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `card_face` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`artist` varchar(191),
	`cmc` int,
	`name` varchar(191),
	`mana_cost` varchar(191),
	`type_line` varchar(191),
	`oracle_text` text,
	`colors` varchar(191),
	`artist_id` varchar(191),
	`illustration_id` varchar(191),
	`image_url` varchar(191),
	`card_id` varchar(191),
	CONSTRAINT `card_face_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `card_legality` (
	`card_id` varchar(191),
	`format` enum('standard','future','historic','gladiator','pioneer','explorer','modern','legacy','pauper','vintage','penny','commander','oathbreaker','brawl','historicbrawl','alchemy','paupercommander','duel','oldschool','premodern','predh'),
	`legality` enum('legal','not_legal','restricted','banned'),
	CONSTRAINT `card_legality_card_id_format_unique` UNIQUE(`card_id`,`format`)
);
--> statement-breakpoint
CREATE TABLE `cards_in_decks` (
	`deck_id` varchar(191),
	`card_id` varchar(191),
	`number_copies` int,
	`addedAt` timestamp DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `deck` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191),
	`format` enum('standard','future','historic','gladiator','pioneer','explorer','modern','legacy','pauper','vintage','penny','commander','oathbreaker','brawl','historicbrawl','alchemy','paupercommander','duel','oldschool','premodern','predh'),
	`cover_image_url` varchar(191),
	`creator_id` varchar(191),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `deck_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(191) NOT NULL,
	`sessionToken` varchar(191),
	`userId` varchar(191) NOT NULL,
	`expires` timestamp,
	CONSTRAINT `session_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_sessionToken_unique` UNIQUE(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `set` (
	`id` varchar(191) NOT NULL,
	`code` varchar(191),
	`mtgo_code` varchar(191),
	`arena_code` varchar(191),
	`tcgplayer_id` int,
	`name` varchar(191),
	`set_type` varchar(191),
	`released_at` varchar(191),
	`block_code` varchar(191),
	`block` varchar(191),
	`parent_set_code` varchar(191),
	`card_count` int,
	`printed_size` int,
	`digital` boolean,
	`foil_only` boolean,
	`nonfoil_only` boolean,
	`uri` varchar(191),
	`scryfall_uri` varchar(191),
	`search_uri` varchar(191),
	`icon_svg_uri` varchar(191),
	CONSTRAINT `set_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191),
	`email` varchar(191),
	`emailVerified` timestamp,
	`image` varchar(191),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verification_token` (
	`identifier` varchar(191),
	`token` varchar(191),
	`expires` timestamp,
	CONSTRAINT `verification_token_token_unique` UNIQUE(`token`),
	CONSTRAINT `verification_token_identifier_token_unique` UNIQUE(`identifier`,`token`)
);
