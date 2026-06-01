// 音乐播放器组件
import { formatDuration } from '../../utils/contentHelpers';
import './MusicPlayer.css';

function MusicPlayer({
  track,
  isPlaying,
  currentTime,
  duration,
  onTogglePlay,
  onSeek,
  onClose,
}) {
  if (!track) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    onSeek(newTime);
  };

  return (
    <div className="music-player">
      <div className="music-player-cover">
        <img src={track.coverImage} alt={track.title} />
        <div className={`music-player-disc ${isPlaying ? 'playing' : ''}`}>
          <div className="music-player-disc-inner"></div>
        </div>
      </div>
      
      <div className="music-player-info">
        <h3 className="music-player-title">{track.title}</h3>
        <p className="music-player-artist">{track.artist}</p>
      </div>

      <div className="music-player-progress" onClick={handleProgressClick}>
        <div className="music-player-progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="music-player-time">
        <span>{formatDuration(currentTime)}</span>
        <span>{formatDuration(duration)}</span>
      </div>

      <div className="music-player-controls">
        <button className="music-player-btn" onClick={onTogglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="music-player-btn close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
