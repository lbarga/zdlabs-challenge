import { Schema, model } from "mongoose";

interface IPokemon {
  userId: string;
  id: number;
  name: string;
  image: string;
}

const pokemonSchema = new Schema<IPokemon>({
  userId: { type: String, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
});

export const Pokemon = model<IPokemon>("Pokemons", pokemonSchema);
