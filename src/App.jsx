import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Travel from './pages/Travel';
import Reviews from './pages/Reviews';
import Admin from './pages/Admin';
import ContentEditor from './admin/ContentEditor';
import MusicEditor from './admin/MusicEditor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="videos" element={<Videos />} />
          <Route path="travel" element={<Travel />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/" replace />} />
          <Route path="videos" element={<ContentEditor type="video" />} />
          <Route path="travel" element={<ContentEditor type="travel" />} />
          <Route path="reviews" element={<ContentEditor type="review" />} />
          <Route path="music" element={<MusicEditor />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
