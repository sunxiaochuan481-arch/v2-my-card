// 开发者后台入口页
import { Link } from 'react-router-dom';
import './Admin.css';

function Admin() {
  const adminSections = [
    {
      title: '视频管理',
      description: '添加、编辑、删除视频内容',
      icon: '🎬',
      path: '/admin/videos',
    },
    {
      title: '旅游管理',
      description: '管理旅游目的地和游记',
      icon: '✈️',
      path: '/admin/travel',
    },
    {
      title: '影评管理',
      description: '管理电影评论和评分',
      icon: '🎥',
      path: '/admin/reviews',
    },
    {
      title: '音乐管理',
      description: '管理音乐库和播放列表',
      icon: '🎵',
      path: '/admin/music',
    },
  ];

  return (
    <div className="admin-dashboard">
      <h1 className="page-title">管理后台</h1>
      
      <div className="admin-grid">
        {adminSections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className="admin-section-card"
          >
            <span className="admin-section-icon">{section.icon}</span>
            <h2 className="admin-section-title">{section.title}</h2>
            <p className="admin-section-description">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Admin;
