export default function ActorCard({
  name,
  subtitle,
  image,
  type,
  showSubtitle,
  unfix,
  winner,
}) {
  let imagePath;
  if (type === "actor") {
    imagePath = image
      ? `https://image.tmdb.org/t/p/w342/${image}`
      : "/placeholder-person.png";
  } else if (type === "film") {
    imagePath =
      image.charAt(0) === "/"
        ? `https://image.tmdb.org/t/p/w342/${image}`
        : image;
  } else {
    imagePath = image ? image : "/placeholder-person.png";
  }

  return (
    <div
      className="picture-card"
      style={{ boxShadow: winner ? "0px 0px 15px 1px #b88746" : "" }}
    >
      <div className="card" style={{ overflow: "hidden" }}>
        {unfix ? (
          <div className="card-image-full">
            <img src={imagePath} alt={name} />
          </div>
        ) : (
          <div className="card-image">
            <img src={imagePath} alt={name} />
          </div>
        )}

        {name ? (
          <div className="card-content">
            <div className="content">
              <p className="title is-5 has-text-white">{name}</p>
              {showSubtitle ? (
                <p className="subtitle is-6 has-text-light">{subtitle}</p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
