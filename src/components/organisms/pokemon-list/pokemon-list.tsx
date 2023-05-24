import { PokemonModel } from "@/models/pokemon-model";
import PokemonListSkeleton from "./pokemon-list-skeleton/pokemon-list-skeleton";
import {
  PokemonListCard,
  PokemonListCardContent,
  PokemonListCardContentHeader,
  PokemonListCardNumber,
  PokemonListContainer,
  PokemonListContent,
} from "./pokemon-list-styles";

type PokemonListProps = {
  pokemons: PokemonModel[];
  loading: boolean;
};

export default function PokemonList({ pokemons, loading }: PokemonListProps) {
  return (
    <PokemonListContainer>
      {loading && <PokemonListSkeleton />}
      {!loading && (
        <PokemonListContent>
          {pokemons?.map((pokemon) => {
            return (
              <PokemonListCard key={pokemon.id}>
                <PokemonListCardContent>
                  <PokemonListCardContentHeader>
                    <PokemonListCardNumber>{`#${pokemon.id}`}</PokemonListCardNumber>
                    <div />
                  </PokemonListCardContentHeader>
                  <img src={pokemon.image} alt={pokemon.name} />
                  <p>{pokemon.name}</p>
                </PokemonListCardContent>
              </PokemonListCard>
            );
          })}
        </PokemonListContent>
      )}
    </PokemonListContainer>
  );
}
