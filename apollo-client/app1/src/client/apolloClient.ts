import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

export function createApolloClient({ ssrMode = false, fetch }) {
  const apolloCache = new InMemoryCache();
  const apolloClient = new ApolloClient({
    ssrMode,
    cache: apolloCache,
    link: createHttpLink({
      uri: 'https://graphql-pokeapi.graphcdn.app',
      // this is required for apollo
      // @see https://www.apollographql.com/docs/link/links/http/#fetch-polyfill
      fetch,
    }),
  });

  return {
    apolloCache,
    apolloClient,
  };
}
