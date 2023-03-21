import {createContext, useState} from 'react';
import {
    checkAllAuthData,
    checkConfirmPassword,
    checkEmail,
    checkPassword,
    checkUsername
} from './register_validators/auth_validators.js';
import {checkAllProfileData, checkFirstName, checkTextField} from './register_validators/profile_validators.js';

export const RegisterContext = createContext({});

export const RegisterProvider = ({
                                 children,
                             }) => {
    const [authData, setAuthData] = useState({
        email: '', username: '', password: '', confirmPassword: '',
    });
    const [profileData, setProfileData] = useState({
        profilePicture: '',
        firstName: '',
        lastName: '',
        dataOfBirth: '',
        phoneNumber: '',
        city: '',
        address: '',
    });
    const [profilePicture, setProfilePicture] = useState({
        image:"",
        binary:"",
        extension:""
    })
    const [publicFields, setPublicFields] = useState([])
    const [authErrors, setAuthErrors] = useState({});
    const [profileErrors, setProfileErrors] = useState({});

    return (
        <RegisterContext.Provider value={{
            authData,
            setAuthData,
            profileData,
            setProfileData,
            profilePicture,
            setProfilePicture,
            authErrors,
            setAuthErrors,
            profileErrors,
            setProfileErrors,
            publicFields,
            setPublicFields,
            checkEmail,
            checkUsername,
            checkPassword,
            checkConfirmPassword,
            checkAllAuthData,
            checkFirstName,
            checkAllProfileData
        }}>
            {children}
        </RegisterContext.Provider>
    );
};

