function Home() {
  return (
    <div className="container mt-5 text_center">
      <h1 className="display-4">Bienvenido a TecLevate</h1>
      <p className="lead">Impulsa tu carrera con nuestros proyectos y cursos</p>
      <img
        src="https://via.placeholder.com/600x300"
        alt="TecLevate"
        className="img-fluid my-4 rounded"
      />
      <div>
        <a href="/courses" className="btn btn-prymary-lg m-2">
          Cursos Disponibles
        </a>
        <a href="/projects" className="btn btn-secondary-lg m-2">
          Proyectos Destacados
        </a>
      </div>
    </div>
  );
}
