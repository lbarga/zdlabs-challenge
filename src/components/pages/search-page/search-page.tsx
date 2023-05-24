"use client";
import PokemonList from "@/components/organisms/pokemon-list/pokemon-list";
import { GetAllPokemonsDataModel } from "@/models/get-all-pokemons-data-model";
import { pokeService } from "@/services/poke.service";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchPageContainer } from "./search-page-styles";

export default function SearchPage() {
  const [pokemonsData, setPokemonsData] = useState<GetAllPokemonsDataModel>(
    {} as GetAllPokemonsDataModel
  );
  const [loading, setLoading] = useState<boolean>(true);

  const fetch = async (offSet: number = 0) => {
    setLoading(true);

    const result = await pokeService.getAllPokemons(offSet);

    setPokemonsData(result.data);

    setLoading(false);
  };

  const handleOnChangePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    fetch((page - 1) * 20);
  };

  useEffect(() => {
    fetch();
  }, []);

  const hiddeNewGenerations = 57;

  const totalPages =
    Math.ceil(
      pokemonsData?.pokemons?.count / pokemonsData?.pokemons?.results.length
    ) - hiddeNewGenerations || 8;

  return (
    <SearchPageContainer>
      <Pagination count={totalPages} onChange={handleOnChangePagination} />
      <PokemonList
        pokemons={pokemonsData?.pokemons?.results}
        loading={loading}
      />
    </SearchPageContainer>
  );
}
