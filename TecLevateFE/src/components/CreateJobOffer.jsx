import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function CreateJobOffer() {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/joboffers', {
        position,
        company,
        description
      });

      toast.success('Oferta de empleo creada exitosamente 🚀');
      setPosition('');
      setCompany('');
      setDescription('');
    } catch (error) {
      console.error(error);
      toast.error('Error al crear la oferta de empleo ❌');
    }
  };

  return (
    <div className="container">
      <h2>Crear Nueva Oferta de Empleo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Puesto</label>
          <input 
            type="text" 
            className="form-control" 
            value={position} 
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Empresa</label>
          <input 
            type="text" 
            className="form-control" 
            value={company} 
            onChange={(e) => setCompany(e.target.value)}
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

        <button type="submit" className="btn btn-primary">Crear Oferta</button>
      </form>
    </div>
  );
}

export default CreateJobOffer;

