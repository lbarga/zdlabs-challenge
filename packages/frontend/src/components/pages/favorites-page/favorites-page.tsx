import PokemonList from "@/components/organisms/pokemon-list/pokemon-list";
import { userContextState } from "@/contexts/user-context";
import { UseFavoriteProps, UseFavoriteReturn } from "@/hooks/useFavoriteTools";
import { PokemonModel } from "@/models/pokemon-model";
import { PokemonServiceModel } from "@/models/pokemon-service-model";
import _orderby from "lodash.orderby";

type FavoritesPageProps = {
  pokemonService: PokemonServiceModel;
  useFavoriteTools: ({ pokemonService }: UseFavoriteProps) => UseFavoriteReturn;
  useUserContext: () => userContextState;
};

const FavoritesPage = ({
  pokemonService,
  useFavoriteTools,
  useUserContext,
}: FavoritesPageProps) => {
  const userContext = useUserContext();
  const favoriteTools = useFavoriteTools({ pokemonService, useUserContext });

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
