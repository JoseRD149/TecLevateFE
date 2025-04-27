import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si hay usuario en localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log(storedUser); // Verifica lo que se encuentra en localStorage
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []); // Se ejecuta una sola vez al montar el componente

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  console.log(isLoggedIn, user); // Verifica el estado de isLoggedIn y user

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#007bff' }}>
      <div className="container">
        <Link className="navbar-brand text-white font-weight-bold" to="/">TecLevate</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white px-4 py-2" to="/courses">Cursos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-4 py-2" to="/projects">Proyectos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-4 py-2" to="/profile">Mi Perfil</Link>
            </li>

            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="btn btn-outline-light btn-sm ms-2" to="/login">Iniciar Sesión</Link>
              </li>
            ) : (
              <>
               <li className="nav-item">
                  <span className="navbar-text text-white px-4 py-2" style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                    Hola, <span style={{ color: '#ffdd57' }}>{user.name}</span>
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;