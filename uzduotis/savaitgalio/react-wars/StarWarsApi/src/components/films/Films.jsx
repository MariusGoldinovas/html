import './Films.css';

const Films = ({ films, onShowPeople }) => {

    const sortedFilms = films.sort((a, b) => a.release_date - b.release_date);

  return (
    <>
      <div className="films-container">
        {films.length > 0 ? (
          films.map((film) => (
            <div className="card" key={film.episode_id}>
              <div className="film-info">
                <h1>{film.title}</h1> {/* Film title */}
                <span>Released date: {film.release_date}</span> {/* Release date */}
                {/* Pass film ID to the handler on click */}
                <a href="#" onClick={() => onShowPeople(film.episode_id)}>Show people</a>
              </div>
              <div className="episode-id">
                {film.episode_id}
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default Films;
