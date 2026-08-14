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

const getViewport = () => ({
  width: Math.round(window.visualViewport?.width || window.innerWidth),
  height: Math.round(window.visualViewport?.height || window.innerHeight),
});

function MainLayout() {
  const [forceLandscape, setForceLandscape] = useState(false);
  const [viewport, setViewport] = useState(getViewport);

  useEffect(() => {
    const updateViewport = () => {
      setViewport(getViewport());
    };

    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);
    window.visualViewport?.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
      window.visualViewport?.removeEventListener('resize', updateViewport);
    };
  }, []);

  const touchDevice = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
  const phoneSizedScreen = Math.min(window.screen.width, window.screen.height) <= 900;
  const portraitPhone = viewport.height >= viewport.width
    && (viewport.width <= 900 || (touchDevice && phoneSizedScreen));
  const naturalPhoneLandscape = viewport.width > viewport.height && viewport.height <= 600;
  const useLandscapeView = naturalPhoneLandscape || forceLandscape;
  const compactLandscape = Math.max(viewport.width, viewport.height) <= 700;
  const landscapeWidth = Math.max(viewport.width, viewport.height);
  const landscapeHeight = Math.min(viewport.width, viewport.height);
  const layoutClassName = [
    'main-layout',
    portraitPhone && 'mobile-portrait-view',
    useLandscapeView && 'mobile-landscape-view',
    forceLandscape && 'mobile-landscape-forced',
    useLandscapeView && compactLandscape && 'mobile-landscape-compact',
  ].filter(Boolean).join(' ');
  const layoutStyle = {
    '--mobile-landscape-width': `${landscapeWidth}px`,
    '--mobile-landscape-height': `${landscapeHeight}px`,
  };

  return (
    <MusicPlayerProvider>
      <div className={layoutClassName} style={layoutStyle}>
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
