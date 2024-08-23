import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import MarcarAtraso from './pages/MarcarAtraso.jsx';
import ListarAlumnos from './pages/ListaAlumnos.jsx';
import ListarAlumnosAlerta from './pages/ListaAlumnosAlerta.jsx';
import ProfesorPage from './pages/ProfesorPrincipalPage.jsx';
import CrearUsuario from './pages/CrearUsuario.jsx';
import ListarAcademicos from './pages/ListarAcademicos.jsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<MarcarAtraso />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/lista' element={<ListarAlumnos />}/>
      <Route path='/listar/academicos' element={<ListarAcademicos />}/>
      <Route path='/listaAlerta' element = {<ListarAlumnosAlerta/>}/>
      <Route path='/profesorPage' element = {<ProfesorPage/>}/>
      <Route path='/usuario/crear' element={<CrearUsuario />}/>
    </Routes>
  );
}