export const getFilmsByYear = ({ movies, yobs, history }) => {
  return history.map((yob) => ({
    id: yob.name,
    data: yob.filmChosenBy.map((film) => ({
      x: film.order,
      title: film.title,
      slug: film.slug,
      y: parseInt(film.release_date.substring(0, 4)),
      z: film.runtime,
    })),
  }));
};

export const getFilmsPerCountry = ({ countries }) => {
  return countries.map((country) => ({
    id: country.iso,
    value: country.filmOriginAggregate.count,
  }));
};
