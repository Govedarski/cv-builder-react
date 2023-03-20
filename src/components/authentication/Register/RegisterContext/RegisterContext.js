import {createContext, useContext, useState} from 'react';
import {validator} from '../../../../utils/validation/validator.js';
import {
    validateEmail, validateIsAlphaNumericAndSpace,
    validateMaxLength,
    validateMinLength
} from '../../../../utils/validation/validation_functions.js';

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
    const [authErrors, setAuthErrors] = useState({});
    const [profileErrors, setProfileErrors] = useState({});

    function validateEmailData(target) {
        validator.validate(
            [validateEmail],
            target.value,
            setAuthErrors);
    }

    function validateUsernameData(target) {
        if (target.value.length === 0) {
            validator.clearErrors(setAuthData, target.name)
        }

        validator.validate(
            [
                validateMinLength.bind(null, 3),
                validateMaxLength.bind(null, 64),
                validateIsAlphaNumericAndSpace
            ],
            target.value,
            target.name,
            setAuthErrors);
    }


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
            validateEmailData,
            validateUsernameData
        }}>
            {children}
        </RegisterContext.Provider>
    );
};

