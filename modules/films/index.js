import { useState } from "react";
import SearchFilm from "./search";
import AddFilm from "./add";

export default function FilmAdmin({}) {
  const [activeId, setActiveId] = useState();
  return (
    <>
      {activeId ? (
        <AddFilm id={activeId} setActiveId={setActiveId} />
      ) : (
        <SearchFilm setActiveId={setActiveId} />
      )}
    </>
  );
}
