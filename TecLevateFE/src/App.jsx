import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute'; 
import { ToastContainer } from 'react-toastify';
import Register from './pages/Register';

import CreateCourse from './components/CreateCourse';
import CreateProject from './components/CreateProject';
import CreateJobOffer from './components/CreateJobOffer';

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer />
      
      {/* Navbar solo si NO estamos en login */}
      {location.pathname !== '/login' && <Navbar />}

      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas */}
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/courses" element={
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          } />
          <Route path="/projects" element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          
          {/* Nuevas rutas para crear */}
          <Route path="/create-course" element={
            <PrivateRoute>
              <CreateCourse />
            </PrivateRoute>
          } />
          <Route path="/create-project" element={
            <PrivateRoute>
              <CreateProject />
            </PrivateRoute>
          } />
          <Route path="/create-joboffer" element={
            <PrivateRoute>
              <CreateJobOffer />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
