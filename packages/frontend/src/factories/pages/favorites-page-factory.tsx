import FavoritesPage from "@/components/pages/favorites-page/favorites-page";
import { userContextState } from "@/contexts/user-context";
import { UseFavoriteProps, UseFavoriteReturn } from "@/hooks/useFavoriteTools";
import { PokemonServiceModel } from "@/models/pokemon-service-model";

type MakeFavoritesPageProps = {
  pokemonServiceParam?: PokemonServiceModel;
  useFavoriteToolsParam?: ({
    pokemonService,
  }: UseFavoriteProps) => UseFavoriteReturn;
  useUserContextParam?: () => userContextState;
};

export const makeFavoritesPage = ({
  pokemonServiceParam = {} as PokemonServiceModel,
  useFavoriteToolsParam = {} as ({
    pokemonService,
  }: UseFavoriteProps) => UseFavoriteReturn,
  useUserContextParam = {} as () => userContextState,
}: MakeFavoritesPageProps = {}) => {
  return (
    <FavoritesPage
      pokemonService={pokemonServiceParam}
      useFavoriteTools={useFavoriteToolsParam}
      useUserContext={useUserContextParam}
    />
  );
};
