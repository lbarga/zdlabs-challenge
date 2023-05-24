import { ApolloQueryResult } from "@apollo/client";
import { GetAllPokemonsDataModel } from "./get-all-pokemons-data-model";

export type PokeServiceModel = {
  getAllPokemons: (
    offset?: number
  ) => Promise<ApolloQueryResult<GetAllPokemonsDataModel>>;
};
