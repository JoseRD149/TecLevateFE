import React, { useState, useEffect } from "react";
import { getUserProjects, getAllProjects } from "../services/userService";
import { getProjectDetails } from "../services/projectService";

import "../Projects.css";

function Projects() {
  const [userProjects, setUserProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalCourse, setModalCourse] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user")).id;

    async function fetchProjects() {
      try {
        const userData = await getUserProjects(userId);
        const userProjects = userData.projects || [];
        setUserProjects(userProjects);

        const allData = await getAllProjects();
        console.log("Todos los proyectos:", allData);

        const availableProjects = allData.filter(
          (project) =>
            !userProjects.some((userProject) => userProject.id === project.id)
        );

        setAllProjects(availableProjects);
      } catch (err) {
        console.error("Error cargando proyectos:", err);
      }
    }

    fetchProjects();
  }, []);

  const openModal = async (id) => {
    setShowModal(true);
    setLoadingModal(true);
    try {
      const details = await getProjectDetails(id);
      setModalCourse(details);
    } catch (e) {
      console.error("Error cargando detalles:", e);
    } finally {
      setLoadingModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalCourse(null);
  };

  return (
    <div className="container mt-4">
      <div className="overlay-global"></div>

      <div className="text-center">
        <h1 className="display-4">Proyectos Destacados</h1>
        <p className="lead">
          Explora proyectos que puedes realizar para mejorar tus habilidades.
        </p>
      </div>

      {userProjects.length > 0 && (
        <div>
          <h3 className="texts">Mis Proyectos</h3>
          <div className="row">
            {userProjects.map((project) => (
              <div key={project.id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <img
                    src={project.imageUrl || "src/assets/logo-teclevate.png"}
                    className="card-img-top"
                    alt={project.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{project.title}</h5>
                    <p className="card-text">{project.description}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => openModal(project.id)}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {allProjects.length > 0 && (
        <div>
          <h3 className="texts">Proyectos Disponibles</h3>
          <div className="row">
            {allProjects.map((project) => (
              <div key={project.id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <img
                    src={project.imageUrl || "src/assets/logo-teclevate.png"}
                    className="card-img-top"
                    alt={project.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{project.title}</h5>
                    <p className="card-text">{project.description}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => openModal(project.id)}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {loadingModal ? (
              <div>Cargando...</div>
            ) : modalCourse ? (
              <>
                <h2>{modalCourse.title}</h2>
                <p>
                  <strong>Descripción:</strong> {modalCourse.description}
                </p>
                <p>
                  <strong>Duración:</strong> {modalCourse.duration}h
                </p>
                <p>
                  <strong>Precio:</strong> {modalCourse.price} €
                </p>
                <p>
                  <strong>Inicio:</strong> {modalCourse.start_date}
                </p>
                <p>
                  <strong>Fin:</strong> {modalCourse.end_date}
                </p>
                <p>
                  <strong>Expira:</strong> {modalCourse.expiration_date}
                </p>
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cerrar
                </button>
              </>
            ) : (
              <div>Error cargando detalles</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
