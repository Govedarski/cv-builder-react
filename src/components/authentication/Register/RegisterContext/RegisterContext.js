import {createContext, useState} from 'react';
import {
    checkAllAuthData,
    checkConfirmPassword,
    checkEmail,
    checkPassword,
    checkUsername
} from './validators/auth_validators.js';
import {
    checkAllProfileData,
    checkCity,
    checkFirstName,
    checkLastName,
    checkPhoneNumber
} from './validators/profile_validators.js';
import {Register} from '../Register.js';
import {useErrorManager} from '../../../../hooks/useErrorManager.js';

export const RegisterContext = createContext({});

export const RegisterProvider = () => {
    const [authData, setAuthData] = useState({
        email: '', username: '', password: '', confirmPassword:''
    });
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
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
    const authErrorManager = useErrorManager({email: [], username: [], password: []})
    const profileErrorManager = useErrorManager({})

    return (
        <RegisterContext.Provider value={{
            authData,
            setAuthData,
            profileData,
            setProfileData,
            profilePicture,
            setProfilePicture,
            publicFields,
            setPublicFields,
            authErrorManager,
            profileErrorManager,
            checkEmail,
            checkUsername,
            checkPassword,
            checkConfirmPassword,
            checkAllAuthData,
            checkFirstName,
            checkLastName,
            checkCity,
            checkPhoneNumber,
            checkAllProfileData
        }}>
            <Register/>
        </RegisterContext.Provider>
    );
};

