import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import MarcarAtraso from './pages/MarcarAtraso.jsx';
import ListarAlumnos from './pages/ListaAlumnos.jsx';
import ProfesorPage from './pages/ProfesorPrincipalPage.jsx';
export default function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<MarcarAtraso />}/>
      <Route path='/login' element={<Login />} />   
      <Route path= '/lista' element = {<ListarAlumnos/>}/>     
      <Route path= '/profesorPage' element = {<ProfesorPage/>}/>           
      
    </Routes>
  );
}