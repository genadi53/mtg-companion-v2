CREATE TABLE `symbol` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`symbol` varchar(191),
	`svg_uri` varchar(191),
	`loose_variant` varchar(191),
	`english` varchar(191),
	`transposable` boolean DEFAULT false,
	`represents_mana` boolean DEFAULT false,
	`appears_in_mana_costs` boolean DEFAULT false,
	`mana_value` int,
	`cmc` int,
	`funny` boolean DEFAULT false,
	`colors` varchar(191),
	`gatherer_alternates` varchar(191),
	CONSTRAINT `symbol_id` PRIMARY KEY(`id`),
	CONSTRAINT `symbol_symbol_unique` UNIQUE(`symbol`)
);
