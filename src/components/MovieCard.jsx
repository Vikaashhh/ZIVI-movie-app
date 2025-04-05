import "../css/MovieCard.css";
// Card component for displaying movie information and interactions
import { useMovieContext } from "../contexts/MovieContext";
import { getMovieVideos, getWatchProviders } from "../services/api";
import { useState } from "react";

function MovieCard({ movie }) {
  const { isFavorites, addToFavorites, removeFromFavorites, playVideo } =
    useMovieContext();
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState([]);
  const [showProviders, setShowProviders] = useState(false);
  const favorite = isFavorites(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  async function onPlayClick(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const videos = await getMovieVideos(movie.id);
      const trailer = videos.find(video => video.type === "Trailer");
      if (trailer) playVideo(trailer);
    } finally {
      setLoading(false);
    }
  }

  async function onWatchClick(e) {
    e.preventDefault();
    if (providers.length === 0) {
      const providers = await getWatchProviders(movie.id);
      setProviders(providers);
    }
    setShowProviders(!showProviders);
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
          <button
            className="play-btn"
            onClick={onPlayClick}
            disabled={loading}
          >
            {loading ? '...' : '▶'}
          </button>
          <button
            className="watch-btn"
            onClick={onWatchClick}
          >
            Watch
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>{movie.release_date?.split("-")[0]}</p>
        {showProviders && (
          <div className="providers">
            {providers.length > 0 ? (
              providers.map(provider => (
                <a 
                  key={provider.provider_id}
                  href={`https://www.themoviedb.org/movie/${movie.id}/watch`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="provider"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                  />
                </a>
              ))
            ) : (
              <p className="no-providers">No streaming providers available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
