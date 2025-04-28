import React, { useState, useEffect } from "react";
import { getUserCourses, getAllCourses } from "../services/userService";
import { getCourseDetails } from "../services/courseService"; 
import "../Courses.css";

function Courses() {
  const [userCourses, setUserCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalCourse, setModalCourse] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    async function fetchCourses() {
      try {
        const userData = await getUserCourses(userId);
        const userCourses = userData.courses || [];
        setUserCourses(userCourses);

        const allData = await getAllCourses();
        const available = allData.filter(c =>
          !userCourses.some(uc => uc.id === c.id)
        );
        setAllCourses(available);
      } catch (err) {
        console.error("Error cargando cursos:", err);
      }
    }
    fetchCourses();
  }, []);

  const openModal = async (id) => {
    setShowModal(true);
    setLoadingModal(true);
    try {
      const details = await getCourseDetails(id);
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
        <h1 className="display-4">Cursos Disponibles</h1>
        <p className="lead">Aquí encontrarás todos nuestros cursos para impulsar tu crecimiento.</p>
      </div>

      {userCourses.length > 0 && (
        <>
          <h3 className="texts">Mis Cursos</h3>
          <div className="row">
            {userCourses.map(course => (
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
                    <button
                      className="btn btn-primary"
                      onClick={() => openModal(course.id)}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {allCourses.length > 0 && (
        <>
          <h3 className="texts">Cursos Disponibles</h3>
          <div className="row">
            {allCourses.map(course => (
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
                    <button
                      className="btn btn-primary"
                      onClick={() => openModal(course.id)}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {loadingModal ? (
              <div>Cargando...</div>
            ) : modalCourse ? (
              <>
                <h2>{modalCourse.title}</h2>
                
                <p><strong>Descripción:</strong> {modalCourse.description}</p>
                <p><strong>Duración:</strong> {modalCourse.duration}h</p>
                <p><strong>Precio:</strong> {modalCourse.price} €</p>
                <p><strong>Inicio:</strong> {modalCourse.start_date}</p>
                <p><strong>Fin:</strong> {modalCourse.end_date}</p>
                <p><strong>Expira:</strong> {modalCourse.expiration_date}</p>
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

export default Courses;
