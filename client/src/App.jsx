import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar.jsx';
import { NewSessionPage } from './pages/NewSessionPage.jsx';
import { MySessionsPage } from './pages/MySessionsPage.jsx';

export default function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<MySessionsPage />} />
          <Route path="/new" element={<NewSessionPage />} />
        </Routes>
      </main>
    </>
  );
}
