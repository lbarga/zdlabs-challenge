import { ApolloClient, InMemoryCache } from "@apollo/client";

const graphqlPokeApiUrl = process.env.NEXT_PUBLIC_GRAPHQL_POKE_API_URL;

const pokeClient = new ApolloClient({
  uri: graphqlPokeApiUrl,
  cache: new InMemoryCache(),
});

export default pokeClient;
