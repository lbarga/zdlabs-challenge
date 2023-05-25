import SearchPage from "@/components/pages/search-page/search-page";
import { userContextState } from "@/contexts/user-context";
import { UseFavoriteProps, UseFavoriteReturn } from "@/hooks/useFavoriteTools";
import { PokeServiceModel } from "@/models/poke-service-model";
import { PokemonServiceModel } from "@/models/pokemon-service-model";

type MakeSearchPageProps = {
  pokeServiceParam?: PokeServiceModel;
  pokemonServiceParam?: PokemonServiceModel;
  useFavoriteToolsParam?: ({
    pokemonService,
  }: UseFavoriteProps) => UseFavoriteReturn;
  useUserContextParam?: () => userContextState;
};

export const makeSearchPage = ({
  pokeServiceParam = {} as PokeServiceModel,
  pokemonServiceParam = {} as PokemonServiceModel,
  useFavoriteToolsParam = {} as ({
    pokemonService,
  }: UseFavoriteProps) => UseFavoriteReturn,
  useUserContextParam = {} as () => userContextState,
}: MakeSearchPageProps = {}) => {
  return (
    <SearchPage
      pokeService={pokeServiceParam}
      pokemonService={pokemonServiceParam}
      useFavoriteTools={useFavoriteToolsParam}
      useUserContext={useUserContextParam}
    />
  );
};
