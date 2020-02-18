import { ApolloClient, ApolloQueryResult } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';

const token = '13a25671e70de0f4c8b9fc478118468504e60733';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: Object.assign(
      headers || {},
      {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    )
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: 'no-cache',
  //   },
  // },
  link: authLink.concat(httpLink),
});

const query = (query: string):Promise<ApolloQueryResult<any>> => {
  return client.query({
    query: gql(query)
  })
}

export { query }
