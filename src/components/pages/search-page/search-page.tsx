"use client";
import PokemonList from "@/components/organisms/pokemon-list/pokemon-list";
import { useUserContext } from "@/contexts/user-context";
import { GetAllPokemonsDataModel } from "@/models/get-all-pokemons-data-model";
import { PokemonModel } from "@/models/pokemon-model";
import { pokeService } from "@/services/poke.service";
import { pokemonService } from "@/services/pokemon.service";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchPageContainer } from "./search-page-styles";

export default function SearchPage() {
  const [pokemonsData, setPokemonsData] = useState<GetAllPokemonsDataModel>(
    {} as GetAllPokemonsDataModel
  );
  const [loading, setLoading] = useState<boolean>(true);

  const userContext = useUserContext();

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

  const handleClickFavorite = async (pokemon: PokemonModel) => {
    const favoritePokemonIds = userContext.favoritedPokemons.map(
      (pokemon) => pokemon.id
    );
    const isFavorite = favoritePokemonIds.includes(pokemon.id);

    if (isFavorite) {
      const response = await pokemonService.unfavoritePokemon(
        pokemon.id,
        userContext.UUID
      );

      if (response.status === 200) {
        userContext.setFavoritedPokemons(
          userContext.favoritedPokemons.filter(
            (favoritedPokemon) => favoritedPokemon.id !== pokemon.id
          )
        );
      }

      return;
    }

    const response = await pokemonService.favoritePokemon(
      pokemon,
      userContext.UUID
    );

    if (response.status === 201) {
      userContext.setFavoritedPokemons([
        ...userContext.favoritedPokemons,
        pokemon,
      ]);
    }
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
        onClickFavorite={handleClickFavorite}
      />
    </SearchPageContainer>
  );
}
