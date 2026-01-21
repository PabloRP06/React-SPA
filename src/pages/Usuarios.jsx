import { useEffect, useState } from 'react';
import { getUsers } from '../services/api';

export default function Usuarios() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Llamada al servicio al cargar el componente
    getUsers().then(data => setUsers(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Usuarios (API Real)</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#f4f4f4' }}>
          <tr>
            <th style={{ padding: '10px' }}>Nombre</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={{ padding: '10px' }}>{user.name}</td>
              <td style={{ padding: '10px' }}>{user.email}</td>
              <td style={{ padding: '10px' }}>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}