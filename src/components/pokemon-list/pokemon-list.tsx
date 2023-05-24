import { PokemonModel } from "@/models/pokemon-model";
import {
  PokemonListCard,
  PokemonListCardContent,
  PokemonListContainer,
  PokemonListContent,
} from "./pokemon-list-styles";

type PokemonListProps = {
  pokemons: PokemonModel[];
};

export default function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <PokemonListContainer>
      <PokemonListContent>
        {pokemons?.map((pokemon) => {
          return (
            <PokemonListCard>
              <PokemonListCardContent>
                <h1>{pokemon.id}</h1>
                <img src={pokemon.image} alt={pokemon.name} />
                <h1>{pokemon.name}</h1>
              </PokemonListCardContent>
            </PokemonListCard>
          );
        })}
      </PokemonListContent>
    </PokemonListContainer>
  );
}
