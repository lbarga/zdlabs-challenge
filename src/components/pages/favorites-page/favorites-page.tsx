import PokemonList from "@/components/organisms/pokemon-list/pokemon-list";
import { useUserContext } from "@/contexts/user-context";
import { useFavoriteTools } from "@/hooks/useFavorite";
import { PokemonModel } from "@/models/pokemon-model";
import { pokemonService } from "@/services/pokemon.service";
import _orderby from "lodash.orderby";

const FavoritesPage = () => {
  const userContext = useUserContext();
  const favoriteTools = useFavoriteTools({ pokemonService });

  const handleClickFavorite = async (pokemon: PokemonModel) => {
    const isFavorite = favoriteTools.isFavorite(pokemon.id);

    if (isFavorite) {
      favoriteTools.unfavoritePokemon(pokemon);

      return;
    }

    favoriteTools.favoritePokemon(pokemon);
  };

  const orderedFavoritedPokemons = _orderby(
    userContext.favoritedPokemons,
    ["id"],
    ["asc"]
  );

  return (
    <div className="favorites-page">
      <PokemonList
        loading={false}
        onClickFavorite={handleClickFavorite}
        pokemons={orderedFavoritedPokemons}
      />
    </div>
  );
};

export default FavoritesPage;
