import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://2yxpm8hh84.execute-api.eu-west-2.amazonaws.com/prod/graphql",
  cache: new InMemoryCache(),
});

export default client;
