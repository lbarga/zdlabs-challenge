import { PokemonModel } from "./pokemon-model";

export type GetAllPokemonsDataModel = {
  pokemons: {
    count: number;
    nextOffset: number;
    prevOffset: number;
    results: PokemonModel[];
  };
};
