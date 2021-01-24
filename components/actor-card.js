export default function ActorCard({ name, subtitle, image, type, showSubtitle }) {
  let imagePath
  if (type === "actor") {
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
    <div class="card">
      <div class="card-image">
        <img
          src={
            imagePath
          }
          alt={name}
        />
      </div>

      {name ? (
        <div class="card-content">
          <div class="content">
            <p class="title is-5 has-text-white">{name}</p>
            {showSubtitle ? (
              <p class="subtitle is-6 has-text-light">{subtitle}</p>
            ) : null}
          </div>
        </div>) : null}
    </div>
  );
}
