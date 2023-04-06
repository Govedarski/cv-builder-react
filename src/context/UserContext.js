import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from '../utils/helper_functions.js';

export const UserContext = createContext({
    userData : {},

});

export const UserProvider = ({
                                 children,
                             }) => {
    const [authData, setAuthData] = useLocalStorage('authData', {});
    const [profileData, setProfileData] = useLocalStorage('profileData', {});

    const userLogin = (data) => {
        let convertedData = changeObjectKeysNaming(data, snakeCaseToCamelCase);
        setProfileData(convertedData.userData.profile);
        delete convertedData.userData.profile;
        setAuthData(convertedData);
    };

    const userLogout = () => {
        setAuthData({});
    };

    const setProfile = (data) => {
        let convertedData = changeObjectKeysNaming(data, snakeCaseToCamelCase);
        setProfileData(convertedData);
    }

    const setUser = (data) =>{
        let convertedData = changeObjectKeysNaming(data, snakeCaseToCamelCase);
        setAuthData(prevState => {
            const newState = {...prevState}
            newState.userData.id = convertedData.id;
            newState.userData.user.email = convertedData.email;
            newState.userData.user.username = convertedData.username;
            return newState;
        });
    }

    return (
        <UserContext.Provider value={{
            userData : authData && authData["userData"],
            userType: authData && authData["userType"],
            profileData : profileData,
            token: authData?.token,
            isAuthenticated: !!authData?.token,
            userLogin,
            userLogout,
            setProfile,
            setUser
        }}>
            {children}
        </UserContext.Provider>
    );
};

