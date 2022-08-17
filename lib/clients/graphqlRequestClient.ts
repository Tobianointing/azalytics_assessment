import { GraphQLClient } from 'graphql-request';

const graphqlRequestClient = new GraphQLClient("https://analytics-api.herokuapp.com/analytics" as string, {});

export default graphqlRequestClient;