// 主布局组件
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import MobileOrientationNotice from '../components/MobileOrientationNotice/MobileOrientationNotice';
import { BackgroundGlowGroup } from '../components/Background/BackgroundGlow';
import DataRainAccent from '../components/Background/DataRainAccent';
import { MusicPlayerProvider } from '../hooks/useMusicPlayer';
import '../styles/global.css';
import '../styles/layout.css';
import '../styles/mobile-landscape.css';

function MainLayout() {
  const [forceLandscape, setForceLandscape] = useState(false);
  const [viewport, setViewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  const naturalPhoneLandscape = viewport.width > viewport.height && viewport.height <= 600;
  const useLandscapeView = naturalPhoneLandscape || forceLandscape;
  const compactLandscape = Math.max(viewport.width, viewport.height) <= 700;
  const layoutClassName = [
    'main-layout',
    useLandscapeView && 'mobile-landscape-view',
    forceLandscape && 'mobile-landscape-forced',
    useLandscapeView && compactLandscape && 'mobile-landscape-compact',
  ].filter(Boolean).join(' ');

  return (
    <MusicPlayerProvider>
      <div className={layoutClassName}>
        <BackgroundGlowGroup />
        <DataRainAccent />
        <MobileOrientationNotice onEnterLandscape={() => setForceLandscape(true)} />
        <Navbar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </MusicPlayerProvider>
  );
}

export default MainLayout;
