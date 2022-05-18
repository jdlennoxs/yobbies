import { ApolloClient, InMemoryCache } from "@apollo/client";

import config from "./src/aws-exports";

const endpoint = config.aws_cloud_logic_custom[0];

const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

export default client;
