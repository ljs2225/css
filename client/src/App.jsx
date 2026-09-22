import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { NewStudentPage } from './pages/NewStudentPage.jsx';
import { NewSessionPage } from './pages/NewSessionPage.jsx';

export default function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/students/new" element={<NewStudentPage />} />
          <Route path="/sessions/new" element={<NewSessionPage />} />
        </Routes>
      </main>
    </>
  );
}
