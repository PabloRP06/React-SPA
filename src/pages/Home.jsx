import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Bienvenido a la SPA con React</h1>
      <p>
        Esta aplicación demuestra el uso de <strong>rutas protegidas</strong>, 
        <strong> estado global</strong> y consumo de <strong>APIs externas</strong>.
      </p>
      
      <div style={{ marginTop: '30px' }}>
        <h3>¿Qué quieres hacer hoy?</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Link to="/login">
            <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
              Ir al Login
            </button>
          </Link>
          <Link to="/usuarios">
            <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
              Ver Usuarios (Pública)
            </button>
          </Link>
        </div>
      </div>

      <footer style={{ marginTop: '50px', fontSize: '0.8rem', color: '#666' }}>
        <p>Desarrollado como práctica de Situación de Aprendizaje - Sesión 1 y 2</p>
      </footer>
    </div>
  );
}