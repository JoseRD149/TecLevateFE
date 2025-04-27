import { useEffect, useState } from 'react';
import axios from 'axios';

function ListJobOffers() {
  const [jobOffers, setJobOffers] = useState([]);

  useEffect(() => {
    fetchJobOffers();
  }, []);

  const fetchJobOffers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/joboffers');
      setJobOffers(response.data);
    } catch (error) {
      console.error('Error al obtener ofertas de empleo', error);
    }
  };

  return (
    <div className="container">
      <h2>Listado de Ofertas de Empleo</h2>
      <ul className="list-group">
        {jobOffers.map((offer) => (
          <li key={offer.id} className="list-group-item">
            <strong>{offer.position}</strong> en {offer.company}
            <p>{offer.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListJobOffers;
