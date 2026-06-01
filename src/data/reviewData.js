// 影评数据
import { getAssetPath } from '../utils/getAssetPath';

export const reviewData = [
  {
    id: 'buzhibuxiu',
    title: '不止不休',
    description: '',
    coverImage: getAssetPath('reviews/buzhibuxiu/cover.jpg'),
    rating: 8.1,
    genre: '剧情',
    year: 2023,
    media: [
      { id: 'buzhibuxiu-cover', type: 'image', url: getAssetPath('reviews/buzhibuxiu/cover.jpg') },
    ],
    content: [
      { id: 'buzhibuxiu-heading', type: 'heading', text: '纸面上的理想主义' },
      { id: 'buzhibuxiu-p-1', type: 'paragraph', text: '它的质感并不锋利，却很适合放进这个影评页：人物、报纸、时代背景都带着一种旧胶片式的温度。' },
      { id: 'buzhibuxiu-image', type: 'image', url: getAssetPath('reviews/buzhibuxiu/cover.jpg'), alt: '不止不休 海报', caption: '本地真实素材：public/reviews/buzhibuxiu/cover.jpg' },
      { id: 'buzhibuxiu-quote', type: 'quote', text: '真正值得被记录的，不只是事件，也是一个人决定继续追问的时刻。' },
    ],
    review: '关于新闻理想、时代缝隙和个人选择的影像记录。',
    date: '2026-05-21',
  },
  {
    id: 'dianjuren2',
    title: '电锯人',
    description: '',
    coverImage: getAssetPath('reviews/dianjuren2/cover.jpg'),
    rating: 8.8,
    genre: '动画 / 漫画',
    year: 2021,
    media: [
      { id: 'dianjuren2-cover', type: 'image', url: getAssetPath('reviews/dianjuren2/cover.jpg') },
    ],
    content: [
      { id: 'dianjuren2-heading', type: 'heading', text: '高饱和的情绪切面' },
      { id: 'dianjuren2-p-1', type: 'paragraph', text: '这张素材更像是角色状态的切片：明亮、危险、带一点不稳定的青春感。它可以先作为电锯人相关内容的入口。' },
      { id: 'dianjuren2-image', type: 'image', url: getAssetPath('reviews/dianjuren2/cover.jpg'), alt: '电锯人 素材封面', caption: '本地真实素材：public/reviews/dianjuren2/cover.jpg' },
      { id: 'dianjuren2-quote', type: 'quote', text: '它不是冷静地讲故事，而是把冲动、欲望和空白一起推到画面前面。' },
    ],
    review: '用高对比色彩和角色姿态建立入口氛围。',
    date: '2026-05-21',
  },
  {
    id: 'langchao',
    title: '浪潮',
    description: '',
    coverImage: getAssetPath('reviews/langchao/cover.jpg'),
    rating: 8.7,
    genre: '剧情',
    year: 2008,
    media: [
      { id: 'langchao-cover', type: 'image', url: getAssetPath('reviews/langchao/cover.jpg') },
    ],
    content: [
      { id: 'langchao-heading', type: 'heading', text: '秩序如何变成浪潮' },
      { id: 'langchao-p-1', type: 'paragraph', text: '这类影像最有力量的地方，是它把宏大的社会问题压进一个具体的课堂实验里。秩序一旦有了诱惑，就很难只停留在规则层面。' },
      { id: 'langchao-image', type: 'image', url: getAssetPath('reviews/langchao/cover.jpg'), alt: '浪潮 海报', caption: '本地真实素材：public/reviews/langchao/cover.jpg' },
      { id: 'langchao-quote', type: 'quote', text: '危险往往不是突然降临，而是在每一次顺从中获得形状。' },
    ],
    review: '关于群体心理、权力结构和青年教育的警示文本。',
    date: '2026-05-21',
  },
  {
    id: 'leisaipian',
    title: '蕾塞篇',
    description: '',
    coverImage: getAssetPath('reviews/leisaipian/cover.jpg'),
    rating: 8.6,
    genre: '动画 / 漫画',
    year: 2025,
    media: [
      { id: 'leisaipian-cover', type: 'image', url: getAssetPath('reviews/leisaipian/cover.jpg') },
    ],
    content: [
      { id: 'leisaipian-heading', type: 'heading', text: '青春感与危险感' },
      { id: 'leisaipian-p-1', type: 'paragraph', text: '这张素材的气质很柔和，但人物关系里有一种随时会变调的张力。先作为蕾塞篇相关内容的视觉入口。' },
      { id: 'leisaipian-image', type: 'image', url: getAssetPath('reviews/leisaipian/cover.jpg'), alt: '蕾塞篇 素材图', caption: '本地真实素材：public/reviews/leisaipian/cover.jpg' },
      { id: 'leisaipian-quote', type: 'quote', text: '越像普通青春片的瞬间，越适合埋下危险。' },
    ],
    review: '以角色关系和画面明度建立轻与重之间的反差。',
    date: '2026-05-21',
  },
  {
    id: 'shenhai',
    title: '深海',
    description: '',
    coverImage: getAssetPath('reviews/shenhai/cover.jpg'),
    rating: 8.3,
    genre: '动画',
    year: 2023,
    media: [
      { id: 'shenhai-cover', type: 'image', url: getAssetPath('reviews/shenhai/cover.jpg') },
    ],
    content: [
      { id: 'shenhai-heading', type: 'heading', text: '色彩里的情绪深潜' },
      { id: 'shenhai-p-1', type: 'paragraph', text: '《深海》的素材天然适合暗色页面：高饱和的蓝、紫、白浪会在玻璃背景里形成很强的视觉中心。' },
      { id: 'shenhai-image', type: 'image', url: getAssetPath('reviews/shenhai/cover.jpg'), alt: '深海 海报', caption: '本地真实素材：public/reviews/shenhai/cover.jpg' },
      { id: 'shenhai-quote', type: 'quote', text: '它把情绪拍成海流，漂亮，也带着下沉感。' },
    ],
    review: '关于情绪、幻想和自我拯救的动画影像。',
    date: '2026-05-21',
  },
  {
    id: 'zhongguoqitan',
    title: '中国奇谭 2',
    description: '',
    coverImage: getAssetPath('reviews/zhongguoqitan/cover.jpg'),
    rating: 8.5,
    genre: '动画',
    year: 2026,
    media: [
      { id: 'zhongguoqitan-cover', type: 'image', url: getAssetPath('reviews/zhongguoqitan/cover.jpg') },
    ],
    content: [
      { id: 'zhongguoqitan-heading', type: 'heading', text: '民间想象的暗面' },
      { id: 'zhongguoqitan-p-1', type: 'paragraph', text: '这张海报的水墨气质很适合当前页面的暗色系统。它没有强烈的商业海报感，更像一个故事入口。' },
      { id: 'zhongguoqitan-image', type: 'image', url: getAssetPath('reviews/zhongguoqitan/cover.jpg'), alt: '中国奇谭 2 海报', caption: '本地真实素材：public/reviews/zhongguoqitan/cover.jpg' },
      { id: 'zhongguoqitan-quote', type: 'quote', text: '奇谭的迷人之处，是它总让熟悉的东西变得陌生。' },
    ],
    review: '以民间叙事和现代动画语言组成的短片入口。',
    date: '2026-05-21',
  },
];

export default reviewData;
