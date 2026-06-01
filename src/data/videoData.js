// 视频数据
const videoFolders = [
  {
    id: 'guai',
    title: '噢 乖',
    videoFile: 'vedio.mp4',
  },
  {
    id: 'guanggao-kehua',
    title: '广告 如有神助',
    videoFile: 'video.mp4',
  },
  {
    id: 'guanggao-kuihua',
    title: '广告 胃康灵胶囊',
    videoFile: 'video.mp4',
  },
  {
    id: 'yuanfangbi',
    title: '圆方之比 天地之合',
    videoFile: 'video.mp4',
  },
];

export const videoData = videoFolders.map((folder, index) => ({
  id: folder.id,
  title: folder.title,
  description: '',
  thumbnail: `/videos/${folder.id}/cover.png`,
  videoUrl: `/videos/${folder.id}/${folder.videoFile}`,
  order: index + 1,
}));

export default videoData;
