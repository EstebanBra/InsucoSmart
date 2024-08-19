import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import MarcarAtraso from './pages/MarcarAtraso.jsx';
import ListarAlumnos from './pages/ListaAlumnos.jsx';
export default function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<MarcarAtraso />}/>
      <Route path='/auth/login' element={<Login />} />   
      <Route path= '/lista' element = {<ListarAlumnos/>}/>           
    </Routes>
  );
}