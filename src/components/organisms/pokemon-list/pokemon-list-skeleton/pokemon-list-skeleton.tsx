"use client";
"use client";
import Space from "@/components/molecules/space";
import { Skeleton } from "@mui/material";
import { SearchPageSkeletonCardsContainer } from "./pokemon-list-skeleton-styles";

export default function PokemonListSkeleton() {
  const makeRows = () => {
    const rows = [];

    for (let i = 0; i < 20; i++) {
      rows.push(
        <Skeleton variant="rounded" width={200} height={230} key={i} />
      );
    }

    return rows;
  };

  return (
    <>
      <Space height={24} />
      <SearchPageSkeletonCardsContainer>
        {makeRows().map((row, index) => {
          return <div key={index}>{row}</div>;
        })}
      </SearchPageSkeletonCardsContainer>
    </>
  );
}
