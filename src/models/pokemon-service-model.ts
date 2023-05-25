import { AxiosResponse } from "axios";
import { PokemonModel } from "./pokemon-model";

export type PokemonServiceModel = {
  favoritePokemon: (
    pokemon: PokemonModel,
    userId: string
  ) => Promise<AxiosResponse<any>>;
  getFavoritedPokemons: (
    userId: string
  ) => Promise<AxiosResponse<PokemonModel[]>>;
  unfavoritePokemon: (
    pokemonId: number,
    userId: string
  ) => Promise<AxiosResponse<any>>;
};
