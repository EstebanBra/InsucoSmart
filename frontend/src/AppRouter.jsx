import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import MarcarAtraso from './pages/MarcarAtraso.jsx';
import NavBar from './components/NavBar.jsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<MarcarAtraso />}/>
      <Route path='/auth/login' element={<Login />} />              
    </Routes>
  );
}