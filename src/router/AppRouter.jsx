import { lazy, Suspense, useContext } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

// Páginas con carga normal
import Home from '../pages/Home';
import Login from '../pages/Login';

// Páginas con Lazy Loading
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Usuarios = lazy(() => import('../pages/Usuarios'));

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default function AppRouter() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <nav style={{ padding: '1rem', background: '#222', color: '#fff', display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white' }}>Home</Link>
        <Link to="/usuarios" style={{ color: 'white' }}>Usuarios</Link>
        {!user ? (
          <Link to="/login" style={{ color: 'white' }}>Login</Link>
        ) : (
          <>
            <Link to="/dashboard" style={{ color: 'white' }}>Dashboard</Link>
            <button onClick={logout} style={{ marginLeft: 'auto' }}>Cerrar Sesión</button>
          </>
        )}
      </nav>

      <div style={{ padding: '20px' }}>
        <Suspense fallback={<div>Cargando sección...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/usuarios" element={<Usuarios />} />
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