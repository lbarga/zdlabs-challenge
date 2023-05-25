import { useUserContext } from "@/contexts/user-context";
import { PokemonModel } from "@/models/pokemon-model";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PokemonListSkeleton from "./pokemon-list-skeleton/pokemon-list-skeleton";
import {
  PokemonListCard,
  PokemonListCardContent,
  PokemonListCardContentHeader,
  PokemonListCardFavoriteButton,
  PokemonListCardNumber,
  PokemonListContainer,
  PokemonListContent,
} from "./pokemon-list-styles";

type PokemonListProps = {
  pokemons: PokemonModel[];
  loading: boolean;
  onClickFavorite: (pokemon: PokemonModel) => void;
};

export default function PokemonList({
  pokemons,
  loading,
  onClickFavorite,
}: PokemonListProps) {
  const userContext = useUserContext();

  const checkIfPokemonIsFavorite = (pokemonId: number) => {
    const isFavorite = userContext?.favoritedPokemons.some(
      (favoritedPokemon) => favoritedPokemon.id === pokemonId
    );

    if (isFavorite) {
      return "red";
    }

    return "";
  };

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
                    <PokemonListCardFavoriteButton
                      onClick={() => onClickFavorite(pokemon)}
                      style={{ color: checkIfPokemonIsFavorite(pokemon.id) }}
                    >
                      <FavoriteIcon style={{ color: "" }} />
                    </PokemonListCardFavoriteButton>
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
