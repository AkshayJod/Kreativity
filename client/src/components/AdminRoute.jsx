import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user && user.role === 'admin') {
        return children;
    } else {
        return <Navigate to="/dashboard" replace />;
    }
};

export default AdminRoute;
