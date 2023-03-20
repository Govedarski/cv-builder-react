import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext({
    userData : {},

});

export const AuthProvider = ({
                                 children,
                             }) => {
    const [authData, setAuthData] = useLocalStorage('authData', {});

    const userLogin = (data) => {
        setAuthData(data);
    };

    const userLogout = () => {
        setAuthData({});
    };

    return (
        <AuthContext.Provider value={{
            userData : authData && authData["user_data"],
            userType: authData && authData["user_type"],
            token: authData?.token,
            isAuthenticated: !!authData?.token,
            userLogin,
            userLogout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

