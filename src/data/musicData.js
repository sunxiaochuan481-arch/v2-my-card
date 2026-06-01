// 音乐数据
import { getAssetPath } from '../utils/getAssetPath';

export const musicData = [
  {
    id: 'katana-zero',
    title: 'Katana Zero (Ost-Version)',
    artist: 'Various Artists',
    album: 'Katana Zero (Original Soundtrack)',
    coverImage: getAssetPath('music/01%20Katana%20Zero/cover.png'),
    audioUrl: getAssetPath('music/01%20Katana%20Zero/music.mp3'),
    duration: '5:48',
  },
  {
    id: 'tank',
    title: 'Tank!',
    artist: '菅野よう子',
    album: 'COWBOY BEBOP (Original Motion Picture Soundtrack)',
    coverImage: getAssetPath('music/02%20Tank!/cover.png'),
    audioUrl: getAssetPath('music/02%20Tank!/music.mp3'),
    duration: '3:30',
  },
  {
    id: 'floating-museum',
    title: 'M08 Floating Museum',
    artist: '川井憲次',
    album: 'GHOST IN THE SHELL/攻殻機動隊 オリジナル・サウンドトラック',
    coverImage: getAssetPath('music/03%20M08%20Floating%20Museum/cover.jpg'),
    audioUrl: getAssetPath('music/03%20M08%20Floating%20Museum/music.mp3'),
    duration: '5:03',
  },
  {
    id: 'the-sun-also-rises',
    title: 'The Sun Also Rises',
    artist: '久石譲',
    album: 'The Sun Also Rises (Original Motion Picture Soundtrack)',
    coverImage: getAssetPath('music/04%20The%20Sun%20Also%20Rises/cover.png'),
    audioUrl: getAssetPath('music/04%20The%20Sun%20Also%20Rises/%E4%B9%85%E7%9F%B3%E8%AD%B2%20-%20The%20Sun%20Also%20Rises.mp3'),
    duration: '3:44',
  },
  {
    id: 'kaneda',
    title: 'kaneda',
    artist: '芸能山城组',
    album: 'Akira - Original Motion Picture Soundtrack',
    coverImage: getAssetPath('music/05%20kaneda/cover.jpg'),
    audioUrl: getAssetPath('music/05%20kaneda/music.mp3'),
    duration: '3:10',
  },
  {
    id: 'invincible',
    title: 'Invincible Main Theme (Remix)',
    artist: 'Musicality',
    album: 'Invincible Main Theme (Remix)',
    coverImage: getAssetPath('music/06%20Invincible/cover.jpg'),
    audioUrl: getAssetPath('music/06%20Invincible/music.mp3'),
    duration: '2:45',
  },
  {
    id: 'digital-road',
    title: 'Digital Road',
    artist: 'Violation Drive',
    album: 'Digital Road',
    coverImage: getAssetPath('music/07%20Digital%20Road/cover.jpg'),
    audioUrl: getAssetPath('music/07%20Digital%20Road/music.mp3'),
    duration: '3:21',
  },
];

export default musicData;
