// 全局音乐播放器状态管理
import {
  createElement,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

const MusicPlayerContext = createContext(null);

function useMusicPlayerState() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);

  const play = useCallback(async (track) => {
    if (!audioRef.current) return;

    if (currentTrack?.id !== track.id) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.currentTime = 0;
      setCurrentTrack(track);
      setCurrentTime(0);
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [currentTrack?.id]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
      return;
    }

    if (currentTrack) {
      play(currentTrack);
    }
  }, [currentTrack, isPlaying, pause, play]);

  const stop = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const seek = useCallback((time) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const changeVolume = useCallback((newVolume) => {
    if (!audioRef.current) return;

    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  return useMemo(() => ({
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    audioRef,
    play,
    pause,
    togglePlay,
    stop,
    seek,
    changeVolume,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
  }), [
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    play,
    pause,
    togglePlay,
    stop,
    seek,
    changeVolume,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
  ]);
}

export function MusicPlayerProvider({ children }) {
  const player = useMusicPlayerState();

  return createElement(
    MusicPlayerContext.Provider,
    { value: player },
    children,
    createElement('audio', {
      ref: player.audioRef,
      onEnded: player.handleEnded,
      onLoadedMetadata: player.handleLoadedMetadata,
      onTimeUpdate: player.handleTimeUpdate,
    }),
  );
}

export function useMusicPlayer() {
  const player = useContext(MusicPlayerContext);

  if (!player) {
    throw new Error('useMusicPlayer must be used inside MusicPlayerProvider');
  }

  return player;
}

export default useMusicPlayer;
