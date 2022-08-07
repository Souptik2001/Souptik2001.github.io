import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache: cache,
  uri: process.env.GRAPHQL_ENDPOINT,

  name: 'frontend-client',
  version: '1.3',
  queryDeduplication: false,
  skipSSLValidation: true,
  defaultOptions: {
	watchQuery: {
	  fetchPolicy: 'cache-and-network',
	},
  },
});

export default client;