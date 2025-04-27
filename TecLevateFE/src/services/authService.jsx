import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const API_URL = "http://localhost:80/TecLevate";

export function login(credentials) {
  return axios.post(`${API_URL}/login`, credentials)
    .then(response => {
      console.log('Login exitoso', response.data); 
      if (response.data.success) {
        toast.success('¡Login exitoso!');
        return response.data.user; 
      } else {
        throw new Error('Error en el login');
      }
    })
    .catch(error => {
      if (error.response) {
        console.error('Error en el login:', error.response.data.error);
        toast.error(`Error: ${error.response.data.error}`); 
        if (error.response.status === 401) {
          toast.error('Correo o contraseña incorrectos'); 
        } else {
          toast.error('Error desconocido');
        }
      } else if (error.request) {
        console.error('Error de red:', error.request);
        toast.error('Hubo un problema con la red. Intenta de nuevo.');
      } else {
        console.error('Error desconocido:', error.message);
        toast.error('Ocurrió un error desconocido. Por favor, intenta más tarde.');
      }
    });
}
export const register = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
