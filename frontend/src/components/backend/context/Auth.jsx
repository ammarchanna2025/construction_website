/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {
    // Initialize user state from localStorage
    const [user, setUser] = useState(() => {
        try {
            const userInfo = localStorage.getItem('userInfo');
            return userInfo ? JSON.parse(userInfo) : null;
        } catch (error) {
            console.error('Error parsing user info from localStorage:', error);
            return null;
        }
    });

    const login = (userInfo) => {
        setUser(userInfo);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{
            user,
            login,
            logout
        }}>
            {children}

        </AuthContext.Provider>
    )
}
