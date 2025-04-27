import React, { useState, useEffect } from 'react';
import { uploadProfileImage, getUserCourses, getUserProjects } from '../services/userService';
import '../Profile.css';

function getPublicImageUrl(fullPath) {
  if (!fullPath) return null;
  const m = fullPath.match(/uploads[\\/].+$/);
  if (!m) return null;
  const relative = m[0].replace(/\\/g, '/');
  return `http://localhost/TecLevate/src/${relative}`;
}

function Profile() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user'));
    if (!stored) return;
    setUser(stored);

    const userId = stored.id;
    Promise.all([
      getUserProjects(userId),
      getUserCourses(userId)
    ]).then(([projResp, courseResp]) => {
      setProjects(projResp.projects || []);
      setCourses(courseResp.courses || []);
    }).catch(err => {
      console.error('No se pudieron cargar proyectos o cursos:', err);
    });
  }, []);

  const handleImageUpload = e => setImageFile(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!imageFile) return;
    const formData = new FormData();
    formData.append('profile_image', imageFile);
    try {
      const { user: updated } = await uploadProfileImage(formData);
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (!user) return <div>Cargando...</div>;

  const profileImage = getPublicImageUrl(user.profile_image);


  return (
    <div className="profile-container">
      <div className="profile-overlay"></div>

      <div className="profile-content container-fluid mt-4">
        <div className="text-center">
          {profileImage ? (
            <img
              src={profileImage}
              alt={user.name}
              className="rounded-circle mb-3"
              style={{ width: '150px', height: '150px' }}
            />
          ) : (
            <div className="mb-3">
              <p>No tienes imagen de perfil. Subir una nueva imagen:</p>
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                className="form-control"
              />
              <form onSubmit={handleSubmit}>
                {imageFile && <p>Imagen seleccionada: {imageFile.name}</p>}
                <button type="submit" className="btn btn-success mt-3">
                  Subir imagen
                </button>
              </form>
            </div>
          )}

          <div className="mb-4">
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Teléfono:</strong> {user.phone || 'No disponible'}</p>
            <p><strong>DNI:</strong> {user.dni}</p>
          </div>

          <h4>Proyectos o Cursos Inscritos:</h4>
          <ul className="list-group">
            {projects.length > 0 ? (
              projects.map(p => (
                <li key={p.id} className="list-group-item">
                  <h5>{p.name}</h5>
                  <p>{p.description}</p>
                </li>
              ))
            ) : (
              <p>No tienes proyectos inscritos.</p>
            )}
          </ul>

          <h4>Cursos Inscritos:</h4>
          <ul className="list-group">
            {courses.length > 0 ? (
              courses.map(c => (
                <li key={c.id} className="list-group-item">
                  <h5>{c.name}</h5>
                  <p>{c.description}</p>
                </li>
              ))
            ) : (
              <p>No tienes cursos inscritos.</p>
            )}
          </ul>

          <div className="mt-4">
            <button className="btn btn-primary">Ver más</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
