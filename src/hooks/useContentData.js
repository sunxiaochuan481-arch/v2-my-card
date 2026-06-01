// 内容数据管理 hook
import { useState, useCallback } from 'react';
import { videoData } from '../data/videoData';
import { travelData } from '../data/travelData';
import { reviewData } from '../data/reviewData';
import { musicData } from '../data/musicData';

export function useContentData() {
  const [videos] = useState(videoData);
  const [travels] = useState(travelData);
  const [reviews] = useState(reviewData);
  const [musics] = useState(musicData);

  // 获取视频列表
  const getVideos = useCallback(() => {
    return videos;
  }, [videos]);

  // 获取旅游列表
  const getTravels = useCallback(() => {
    return travels;
  }, [travels]);

  // 获取影评列表
  const getReviews = useCallback(() => {
    return reviews;
  }, [reviews]);

  // 获取音乐列表
  const getMusics = useCallback(() => {
    return musics;
  }, [musics]);

  // 根据ID获取单个内容
  const getVideoById = useCallback((id) => {
    return videos.find(v => v.id === id);
  }, [videos]);

  const getTravelById = useCallback((id) => {
    return travels.find(t => t.id === id);
  }, [travels]);

  const getReviewById = useCallback((id) => {
    return reviews.find(r => r.id === id);
  }, [reviews]);

  const getMusicById = useCallback((id) => {
    return musics.find(m => m.id === id);
  }, [musics]);

  return {
    videos,
    travels,
    reviews,
    musics,
    getVideos,
    getTravels,
    getReviews,
    getMusics,
    getVideoById,
    getTravelById,
    getReviewById,
    getMusicById,
  };
}

export default useContentData;
