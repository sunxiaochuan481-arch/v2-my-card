import { useLocation } from 'react-router-dom';
import './MobileOrientationNotice.css';

function MobileOrientationNotice() {
  const { pathname } = useLocation();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <aside className="mobile-orientation-notice" aria-label="手机横屏浏览提示">
      <div className="mobile-orientation-icon" aria-hidden="true">
        <span />
      </div>
      <strong>请横过手机浏览</strong>
      <p>横屏下会自动显示更接近电脑版的宽屏布局</p>
    </aside>
  );
}

export default MobileOrientationNotice;
