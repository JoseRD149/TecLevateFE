import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [hasCompany, setHasCompany] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
      if (storedUser.company_id) {
        setHasCompany(true);
      } else {
        setHasCompany(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setHasCompany(false);
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top"
      style={{ backgroundColor: "#1c1c2c" }}
    >
      <div className="container">
        <Link className="navbar-brand text-white font-weight-bold" to="/">
          <img
            src="src/assets/logo-teclevate.png"
            alt="Logo"
            style={{ height: "90px" }}
          />{" "}
        </Link>
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
            {/* Rutas principales */}
            <li className="nav-item">
              <Link className="nav-link text-white px-4 py-2" to="/courses">
                Cursos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-4 py-2" to="/projects">
                Proyectos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-4 py-2" to="/profile">
                Mi Perfil
              </Link>
            </li>
            {/* Mostrar "Dashboard de la Empresa" solo si el usuario tiene un company_id */}
            {hasCompany && (
              <li className="nav-item">
                <Link
                  className="nav-link text-white px-4 py-2"
                  to="/company-dashboard"
                >
                  Dashboard de la Empresa
                </Link>
              </li>
            )}
            {/* Nuevas rutas de gestión
            <li className="nav-item">
              <Link className="nav-link text-white px-4 py-2" to="/list-courses">📚 Listar Cursos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-4 py-2" to="/list-projects">🛠️ Listar Proyectos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-4 py-2" to="/list-joboffers">💼 Listar Ofertas</Link>
            </li> */}

            {/* Crear
            <li className="nav-item">
              <Link className="nav-link text-white px-4 py-2" to="/create-course">➕ Crear Curso</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-4 py-2" to="/create-project">➕ Crear Proyecto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-4 py-2" to="/create-joboffer">➕ Crear Oferta</Link>
            </li> */}

            {/* Login / Logout */}
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="btn btn-outline-light btn-sm ms-2" to="/login">
                  Iniciar Sesión
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <span
                    className="navbar-text text-white px-4 py-2"
                    style={{ fontSize: "1.2rem", fontWeight: "600" }}
                  >
                    Hola, <span style={{ color: "#f0ad05" }}>{user.name}</span>
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm ms-2"
                    onClick={handleLogout}
                  >
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
