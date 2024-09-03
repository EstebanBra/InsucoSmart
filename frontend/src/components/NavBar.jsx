import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAPI } from '../services/auth.service';
import chevron from '../assets/chevron.svg';
import '../styles/navbar.css';

export default function NavBar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mostrarTareasAdministrar, setMostrarTareasAdministrar] = useState(false);
    const [showSettingsTasks, setShowSettingsTasks] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('usuario'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const letra = user?.nombre?.charAt(0).toUpperCase() || '';
    const rol = user?.rol || '';

    const login = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    const logout = useCallback(async () => {
        await logoutAPI();
        setUser(null);
        navigate('/');
    }, [navigate]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        setMostrarTareasAdministrar(false);
        setShowSettingsTasks(false);
    };

    const toggleProfileTasks = () => {
        setMostrarTareasAdministrar(!mostrarTareasAdministrar);
        setShowSettingsTasks(false); // Ocultar la otra lista si está visible
    };

    const toggleSettingsTasks = () => {
        setShowSettingsTasks(!showSettingsTasks);
        setMostrarTareasAdministrar(false); // Ocultar la otra lista si está visible
    };

    return (
        <>
            <nav className="navbar">
                {user && (
                    <button className="navbar-sidebar-toggle" onClick={toggleSidebar}>
                        ☰
                    </button>
                )}
                <h1 className="navbar-logo">{letra}</h1>
                <div className="dropdowns">
                    <div className="dropdown">
                        <button className="navbar-button" onClick={() => { navigate(rol === "Profesor" ? '/profesorPage' : '/') }}>
                            Inicio
                        </button>
                    </div>
                    {!rol && (
                        <div className="dropdown">
                            <button className="navbar-button" onClick={login}>Iniciar sesión</button>
                        </div>
                    )}
                    {rol && (
                        <div className="dropdown">
                            <button className="navbar-button" onClick={logout}>Cerrar sesión</button>
                        </div>
                    )}
                </div>
            </nav>

            {user && (
                <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                    {rol === "Administrador" && (
                        <>
                            <button onClick={toggleProfileTasks}>Administrar</button>
                            {mostrarTareasAdministrar && (
                                <div className="tasks-list">
                                    <button onClick={() => navigate("/usuario/crear")}>Crear Usuario</button>
                                    <button onClick={() => navigate("/listar/academicos")}>Listar académicos</button>
                                </div>
                            )}
                        </>
                    )}

                    {rol === "Alumno" && (
                        <>
                            <button onClick={toggleSettingsTasks}>Acciones</button>
                            {showSettingsTasks && (
                                <div className="tasks-list">
                                    <button onClick={() => navigate('/listaAtrasos')}>Ver tus atrasos</button>
                                    <button onClick={() => navigate('/ingresarJustificativo')}>Ingresar Justificativo</button>
                                    {/* Agrega más tareas aquí */}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    );
}
