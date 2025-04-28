import axios from "axios";
const API_URL = "http://localhost:80/TecLevate";

export async function getProjectDetails(courseId) {
  try {
    const response = await axios.get(`${API_URL}/projects/${courseId}`);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener los detalles del proyecto", error);
    throw error; 
  }
}
