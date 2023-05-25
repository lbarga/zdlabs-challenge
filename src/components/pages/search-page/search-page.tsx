"use client";
import PokemonList from "@/components/organisms/pokemon-list/pokemon-list";
import { userContextState } from "@/contexts/user-context";
import { UseFavoriteProps, UseFavoriteReturn } from "@/hooks/useFavoriteTools";
import { GetAllPokemonsDataModel } from "@/models/get-all-pokemons-data-model";
import { PokeServiceModel } from "@/models/poke-service-model";
import { PokemonModel } from "@/models/pokemon-model";
import { PokemonServiceModel } from "@/models/pokemon-service-model";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchPageContainer } from "./search-page-styles";

type SearchPageProps = {
  pokeService: PokeServiceModel;
  pokemonService: PokemonServiceModel;
  useFavoriteTools: ({ pokemonService }: UseFavoriteProps) => UseFavoriteReturn;
  useUserContext: () => userContextState;
};

export default function SearchPage({
  pokeService,
  pokemonService,
  useFavoriteTools,
  useUserContext,
}: SearchPageProps) {
  const [pokemonsData, setPokemonsData] = useState<GetAllPokemonsDataModel>(
    {} as GetAllPokemonsDataModel
  );
  const [loading, setLoading] = useState<boolean>(true);

  const favoriteTools = useFavoriteTools({ pokemonService, useUserContext });

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
    const isFavorite = favoriteTools.isFavorite(pokemon.id);

    if (isFavorite) {
      favoriteTools.unfavoritePokemon(pokemon);

      return;
    }

    favoriteTools.favoritePokemon(pokemon);
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
