import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAPI } from '../services/auth.service';
import chevron from '../assets/chevron.svg';
import '../styles/navbar.css';

export default function NavBar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('usuario'));
        setUser(storedUser);
    }, []);
    
    let letra = '';
    let rol = '';
    if (user) {
        letra = user.nombre.charAt(0).toUpperCase();
        rol = user.rol;
    }

    function login() {
        navigate('/login');
    }
    async function logout() {
        await logoutAPI();
        setUser(null);
        navigate('/');
    }

    return (
        <nav className="navbar">
            <h1 className="navbar-logo">{letra}</h1>
            <div className="dropdowns">
                <div className="dropdown">
                    {rol === "Profesor" && (
                        <button className="navbar-button" onClick={() => {navigate('/profesorPage')}}>Inicio</button>
                    )}
                    {rol !== "" && rol !== "Profesor" && (
                        <button className="navbar-button" onClick={() => {navigate('/')}}>Inicio</button>
                    )}
                </div>
                {rol === "Administrador" && (
                    <div className="dropdown">
                        <button className='navbar-button'>
                            Administrar
                            <img src={chevron} alt="Expand admin tools menu" />
                        </button>
                        <div className="dropdown-menu">
                            <a href="/usuario/crear" className='navbar-button'>Crear usuario</a>
                            <a href="/admin/users" className='navbar-button'>Listar académicos</a>
                        </div>
                    </div>
                )}
                {rol === "" && (
                    <div className="dropdown">
                        <button className="navbar-button" onClick={login}>Iniciar sesión</button>
                    </div>
                )}
                {rol !== "" && (
                    <div className="dropdown">
                        <button className="navbar-button" onClick={logout}>Cerrar sesión</button>
                    </div>
                )}
            </div>
        </nav>
    );
}
