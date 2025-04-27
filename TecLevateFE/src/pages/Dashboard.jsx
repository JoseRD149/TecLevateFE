import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ color: '#007bff', fontWeight: 'bold' }}>
        Bienvenido a TecLevate
      </h1>

      <div className="row g-4">
        {/* Crear Curso */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title text-center">Crear Curso</h5>
              <Link to="/create-course" className="btn btn-primary mt-3">Ir</Link>
            </div>
          </div>
        </div>

        {/* Listar Cursos */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title text-center">Listar Cursos</h5>
              <Link to="/list-courses" className="btn btn-primary mt-3">Ir</Link>
            </div>
          </div>
        </div>

        {/* Crear Proyecto */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title text-center">Crear Proyecto</h5>
              <Link to="/create-project" className="btn btn-primary mt-3">Ir</Link>
            </div>
          </div>
        </div>

        {/* Listar Proyectos */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title text-center">Listar Proyectos</h5>
              <Link to="/list-projects" className="btn btn-primary mt-3">Ir</Link>
            </div>
          </div>
        </div>

        {/* Crear Oferta */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title text-center">Crear Oferta</h5>
              <Link to="/create-joboffer" className="btn btn-primary mt-3">Ir</Link>
            </div>
          </div>
        </div>

        {/* Listar Ofertas */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title text-center">Listar Ofertas</h5>
              <Link to="/list-joboffers" className="btn btn-primary mt-3">Ir</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
