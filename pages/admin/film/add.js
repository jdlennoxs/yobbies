import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import MovieCard from "../../../components/movie-card";
import { useMovieDbFetch } from "../../../helpers/use-movie-db-fetch";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();
  console.log(router.query);

  const { id } = router.query;
  const { film, isLoading, isError } = useMovieDbFetch(id);
  // const film = { title: "yes" };
  if (film) {
    return <div className="container p-3 my-6 ">{JSON.stringify(film)}</div>;
  }
  return <></>;
}
