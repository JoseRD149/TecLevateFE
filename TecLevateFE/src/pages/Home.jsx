import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1>Bienvenido a TecLevate</h1>
      <p>Por favor, elige una opción para continuar:</p>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/login" className="btn btn-primary btn-lg">
          Iniciar sesión
        </Link>
        <Link to="/register" className="btn btn-secondary btn-lg">
          Registrarse
        </Link>
      </div>
    </div>
  );
}

export default Home;
