// 管理员布局组件
import { Outlet, Link, useLocation } from 'react-router-dom';
import './AdminLayout.css';

const adminNavItems = [
  { path: '/admin', label: '仪表盘', icon: '📊' },
  { path: '/admin/videos', label: '视频管理', icon: '🎬' },
  { path: '/admin/travel', label: '旅游管理', icon: '✈️' },
  { path: '/admin/reviews', label: '影评管理', icon: '🎥' },
  { path: '/admin/music', label: '音乐管理', icon: '🎵' },
];

function AdminLayout() {
  const location = useLocation();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>管理后台</h2>
        </div>
        <nav className="admin-nav">
          {adminNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span className="admin-nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-nav-item">
            <span className="admin-nav-icon">🏠</span>
            <span className="admin-nav-label">返回首页</span>
          </Link>
        </div>
      </aside>
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
