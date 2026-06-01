// 影评页
import { useState } from 'react';
import MediaCard from '../components/Cards/MediaCard';
import MusicCard from '../components/Cards/MusicCard';
import RevealImage from '../components/Media/RevealImage';
import MediaModal from '../components/Modal/MediaModal';
import { reviewData } from '../data/reviewData';
import { musicData } from '../data/musicData';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import './Reviews.css';

function Reviews() {
  const [selectedReview, setSelectedReview] = useState(null);
  const {
    currentTrack,
    isPlaying,
    play,
    pause,
  } = useMusicPlayer();

  const handleMusicClick = (music) => {
    if (currentTrack?.id === music.id && isPlaying) {
      pause();
      return;
    }

    play(music);
  };

  const handleContentVideoPlay = () => {
    if (isPlaying) {
      pause();
    }
  };

  const renderReviewContent = (item) => {
    switch (item.type) {
      case 'heading':
        return (
          <h3 key={item.id} className="reviews-modal-heading">
            {item.text}
          </h3>
        );
      case 'paragraph':
        return (
          <p key={item.id} className="reviews-modal-paragraph">
            {item.text}
          </p>
        );
      case 'quote':
        return (
          <blockquote key={item.id} className="reviews-modal-quote">
            {item.text}
          </blockquote>
        );
      case 'image':
        return (
          <figure key={item.id} className="reviews-modal-media reviews-modal-media-image">
            <RevealImage src={item.url} alt={item.alt || selectedReview?.title || '影评图片'} />
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </figure>
        );
      case 'video':
        return (
          <figure key={item.id} className="reviews-modal-media reviews-modal-media-video">
            <video src={item.url} controls onPlay={handleContentVideoPlay} />
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </figure>
        );
      default:
        return null;
    }
  };

  return (
    <div className="reviews-page">
      <section className="page-shell" aria-labelledby="reviews-title">
        <header className="page-header">
          <p className="page-eyebrow">Cinema Journal</p>
          <h1 id="reviews-title" className="page-heading">影评</h1>
          <p className="page-lede"></p>
        </header>

        <div className="page-board">
          <div>
            <div className="page-section-heading">
              <h2>笔记</h2>
              <span>{reviewData.length} reviews</span>
            </div>
            <div className="media-grid reviews-grid">
              {reviewData.map((review) => (
                <MediaCard
                  key={review.id}
                  title={review.title}
                  description={review.description}
                  imageUrl={review.coverImage}
                  className="review-media-card"
                  onClick={() => setSelectedReview(review)}
                />
              ))}
            </div>
          </div>

          <aside className="reviews-music-panel" aria-label="影评音乐">
            <div className="page-section-heading">
              <h2>音乐</h2>
              <span>{currentTrack ? currentTrack.title : 'select'}</span>
            </div>
            <div className="music-stack">
              {musicData.map((music) => (
                <MusicCard
                  key={music.id}
                  title={music.title}
                  artist={music.artist}
                  coverImage={music.coverImage}
                  duration={music.duration}
                  isPlaying={currentTrack?.id === music.id && isPlaying}
                  onClick={() => handleMusicClick(music)}
                />
              ))}
            </div>
          </aside>
        </div>
      </section>

      <MediaModal
        isOpen={Boolean(selectedReview)}
        onClose={() => setSelectedReview(null)}
        title={selectedReview?.title}
      >
        <div className="reviews-modal-content">
          {selectedReview?.content?.map(renderReviewContent)}
        </div>
        {selectedReview && (
          <div className="reviews-modal-meta">
            <span>评分 {selectedReview.rating}</span>
            <span>{selectedReview.genre}</span>
            <span>{selectedReview.year}</span>
          </div>
        )}
      </MediaModal>
    </div>
  );
}

export default Reviews;
