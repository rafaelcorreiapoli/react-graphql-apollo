import ApolloClient, { createNetworkInterface } from 'apollo-client';

export default new ApolloClient({
  networkInterface: createNetworkInterface('http://localhost:8080/graphql'),
  dataIdFromObject: o => o.id,
});
