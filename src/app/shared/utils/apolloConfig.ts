/*
 * (C) Copyright 2020 Ashik Meerankutty.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Contributors:
 *     Ashik Meerankutty, Shamin Meerankutty
 */

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { createHttpLink } from 'apollo-link-http';

const GRAPHQL_ENDPOINT: string = process.env.SLASH_GRAPHQL_URL;

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
