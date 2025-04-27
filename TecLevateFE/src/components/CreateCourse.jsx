import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function CreateCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ajusta la URL según tu backend
      await axios.post('http://localhost:3000/api/courses', {
        title,
        description
      });

      toast.success('Curso creado exitosamente 🚀');
      
      // Limpiar campos después de crear
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
      toast.error('Error al crear el curso ❌');
    }
  };

  return (
    <div className="container">
      <h2>Crear Nuevo Curso</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título del Curso</label>
          <input 
            type="text" 
            className="form-control" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea 
            className="form-control" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Crear Curso</button>
      </form>
    </div>
  );
}

export default CreateCourse;
