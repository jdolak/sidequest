import {Navigate, Outlet} from "react-router-dom";
import { useGlobalStore } from "../stores/globalStore";

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;