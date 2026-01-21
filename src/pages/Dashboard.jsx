import { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard Privado</h2>
      <p>Bienvenido, <strong>{user?.name}</strong>. Has accedido a una zona protegida.</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}