import React, { useState } from 'react';
import axios from 'axios';

function CreateCourse() {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
  });

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost/TecLevate/api/courses/create', course, { withCredentials: true });
      alert('Curso creado exitosamente');
      setCourse({ title: '', description: '', duration: '', price: '' });
    } catch (error) {
      console.error(error);
      alert('Error al crear el curso');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear nuevo Curso</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Título" value={course.title} onChange={handleChange} className="form-control my-2" required />
        <textarea name="description" placeholder="Descripción" value={course.description} onChange={handleChange} className="form-control my-2" required />
        <input type="text" name="duration" placeholder="Duración (ej: 10 semanas)" value={course.duration} onChange={handleChange} className="form-control my-2" required />
        <input type="number" name="price" placeholder="Precio (€)" value={course.price} onChange={handleChange} className="form-control my-2" required />
        <button type="submit" className="btn btn-primary">Crear Curso</button>
      </form>
    </div>
  );
}

export default CreateCourse;
