import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route path='/' />
      <Route path='/auth/login' element={<Login />} />
    </Routes>
  );
}