import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import MarcarAtraso from './pages/MarcarAtraso.jsx';
export default function AppRouter() {
  return (
    <Routes>
      <Route path='/' />
      <Route path='/auth/login' element={<Login />} />              
      <Route path='/marcarAtraso' element={<MarcarAtraso />} />
    </Routes>
  );
}