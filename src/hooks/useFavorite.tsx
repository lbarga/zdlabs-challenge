import { useUserContext } from "@/contexts/user-context";
import { PokemonModel } from "@/models/pokemon-model";
import { PokemonServiceModel } from "@/models/pokemon-service-model";

type UseFavoriteProps = {
  pokemonService: PokemonServiceModel;
};

type UseFavoriteReturn = {
  isFavorite: (id: number) => boolean;
  favoritePokemon: (pokemon: PokemonModel) => Promise<void>;
  unfavoritePokemon: (pokemon: PokemonModel) => Promise<void>;
};

export const useFavoriteTools = ({
  pokemonService,
}: UseFavoriteProps): UseFavoriteReturn => {
  const userContext = useUserContext();

  const isFavorite = (id: number) => {
    return userContext.favoritedPokemons.some(
      (favoritedPokemon) => favoritedPokemon.id === id
    );
  };

  const unfavoritePokemon = async (pokemon: PokemonModel) => {
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
  };

  const favoritePokemon = async (pokemon: PokemonModel) => {
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

  return { isFavorite, favoritePokemon, unfavoritePokemon };
};
