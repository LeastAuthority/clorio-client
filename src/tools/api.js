
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

const client = new ApolloClient({
  // uri: 'https://48p1r2roz4.sse.codesandbox.io',
  uri: 'https://minahub01.carbonara.science/v1/graphql',
  cache: new InMemoryCache()
});

const query = (queryText, callback) => client.query({
  query: gql`
    ${queryText}
  `
})
.then(callback);


export default {query,client};