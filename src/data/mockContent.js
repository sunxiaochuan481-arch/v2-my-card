// 通用的模拟数据
import { getAssetPath } from '../utils/getAssetPath';

export const avatarPlaceholder = getAssetPath('avatar/default-avatar.png');

// 通用卡片数据
export const genericCards = [
  {
    id: 1,
    title: '示例卡片 1',
    description: '这是一个示例卡片描述',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    title: '示例卡片 2',
    description: '这是一个示例卡片描述',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    createdAt: '2024-01-02',
  },
  {
    id: 3,
    title: '示例卡片 3',
    description: '这是一个示例卡片描述',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    createdAt: '2024-01-03',
  },
];

const mockContent = {
  avatarPlaceholder,
  genericCards,
};

export default mockContent;
