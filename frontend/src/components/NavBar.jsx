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

    function goHome() {
        navigate('/profesorPage');
    }
    function goHome1() {
        navigate('/');
    }
    function login() {
        navigate('/login');
    }
    function logout() {
        logoutAPI();
        setUser(null);
        navigate('/');
    }

    return (
        <nav className="navbar">
            <h1 className="navbar-logo">{letra}</h1>
            <div className="dropdowns">
                {rol === "" && (
                    <div className="dropdown">
                    <button className="navbar-button" onClick={goHome1}>Inicio</button>
                    </div>
                )}
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
                {rol === "Profesor" && (
                    <div className="dropdown">
                    <button className="navbar-button" onClick={goHome}>Inicio</button>
                    </div>
                )}
                {rol === "Profesor" && (
                    <div className="dropdown">
                        <button className="navbar-button" onClick={logout}>Cerrar sesión</button>
                    </div>
                )}
            </div>
        </nav>
    );
}
