import axios from 'axios';

export async function uploadProfileImage(formData) {
  try {
    const response = await axios.put('http://localhost/TecLevate/users', formData, {
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
