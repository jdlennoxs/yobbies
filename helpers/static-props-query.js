export const query = (query) =>
  fetch("https://2yxpm8hh84.execute-api.eu-west-2.amazonaws.com/prod/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);
