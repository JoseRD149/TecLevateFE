function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4">Bienvenido a TecLevate</h1>
      <p className="lead">Impulsa tu carrera con nuestros proyectos y cursos</p>
      <img
        src="https://via.placeholder.com/600x300"
        alt="TecLevate"
        className="img-fluid my-4 rounded"
      />
      <div>
        <a href="/courses" className="btn btn-primary-lg m-2">
          Cursos Disponibles
        </a>
        <a href="/projects" className="btn btn-secondary btn-lg m-2">
          Proyectos Destacados
        </a>
      </div>
    </div>
  );
}

export default Home;