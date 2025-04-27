import axios from "axios";
const API_URL = "http://localhost:80/TecLevate";

export async function uploadProfileImage(formData, userId) {
  if (!userId) {
    throw new Error("User ID is required.");
  }

  try {
    const response = await axios.put(
      `${API_URL}/users/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message || error.response.data.error
      : error.message;

    throw new Error(errorMessage);
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
export async function getAllProjects() {
  const resp = await axios.get(`${API_URL}/projects`);
  return resp.data;
}
export async function getAllCourses() {
  const resp = await axios.get(`${API_URL}/courses`);
  return resp.data;
}
