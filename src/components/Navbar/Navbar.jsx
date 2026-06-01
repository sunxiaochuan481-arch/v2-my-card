import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navItems = [
  { path: '/', label: '首页' },
  { path: '/videos', label: '视频' },
  { path: '/travel', label: '旅游' },
  { path: '/reviews', label: '影评' },
];

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            MY CARD
          </Link>
        </div>
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.path} className="navbar-item">
              <Link
                to={item.path}
                className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="navbar-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/admin"
          className={`navbar-developer ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
        >
          开发者
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
