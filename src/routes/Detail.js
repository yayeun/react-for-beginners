import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [movie, setMoives] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMoives(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Link to="/">Back page</Link>
          <img src={movie.large_cover_image} />
          <h1>{movie.title}</h1>
          <ul>
            {movie.genres.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
          <p>{movie.description_intro}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
