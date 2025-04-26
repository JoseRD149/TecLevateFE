import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const API_URL = "http://localhost:80/TecLevate";

export function login(credentials) {
  return axios.post(`${API_URL}/login`, credentials)
    .then(response => {
      console.log('Login exitoso', response.data);
      toast.success('¡Login exitoso!'); 
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        console.error('Error en el login:', error.response.data.error);
        toast.error(`Error: ${error.response.data.error}`); 
        if (error.response.status === 401) {
          // toast.error(`Error: Correo o contraseña incorrectos`); 
        } else {
          toast.error(`Error: desconocido`); 
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
export function register(userData) {
  return axios.post(`${API_URL}/register`, userData)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
