import React, { useState, useEffect } from "react";
import { getUserProjects, getAllProjects } from "../services/userService";
import "../Projects.css"; 

function Projects() {
  const [userProjects, setUserProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user")).id;

    async function fetchProjects() {
      try {
        const userData = await getUserProjects(userId);
        const userProjects = userData.projects || [];
        setUserProjects(userProjects);
  
        const allData = await getAllProjects();
        console.log("Todos los proyectos:", allData);
  
        const availableProjects = allData.filter(project => 
          !userProjects.some(userProject => userProject.id === project.id)
        );
  
        setAllProjects(availableProjects);
  
      } catch (err) {
        console.error("Error cargando proyectos:", err);
      }
    }
  
    fetchProjects();
  }, []);

  return (
    <div className="container mt-4">
      <div className="overlay-global"></div>

      <div className="text-center">
        <h1 className="display-4">Proyectos Destacados</h1>
        <p className="lead">Explora proyectos que puedes realizar para mejorar tus habilidades.</p>
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
                    <a href={`/projects/${project.id}`} className="btn btn-primary">Ver más</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {allProjects.length > 0 && (
        <div>
          <h3  className="texts">Proyectos Disponibles</h3>
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
                    <a href={`/projects/${project.id}`} className="btn btn-primary">Ver más</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
