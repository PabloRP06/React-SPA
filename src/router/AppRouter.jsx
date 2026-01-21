import { lazy, Suspense, useContext } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

// Páginas con carga normal
import Home from '../pages/Home';
import Login from '../pages/Login';

// Páginas con Lazy Loading
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Usuarios = lazy(() => import('../pages/Usuarios'));

// Componente para proteger rutas privadas
function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
}

// Componente para evitar que usuarios logueados entren al Login
function PublicRoute({ children }) {
    const { user } = useContext(AuthContext);
    return !user ? children : <Navigate to="/dashboard" />;
}

export default function AppRouter() {
    const { user, logout } = useContext(AuthContext);

    return (
        <>
            <nav style={{ padding: '1rem', background: '#222', color: '#fff', display: 'flex', gap: '15px', alignItems: 'center' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                <Link to="/usuarios" style={{ color: 'white', textDecoration: 'none' }}>Usuarios</Link>
                
                {/* Lógica condicional para el menú */}
                {!user ? (
                    <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                ) : (
                    <>
                        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
                        <span style={{ fontSize: '0.8rem', color: '#aaa' }}>| Hola, {user.name}</span>
                        <button 
                            onClick={logout} 
                            style={{ marginLeft: 'auto', background: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Cerrar Sesión
                        </button>
                    </>
                )}
            </nav>

            <div style={{ padding: '20px' }}>
                <Suspense fallback={<div>Cargando sección...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        
                        {/* Redirigimos al Dashboard si ya está logueado y va a /login */}
                        <Route path="/login" element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        } />
                        
                        <Route path="/usuarios" element={<Usuarios />} />
                        
                        {/* Ruta protegida */}
                        <Route path="/dashboard" element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } />
                    </Routes>
                </Suspense>
            </div>
        </>
    );
}