import React, { useState } from 'react';
import axios from 'axios';

function CreateProject() {
  const [project, setProject] = useState({
    name: '',
    description: '',
    deadline: '',
  });

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost/TecLevate/api/projects/create', project, { withCredentials: true });
      alert('Proyecto creado exitosamente');
      setProject({ name: '', description: '', deadline: '' });
    } catch (error) {
      console.error(error);
      alert('Error al crear el proyecto');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear nuevo Proyecto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre del Proyecto" value={project.name} onChange={handleChange} className="form-control my-2" required />
        <textarea name="description" placeholder="Descripción" value={project.description} onChange={handleChange} className="form-control my-2" required />
        <input type="date" name="deadline" value={project.deadline} onChange={handleChange} className="form-control my-2" required />
        <button type="submit" className="btn btn-success">Crear Proyecto</button>
      </form>
    </div>
  );
}

export default CreateProject;
