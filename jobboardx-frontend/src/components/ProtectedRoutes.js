import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const ProtectedRoute = ({ children, role }) => {
    const {user} = useContext(AuthContext);

    if(!user) return <Navigate to="login" />
    if(role && user.role !== role) return <Navigate to="/"/>

    return children;
};

export default ProtectedRoute;

//This ensures pages are only visible to users with the right role