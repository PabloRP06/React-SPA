import { useState, useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(username);
    if (success) {
      navigate('/dashboard'); // Redirigir tras login exitoso
    } else {
      alert('Usuario incorrecto. Prueba con "admin"');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Usuario (admin)" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}