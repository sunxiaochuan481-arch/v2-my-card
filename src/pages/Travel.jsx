// 旅游页
import { useState } from 'react';
import MediaCard from '../components/Cards/MediaCard';
import MusicCard from '../components/Cards/MusicCard';
import RevealImage from '../components/Media/RevealImage';
import MediaModal from '../components/Modal/MediaModal';
import { travelData } from '../data/travelData';
import { musicData } from '../data/musicData';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import './Travel.css';

function Travel() {
  const [selectedTravel, setSelectedTravel] = useState(null);
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

  return (
    <div className="travel-page">
      <section className="page-shell travel-shell" aria-labelledby="travel-title">
        <header className="page-header">
          <p className="page-eyebrow">Travel Archive</p>
          <h1 id="travel-title" className="page-heading">旅游</h1>
          <p className="page-lede"></p>
        </header>

        <div className="page-board">
          <div>
            <div className="page-section-heading">
              <h2>日志</h2>
              <span>{travelData.length} places</span>
            </div>
            <div className="media-grid travel-media-grid">
              {travelData.map((travel) => (
                <MediaCard
                  key={travel.id}
                  title={travel.title}
                  imageUrl={travel.coverImage}
                  className="travel-media-card"
                  onClick={() => setSelectedTravel(travel)}
                />
              ))}
            </div>
          </div>

          <aside className="travel-music-panel" aria-label="旅行音乐">
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
        isOpen={Boolean(selectedTravel)}
        onClose={() => setSelectedTravel(null)}
        title={selectedTravel?.title}
      >
        <div className="travel-modal-gallery">
          {selectedTravel?.media?.map((item) => (
            <div key={item.id} className="travel-modal-item">
              {item.type === 'image' ? (
                <RevealImage src={item.url} alt={`${selectedTravel.title} 旅行图片`} />
              ) : (
                <video src={item.url} controls />
              )}
            </div>
          ))}
        </div>
        {selectedTravel && (
          <div className="travel-modal-copy">
            <span>{selectedTravel.location}</span>
          </div>
        )}
      </MediaModal>
    </div>
  );
}

export default Travel;
