// 旅游数据
const travelFolders = [
  {
    id: 'beijing',
    title: '北京',
    coverImage: '/travel/beijing/cover.JPG',
    media: ['1.JPG', '2.JPG', '3.JPG'],
  },
  {
    id: 'chaoshan',
    title: '潮汕',
    coverImage: '/travel/chaoshan/cover.JPG',
    media: [],
  },
  {
    id: 'chongqing',
    title: '重庆',
    coverImage: '/travel/chongqing/cover.JPG',
    media: [],
  },
  {
    id: 'henan',
    title: '河南',
    coverImage: '/travel/henan/cover.jpg',
    media: [],
  },
  {
    id: 'shenzhen',
    title: '深圳',
    coverImage: '/travel/shenzhen/cover.JPG',
    media: [],
  },
];

export const travelData = travelFolders.map((folder, index) => ({
  id: folder.id,
  title: folder.title,
  coverImage: folder.coverImage,
  location: folder.title,
  media: (folder.media.length > 0 ? folder.media : [folder.coverImage.split('/').pop()]).map((fileName) => ({
    id: `${folder.id}-${fileName}`,
    type: 'image',
    url: `/travel/${folder.id}/${fileName}`,
  })),
  order: index + 1,
}));

export default travelData;
