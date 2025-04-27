import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute'; 
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();

  return (
    <>
    <>
  <ToastContainer />
  {/* el resto de tu app */}
</>
      {location.pathname !== '/login' && <Navbar />}
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protegemos las rutas */}
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
