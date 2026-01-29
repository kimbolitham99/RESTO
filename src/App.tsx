import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { PublicPage } from './pages/PublicPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  return (
    <AppProvider>
      {/* Menggunakan HashRouter alih-alih BrowserRouter untuk menghindari 
        error 404 pada GitHub Pages saat halaman di-refresh.
        URL akan menjadi: https://kimbolitham99.github.io/RESTO/#/admin
      */}
      <HashRouter>
        <Routes>
          {/* Rute untuk halaman utama pengunjung */}
          <Route path="/" element={<PublicPage />} />
          
          {/* Rute untuk panel admin dan fitur edit/tambah menu */}
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
