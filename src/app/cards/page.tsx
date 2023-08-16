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

export default function CardInfoPage() {
  const [searchedName, setSearchedName] = useState<string>("");
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
      <Search
        onChange={(e) => {
          console.log(e.target.value);
          setSearchedName(e.target.value);
        }}
      />
      {!isLoading && cardData ? (
        <Suspense fallback={<Loading />}>
          {/* <div>
            <CardPreview card={cardData} height={200} width={200} />
          </div> */}
          <CardsGrid cards={cardData} />
        </Suspense>
      ) : (
        <div>
          {/* <PlaceholderCard height={200} width={200} skeleton={true} /> */}
        </div>
      )}
    </>
  );
}
