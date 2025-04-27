import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function CreateProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/projects', {
        name,
        description
      });

      toast.success('Proyecto creado exitosamente 🚀');
      setName('');
      setDescription('');
    } catch (error) {
      console.error(error);
      toast.error('Error al crear el proyecto ❌');
    }
  };

  return (
    <div className="container">
      <h2>Crear Nuevo Proyecto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre del Proyecto</label>
          <input 
            type="text" 
            className="form-control" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
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

        <button type="submit" className="btn btn-primary">Crear Proyecto</button>
      </form>
    </div>
  );
}

export default CreateProject;
