export default function ActorCard({ actor, showCharacter }) {
  return (
    <div class="card">
      <div class="card-image">
        <img
          // style={{"object-fit": "cover", width: "150px"}}
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w342/${actor.profile_path}`
              : "/placeholder-person.png"
          }
          alt={actor.name}
        />
      </div>

      <div class="card-content">
        <div class="content">
          <p class="title is-5 has-text-white">{actor.name}</p>
          {showCharacter ? (
            <p class="subtitle is-6 has-text-light">{actor.character}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
