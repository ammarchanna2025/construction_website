/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {
    const userInfo = localStorage.getItem('userInfo');

    const [user, setUser] = useState(userInfo);


    const login = (userInfo) => {
        setUser(userInfo);
        console.log(user, "user")
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
