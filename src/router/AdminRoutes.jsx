import { Navigate, useLocation } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("admin_token");
  if (token) {
    return children;
  }
  return (
    <Navigate to="/admin/dashboard/login" state={{ form: location }} replace />
  );
};

export default AdminRoutes;
