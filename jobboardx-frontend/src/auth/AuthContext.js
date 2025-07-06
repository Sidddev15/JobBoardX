import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); //id, role

    useEffect(()=> {
        const token = localStorage.getItem("token");
        if(token) {
            const decoded = jwtDecode(token);
            setUser({ id: decoded.id, role: decoded.role });
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id, role: decoded.role });
    };

    const logout  = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

// Decodes the token and makes user info available everywhere in the app
// Automatically checks if user is already logged in (on refresh)