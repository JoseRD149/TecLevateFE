import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";

import ListCourses from './components/ListCourses';
import ListProjects from './components/ListProjects';
import ListJobOffers from './components/ListJobOffers';
import Dashboard from './pages/Dashboard';

function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <ToastContainer />

      {/* Mostrar Navbar solo si no estamos en login o register */}
      {!hideNavbar && <Navbar />}

      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/list-courses" element={<ListCourses />} />
          <Route path="/list-projects" element={<ListProjects />} />
          <Route path="/list-joboffers" element={<ListJobOffers />} />

          <Route path="/" element={<Login />} />

          {/* Rutas protegidas */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <PrivateRoute>
                <Courses />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          
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
