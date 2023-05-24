"use client";

import PokemonList from "@/components/pokemon-list/pokemon-list";
import { GetAllPokemonsDataModel } from "@/models/get-all-pokemons-data-model";
import { pokeService } from "@/services/poke.service";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { HomePageContainer } from "./home-page-styles";

export default function HomePage() {
  const [pokemonsData, setPokemonsData] = useState<GetAllPokemonsDataModel>(
    {} as GetAllPokemonsDataModel
  );

  const fetch = async (offSet: number = 0) => {
    const result = await pokeService.getAllPokemons(offSet);

    setPokemonsData(result.data);
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
    ) - hiddeNewGenerations || 0;

  return (
    <HomePageContainer>
      <h1>Home</h1>
      <Pagination count={totalPages} onChange={handleOnChangePagination} />
      <PokemonList pokemons={pokemonsData?.pokemons?.results} />
    </HomePageContainer>
  );
}
