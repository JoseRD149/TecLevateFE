import React, { useState } from 'react';
import axios from 'axios';

function CreateJobOffer() {
  const [offer, setOffer] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    type: '', // Ejemplo: Full-time, Part-time, Freelance
  });

  const handleChange = (e) => {
    setOffer({
      ...offer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost/TecLevate/api/joboffers/create', offer, { withCredentials: true });
      alert('Oferta de empleo creada exitosamente');
      setOffer({ title: '', description: '', location: '', salary: '', type: '' });
    } catch (error) {
      console.error(error);
      alert('Error al crear la oferta de empleo');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear nueva Oferta de Empleo</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Título del Puesto" value={offer.title} onChange={handleChange} className="form-control my-2" required />
        <textarea name="description" placeholder="Descripción del Puesto" value={offer.description} onChange={handleChange} className="form-control my-2" required />
        <input type="text" name="location" placeholder="Ubicación" value={offer.location} onChange={handleChange} className="form-control my-2" required />
        <input type="number" name="salary" placeholder="Salario (€)" value={offer.salary} onChange={handleChange} className="form-control my-2" />
        <select name="type" value={offer.type} onChange={handleChange} className="form-control my-2" required>
          <option value="">Seleccionar tipo</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Freelance">Freelance</option>
          <option value="Prácticas">Prácticas</option>
        </select>
        <button type="submit" className="btn btn-warning">Crear Oferta</button>
      </form>
    </div>
  );
}

export default CreateJobOffer;
