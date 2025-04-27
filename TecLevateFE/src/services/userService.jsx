import axios from 'axios';
const API_URL = "http://localhost:80/TecLevate";

export async function uploadProfileImage(formData) {
  try {
    const response = await axios.put(`${API_URL}/users`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
}
export async function getUserProjects(userId) {
  const resp = await axios.get(`${API_URL}/user-projects/user/${userId}`);
  return resp.data; 
}

export async function getUserCourses(userId) {
  const resp = await axios.get(`${API_URL}/user-courses/user/${userId}`);
  return resp.data; 
}
