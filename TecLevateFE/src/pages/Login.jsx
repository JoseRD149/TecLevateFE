import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Login.css'; 

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login({ email, password });
      const user = result.user; 
      const company = result.company; 
      console.log('Usuario recibido:', user);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('¡Bienvenido de nuevo!', { position: 'top-right' });
        navigate('/profile');
      } else {
        throw new Error('Datos inválidos recibidos del servidor');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        toast.error(err.response.data.message, { position: 'top-right' });
      } else {
        setError('Contraseña errónea');
        toast.error('Contraseña errónea', { position: 'top-right' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    if (error) setError('');
    if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else if (e.target.id === 'password') {
      setPassword(e.target.value);
    }
  };

  return (
    <div className="login-container">
      <img 
        src="src/assets/logo-teclevate.png" 
        alt="Logo" 
        className="login-logo"
      />
      
      <div className="login-content">
        <div className="login-card">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Entrar'}
              </button>
            </div>

            <div className="text-center mt-3">
              <span>No tienes cuenta? </span>
              <a href="/register">Registrate aquí</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
