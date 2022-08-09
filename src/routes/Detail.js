import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../routes/Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovies] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovies(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <strong className={styles.loader}>Loading...</strong>
      ) : (
        <div className={styles.movie__box}>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <small className={styles.up__load}>
            {movie.year}.{movie.rating}
          </small>
          <a href={movie.url}><h2 className={styles.title}>{movie.title}</h2></a>
          <ul className={styles.movie__genres}>
            {movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <p className={styles.summary}>{movie.description_intro}</p>
          <span>...</span>
        </div>
      )}
    </div>
  );
}

export default Detail;
