import React, { useState, useEffect } from "react";
import { getUserCourses, getAllCourses } from "../services/userService"; // Asegúrate de tener estos servicios
import "../Courses.css"; // Si tienes CSS para cursos

function Courses() {
  const [userCourses, setUserCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user")).id;

    async function fetchCourses() {
      try {
        const userData = await getUserCourses(userId);
        const userCourses = userData.courses || [];
        setUserCourses(userCourses);

        const allData = await getAllCourses();
        console.log("Todos los cursos:", allData);

        // Filtrar: mostrar solo los cursos que el usuario no tiene
        const availableCourses = allData.filter(course => 
          !userCourses.some(userCourse => userCourse.id === course.id)
        );

        setAllCourses(availableCourses);

      } catch (err) {
        console.error("Error cargando cursos:", err);
      }
    }

    fetchCourses();
  }, []);

  return (
    <div className="container mt-4">
      <div className="overlay-global"></div>

      <div className="text-center">
        <h1 className="display-4">Cursos Disponibles</h1>
        <p className="lead">Aquí encontrarás todos nuestros cursos para impulsar tu crecimiento.</p>
      </div>

      {userCourses.length > 0 && (
        <div>
          <h3 className="texts">Mis Cursos</h3>
          <div className="row">
            {userCourses.map((course) => (
              <div key={course.id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <img
                    src={course.imageUrl || "src/assets/logo-teclevate.png"}  
                    className="card-img-top"
                    alt={course.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>  
                    <p className="card-text">{course.description}</p>
                    <a href={`/courses/${course.id}`} className="btn btn-primary">Ver más</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {allCourses.length > 0 && (
        <div>
          <h3 className="texts">Cursos Disponibles</h3>
          <div className="row">
            {allCourses.map((course) => (
              <div key={course.id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <img
                    src={course.imageUrl || "src/assets/logo-teclevate.png"}  
                    className="card-img-top"
                    alt={course.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>  
                    <p className="card-text">{course.description}</p>
                    <a href={`/courses/${course.id}`} className="btn btn-primary">Ver más</a>
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

export default Courses;
