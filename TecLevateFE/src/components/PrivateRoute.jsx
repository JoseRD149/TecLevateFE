import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {

  
    return <Navigate to="/login" replace />;

  return children;
}

export default PrivateRoute;
