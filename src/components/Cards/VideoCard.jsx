// 视频卡片组件
import RevealImage from '../Media/RevealImage';
import './Cards.css';

function VideoCard({ 
  title, 
  description, 
  thumbnail, 
  duration,
  views,
  onClick,
  className = '' 
}) {
  return (
    <div 
      className={`video-card ${className}`}
      onClick={onClick}
    >
      <div className="video-card-thumbnail">
        <RevealImage src={thumbnail} alt={title} variant="card" />
        <div className="video-card-overlay">
          <span className="video-card-play">▶</span>
        </div>
        {duration && (
          <span className="video-card-duration">{duration}</span>
        )}
      </div>
      <div className="video-card-content">
        <h3 className="video-card-title">{title}</h3>
        {description && (
          <p className="video-card-description">{description}</p>
        )}
        {views !== undefined && (
          <span className="video-card-views">{views.toLocaleString()} 次观看</span>
        )}
      </div>
    </div>
  );
}

export default VideoCard;
