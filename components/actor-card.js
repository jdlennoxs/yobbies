export default function ActorCard({ name, subtitle, image, type, showSubtitle, unfix }) {
  let imagePath
  if (type === "actor" || type === "yob") {
    imagePath = image
      ? `https://image.tmdb.org/t/p/w342/${image}`
      : "/placeholder-person.png"
  } else if (type === "film") {
    imagePath = image.charAt(0) === "/"
      ?
      `https://image.tmdb.org/t/p/w342/${image}` :
      image
  }

  return (
    <div className="picture-card">
      <div className="card">
        {unfix ? (<div className="card-image-full">
          <img
            src={
              imagePath
            }
            alt={name}
          />
        </div>) : (
            <div className="card-image">
              <img
                src={
                  imagePath
                }
                alt={name}
              />
            </div>)}

        {name ? (
          <div className="card-content">
            <div className="content">
              <p className="title is-5 has-text-white">{name}</p>
              {showSubtitle ? (
                <p className="subtitle is-6 has-text-light">{subtitle}</p>
              ) : null}
            </div>
          </div>) : null}
      </div>
    </div >
  );
}
