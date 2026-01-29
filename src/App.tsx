import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { PublicPage } from './pages/PublicPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  return (
    <AppProvider>
      {/* Menambahkan basename="/RESTO" sangat penting karena website Anda 
        berada di sub-folder kimbolitham99.github.io/RESTO/ 
      */}
      <BrowserRouter basename="/RESTO">
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
