// Video player component for displaying movie trailers
import { useMovieContext } from "../contexts/MovieContext";
import "../css/VideoPlayer.css";

export default function VideoPlayer() {
  const { currentVideo, showPlayer, closePlayer } = useMovieContext();

  if (!showPlayer || !currentVideo) return null;

  return (
    <div className="video-player-overlay">
      <div className="video-player-container">
        <button className="close-btn" onClick={closePlayer}>
          ×
        </button>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${currentVideo.key}`}
          title={currentVideo.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
