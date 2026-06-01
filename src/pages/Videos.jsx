// 视频页
import { useState } from 'react';
import VideoCard from '../components/Cards/VideoCard';
import MediaModal from '../components/Modal/MediaModal';
import { videoData } from '../data/videoData';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import './Videos.css';

function Videos() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { isPlaying, pause } = useMusicPlayer();

  const handleVideoPlay = () => {
    if (isPlaying) {
      pause();
    }
  };

  return (
    <div className="videos-page">
      <section className="page-shell" aria-labelledby="videos-title">
        <header className="page-header">
          <p className="page-eyebrow">Video Notes</p>
          <h1 id="videos-title" className="page-heading">视频</h1>
          <p className="page-lede"></p>
        </header>

        <div className="page-section-heading">
          <h2>录像带</h2>
          <span>{videoData.length} videos</span>
        </div>
        <div className="media-grid videos-grid">
          {videoData.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              description={video.description}
              thumbnail={video.thumbnail}
              duration={video.duration}
              views={video.views}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </div>
      </section>

      <MediaModal
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        title={selectedVideo?.title}
      >
        <div className="modal-video">
          <video src={selectedVideo?.videoUrl} controls onPlay={handleVideoPlay} />
        </div>
        {selectedVideo?.description && (
          <div className="modal-details">
            <p className="modal-description">{selectedVideo.description}</p>
          </div>
        )}
      </MediaModal>
    </div>
  );
}

export default Videos;
