import { useEffect, useState } from 'react';
import axios from 'axios';

function ListCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error al obtener cursos', error);
    }
  };

  return (
    <div className="container">
      <h2>Listado de Cursos</h2>
      <ul className="list-group">
        {courses.map((course) => (
          <li key={course.id} className="list-group-item">
            <strong>{course.title}</strong> - {course.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListCourses;
