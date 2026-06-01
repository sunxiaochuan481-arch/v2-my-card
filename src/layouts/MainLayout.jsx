// 主布局组件
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { BackgroundGlowGroup } from '../components/Background/BackgroundGlow';
import DataRainAccent from '../components/Background/DataRainAccent';
import { MusicPlayerProvider } from '../hooks/useMusicPlayer';
import '../styles/global.css';
import '../styles/layout.css';

function MainLayout() {
  return (
    <MusicPlayerProvider>
      <div className="main-layout">
        <BackgroundGlowGroup />
        <DataRainAccent />
        <Navbar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </MusicPlayerProvider>
  );
}

export default MainLayout;
