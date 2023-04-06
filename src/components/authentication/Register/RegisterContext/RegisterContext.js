import {createContext, useState} from 'react';
import {authValidator} from '../../../../utils/validation/validators/auth_validators.js';
import {profileValidator} from '../../../../utils/validation/validators/profile_validators.js';
import {Register} from '../Register.js';
import {useErrorManager} from '../../../../hooks/useErrorManager.js';
import {useImageData} from '../../../../hooks/useImageData.js';

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
    const [profilePicture, setProfilePicture] = useImageData();
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
            ...authValidator,
            ...profileValidator
        }}>
            <Register/>
        </RegisterContext.Provider>
    );
};

