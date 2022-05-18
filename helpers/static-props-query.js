import config from "../src/aws-exports";

const { endpoint } = config.aws_cloud_logic_custom[0];

export const query = (query) =>
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);
