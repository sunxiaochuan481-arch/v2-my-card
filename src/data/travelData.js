// 旅游数据
import { getAssetPath } from '../utils/getAssetPath';

const travelFolders = [
  {
    id: 'beijing',
    title: '北京',
    coverImage: 'cover.JPG',
    media: ['1.JPG', '2.JPG', '3.JPG'],
  },
  {
    id: 'chaoshan',
    title: '潮汕',
    coverImage: 'cover.JPG',
    media: [],
  },
  {
    id: 'chongqing',
    title: '重庆',
    coverImage: 'cover.JPG',
    media: [],
  },
  {
    id: 'henan',
    title: '河南',
    coverImage: 'cover.jpg',
    media: [],
  },
  {
    id: 'shenzhen',
    title: '深圳',
    coverImage: 'cover.JPG',
    media: [],
  },
];

export const travelData = travelFolders.map((folder, index) => ({
  id: folder.id,
  title: folder.title,
  coverImage: getAssetPath(`travel/${folder.id}/${folder.coverImage}`),
  location: folder.title,
  media: (folder.media.length > 0 ? folder.media : [folder.coverImage]).map((fileName) => ({
    id: `${folder.id}-${fileName}`,
    type: 'image',
    url: getAssetPath(`travel/${folder.id}/${fileName}`),
  })),
  order: index + 1,
}));

export default travelData;
