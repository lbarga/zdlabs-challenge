import pokeClient from "@/infra/poke-graphql-api";
import { GetAllPokemonsDataModel } from "@/models/get-all-pokemons-data-model";
import { PokeServiceModel } from "@/models/poke-service-model";
import { ApolloQueryResult, gql } from "@apollo/client";

const getAllPokemons = async (
  offset = 0
): Promise<ApolloQueryResult<GetAllPokemonsDataModel>> => {
  return pokeClient.query({
    query: gql`
      query {
        pokemons(offset: ${offset}) {
          count
          next
          previous
          nextOffset
          prevOffset
          status
          message
          results {
            id
            name
            url
            image
            artwork
            dreamworld
          }
        }
      }
    `,
  });
};

export const pokeService: PokeServiceModel = {
  getAllPokemons,
};
