import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { createHttpLink } from 'apollo-link-http';

const GRAPHQL_ENDPOINT: string =
  'https://graphy.us-west-2.aws.cloud.dgraph.io/graphql';

export const createApolloClient = (getIdTokenClaims: any) => {
  if (getIdTokenClaims == null) {
    return new ApolloClient({
      uri: GRAPHQL_ENDPOINT,
      cache: new InMemoryCache(),
    });
  }
  const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
  });
  const authLink = setContext(async (request, { headers }) => {
    const idTokenClaims = await getIdTokenClaims();
    // return the header to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        'X-Auth-Token': idTokenClaims.__raw,
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink as any),
    cache: new InMemoryCache(),
  });
};
