"use client";
import Image from "next/image";
import React, { useState, Suspense } from "react";
import SwitchButton from "~/components/SwitchButton";
import { api } from "~/utils/api";
import { type Card } from "~/utils/fetchTypes";
import Loading from "./loading";
import { LoadingPage } from "~/components/LoadingSpinner";
import { CardPreview } from "~/components/CardPreview";
import { PlaceholderCard } from "~/components/PlaceholderCard";
import { Search } from "~/components/SearchBar";
import { useDebounce } from "~/hooks/useDebounce";
import { CardsGrid } from "~/components/CardGrid";
import { CardTable } from "~/components/CardTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type CardDisplayTypes = "text" | "image" | "list";

export default function CardInfoPage() {
  const [searchedName, setSearchedName] = useState<string>("");
  const [cardDisplay, setCardDisplay] = useState<CardDisplayTypes>("list");
  const debouncedSearchValue = useDebounce(searchedName, 300);

  // const { data: cardData, isLoading } = api.card.searchCard.useQuery({
  //   text: debouncedSearchValue,
  // });

  const { data: cardData, isLoading } = api.card.searchMultipleCards.useQuery({
    text: debouncedSearchValue,
  });

  // if (isLoading) {
  // return <LoadingPage />;
  // }

  return (
    <>
      <div>
        <Search
          onChange={(e) => {
            console.log(e.target.value);
            setSearchedName(e.target.value);
          }}
        />
        <Select
          defaultValue="list"
          onValueChange={(value) => {
            setCardDisplay(value as CardDisplayTypes);
          }}
        >
          <SelectTrigger className="mx-4 w-[180px]">
            <SelectValue placeholder="Display as" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="list">Checklist</SelectItem>
            <SelectItem value="text">Text Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {!isLoading && cardData ? (
        <Suspense fallback={<Loading />}>
          {cardDisplay === "image" && <CardsGrid cards={cardData} />}
          {cardDisplay === "list" && <CardTable cards={cardData} />}
        </Suspense>
      ) : (
        <div>
          {/* <PlaceholderCard height={200} width={200} skeleton={true} /> */}
        </div>
      )}
    </>
  );
}
