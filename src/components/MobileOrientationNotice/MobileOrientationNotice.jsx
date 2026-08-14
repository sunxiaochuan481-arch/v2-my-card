import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MobileOrientationNotice.css';

function MobileOrientationNotice() {
  const { pathname } = useLocation();
  const [requestState, setRequestState] = useState('idle');

  const handleEnterLandscape = async () => {
    const page = document.documentElement;
    let enteredFullscreen = false;

    setRequestState('requesting');

    try {
      if (!document.fullscreenElement) {
        if (typeof page.requestFullscreen !== 'function') {
          throw new Error('Fullscreen is not supported');
        }

        await page.requestFullscreen();
        enteredFullscreen = true;
      }

      if (typeof window.screen.orientation?.lock !== 'function') {
        throw new Error('Orientation lock is not supported');
      }

      await window.screen.orientation.lock('landscape');
      setRequestState('idle');
    } catch {
      if (
        enteredFullscreen
        && document.fullscreenElement
        && typeof document.exitFullscreen === 'function'
      ) {
        await document.exitFullscreen().catch(() => {});
      }

      setRequestState('idle');
    }
  };

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <aside className="mobile-orientation-notice" aria-label="手机横屏浏览提示">
      <button
        type="button"
        className="mobile-orientation-trigger"
        onClick={handleEnterLandscape}
        disabled={requestState === 'requesting'}
        aria-label="点击进入横屏"
      >
        <svg
          className="mobile-orientation-cue"
          viewBox="0 0 132 68"
          aria-hidden="true"
        >
          <path
            id="orientation-cue-path"
            className="mobile-orientation-cue-line"
            d="M8 15 C19 0 36 2 42 18"
          />
          <path
            className="mobile-orientation-cue-line"
            d="M34 15 L43 19 L39 10"
          />
          <text className="mobile-orientation-cue-text" dy="-3">
            <textPath href="#orientation-cue-path" startOffset="14%">
              点击
            </textPath>
          </text>
        </svg>
        <span className="mobile-orientation-icon" aria-hidden="true">
          <span />
        </span>
      </button>
      <strong>请横过手机浏览</strong>
      <p className="mobile-orientation-description">
        横屏下会自动显示更接近电脑版的宽屏布局
      </p>
    </aside>
  );
}

export default MobileOrientationNotice;
