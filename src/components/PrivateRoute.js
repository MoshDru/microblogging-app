import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useAuthContext();

    useEffect(() => {
        console.log('PR user', user);
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [user])


    return children;
}

export default PrivateRoute;