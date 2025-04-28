import axios from "axios";
const API_URL = "http://localhost:80/TecLevate";

export async function getCourseDetails(courseId) {
  try {
    const response = await axios.get(`${API_URL}/courses/${courseId}`);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener los detalles del curso", error);
    throw error; 
  }
}
