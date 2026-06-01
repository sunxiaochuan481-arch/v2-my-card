// 通用媒体卡片组件
import RevealImage from '../Media/RevealImage';
import './Cards.css';

function MediaCard({ 
  title, 
  description, 
  imageUrl, 
  onClick,
  className = '' 
}) {
  return (
    <div 
      className={`media-card ${className}`}
      onClick={onClick}
    >
      <div className="media-card-image">
        <RevealImage src={imageUrl} alt={title} variant="card" />
        <div className="media-card-overlay">
          <span className="media-card-play">▶</span>
        </div>
      </div>
      <div className="media-card-content">
        <h3 className="media-card-title">{title}</h3>
        {description && (
          <p className="media-card-description">{description}</p>
        )}
      </div>
    </div>
  );
}

export default MediaCard;
