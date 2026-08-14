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

const getViewport = () => {
  const documentElement = document.documentElement;

  return {
    width: Math.round(documentElement.clientWidth || window.innerWidth),
    height: Math.round(Math.max(
      documentElement.clientHeight,
      window.innerHeight,
      window.visualViewport?.height || 0,
    )),
  };
};

const getForcedLandscapeSize = (viewport) => {
  const viewportShortSide = Math.min(viewport.width, viewport.height);
  const viewportLongSide = Math.max(viewport.width, viewport.height);
  const screenShortSide = Math.min(window.screen.width, window.screen.height);
  const screenLongSide = Math.max(window.screen.width, window.screen.height);
  const screenRatio = screenShortSide > 0
    ? Math.min(Math.max(screenLongSide / screenShortSide, 1), 3)
    : 1;

  return {
    width: Math.ceil(Math.max(viewportLongSide, viewportShortSide * screenRatio)),
    height: Math.ceil(viewportShortSide),
  };
};

function MainLayout() {
  const [forcedLandscapeSize, setForcedLandscapeSize] = useState(null);
  const [viewport, setViewport] = useState(getViewport);
  const forceLandscape = Boolean(forcedLandscapeSize);

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

  useEffect(() => {
    if (!forceLandscape) return undefined;

    let orientationTimer;
    const releaseForcedLandscape = () => {
      const orientationType = window.screen.orientation?.type || '';
      const orientationAngle = Number(
        window.screen.orientation?.angle ?? window.orientation ?? 0,
      );
      const physicallyLandscape = orientationType.startsWith('landscape')
        || Math.abs(orientationAngle) % 180 === 90;

      if (!physicallyLandscape) return;

      window.clearTimeout(orientationTimer);
      orientationTimer = window.setTimeout(() => {
        setForcedLandscapeSize(null);
        setViewport(getViewport());
      }, 120);
    };

    window.addEventListener('orientationchange', releaseForcedLandscape);
    window.screen.orientation?.addEventListener('change', releaseForcedLandscape);

    return () => {
      window.clearTimeout(orientationTimer);
      window.removeEventListener('orientationchange', releaseForcedLandscape);
      window.screen.orientation?.removeEventListener('change', releaseForcedLandscape);
    };
  }, [forceLandscape]);

  const touchDevice = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
  const phoneSizedScreen = Math.min(window.screen.width, window.screen.height) <= 900;
  const portraitPhone = forceLandscape || (
    viewport.height >= viewport.width
    && (viewport.width <= 900 || (touchDevice && phoneSizedScreen))
  );
  const naturalPhoneLandscape = viewport.width > viewport.height && viewport.height <= 600;
  const useLandscapeView = naturalPhoneLandscape || forceLandscape;
  const compactLandscape = Math.max(viewport.width, viewport.height) <= 700;
  const landscapeWidth = forcedLandscapeSize?.width
    || Math.max(viewport.width, viewport.height);
  const landscapeHeight = forcedLandscapeSize?.height
    || Math.min(viewport.width, viewport.height);
  const enterForcedLandscape = () => {
    setForcedLandscapeSize(getForcedLandscapeSize(viewport));
  };
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
        <MobileOrientationNotice onEnterLandscape={enterForcedLandscape} />
        <Navbar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </MusicPlayerProvider>
  );
}

export default MainLayout;
