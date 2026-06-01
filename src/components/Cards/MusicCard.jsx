// 音乐卡片组件
import './Cards.css';

function MusicCard({ 
  title, 
  artist,
  album,
  coverImage, 
  duration,
  isPlaying = false,
  onClick,
  className = '' 
}) {
  return (
    <div 
      className={`music-card ${isPlaying ? 'playing' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="music-card-cover">
        <img src={coverImage} alt={title} loading="lazy" />
        <div className={`music-card-icon ${isPlaying ? 'animate-pulse' : ''}`}>
          {isPlaying ? '🎵' : '▶'}
        </div>
      </div>
      <div className="music-card-content">
        <h4 className="music-card-title">{title}</h4>
        {artist && (
          <p className="music-card-artist">{artist}</p>
        )}
        {album && (
          <p className="music-card-album">{album}</p>
        )}
      </div>
      {duration && (
        <span className="music-card-duration">{duration}</span>
      )}
    </div>
  );
}

export default MusicCard;
