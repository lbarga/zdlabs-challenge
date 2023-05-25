import expressAPI from "@/infra/express-api";
import { PokemonModel } from "@/models/pokemon-model";
import { AxiosResponse } from "axios";
import { PokemonServiceModel } from "./../models/pokemon-service-model";

const BASE_URL = "/pokemons";

const favoritePokemon = async (
  pokemon: PokemonModel,
  userId: string
): Promise<AxiosResponse<any>> => {
  expressAPI.defaults.headers.common["userId"] = userId;

  return expressAPI.post(BASE_URL, pokemon);
};

const getFavoritedPokemons = async (
  userId: string
): Promise<AxiosResponse<PokemonModel[]>> => {
  expressAPI.defaults.headers.common["userId"] = userId;

  return expressAPI.get(BASE_URL);
};

const unfavoritePokemon = async (
  pokemonId: number,
  userId: string
): Promise<AxiosResponse<any>> => {
  expressAPI.defaults.headers.common["userId"] = userId;

  return expressAPI.delete(`${BASE_URL}/${pokemonId}`);
};

export const pokemonService: PokemonServiceModel = {
  favoritePokemon,
  getFavoritedPokemons,
  unfavoritePokemon,
};
