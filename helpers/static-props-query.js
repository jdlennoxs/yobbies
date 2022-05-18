import config from "../src/aws-exports";

const endpoint = config.aws_cloud_logic_custom[0];

export const query = (query) =>
  fetch("https://2yxpm8hh84.execute-api.eu-west-2.amazonaws.com/prod/graphql", {
    method: "POST",
    headers: {
      "X-Api-Key": process.env.LAMBDA_API_KEY,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);
