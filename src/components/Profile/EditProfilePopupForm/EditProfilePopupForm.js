import styles from '../Profile.module.css';
import {FormField} from '../../helpers/FormField/FormField.js';
import {useContext, useRef, useState} from 'react';
import {LoadingContext} from '../../../context/LoadingContext.js';
import * as profileService from '../../../services/profileService/profileService.js';
import {UserContext} from '../../../context/UserContext.js';
import {ErrorList} from '../../helpers/ErrorList/ErrorList.js';
import {useErrorManager} from '../../../hooks/useErrorManager.js';
import {createProfileValidators} from '../../../utils/validation/validators/profile_validators.js';
import {camelCaseTextToSnakeCase} from '../../../utils/helper_functions.js';
import {createAuthValidator} from '../../../utils/validation/validators/auth_validators.js';
import * as authService from '../../../services/authService/authService.js';

export function EditProfilePopupForm({editedFieldName, setEditedFieldName}) {
    const {setIsLoading} = useContext(LoadingContext);
    const userContext = useContext(UserContext);
    const user_id = userContext.userData.id;
    const profile = {...userContext.profileData};
    const [newProfileData, setNewProfileData] = useState(profile);
    const [newAuthData, setNewAuthData] = useState(userContext.userData.user);
    const errorManager = useErrorManager({});
    const authValidator = createAuthValidator(errorManager);
    const profileValidator = createProfileValidators(errorManager);
    const snakeCaseFieldName = camelCaseTextToSnakeCase(editedFieldName);
    let publicFields = [...userContext.profileData.publicFields];
    const checkboxRef = useRef();
    const model = ['email', 'username'].includes(editedFieldName) ? 'auth' : 'profile';

    let fieldType = 'text';
    switch (editedFieldName) {
        case 'phoneNumber':
            fieldType = 'phoneNumber';
            break;
        case 'dateOfBirth':
            fieldType = 'date';
            break;
    }

    const checkBoxData = {
        size: 14,
        textOn: '(Public)',
        textOff: '(Private)',
        positionX: 16,
        ref: checkboxRef,
        name: snakeCaseFieldName,
        defaultValue: publicFields.includes(snakeCaseFieldName)
    };

    function changeHandlerProfile(e) {
        setNewProfileData(prevState => ({
                ...prevState, [e.target.name]: e.target.value
            })
        );
        profileValidator.checkAllProfileData(e.target.name, e.target.value);
    }

    function changeHandlerAuth(e) {
        setNewAuthData(prevState => ({
                ...prevState, [e.target.name]: e.target.value
            })
        );
        authValidator.checkEmail(e.target.name, e.target.value);
        authValidator.checkUsername(e.target.name, e.target.value);
    }


    function submitHandlerProfile(e) {
        e.preventDefault();
        setIsLoading(true);
        const value = newProfileData[editedFieldName];

        if (errorManager.hasError()) {
            errorManager.showAllErrors();
            setIsLoading(false);
            return;
        }


        const isPublic = checkboxRef.current?.checked;

        if (isPublic && !publicFields.includes(editedFieldName)) {
            publicFields.push(editedFieldName);
        } else if (!isPublic && publicFields.includes(snakeCaseFieldName)) {
            publicFields = publicFields.filter(x => x !== snakeCaseFieldName);
        }


        profileService.editProfile(user_id, {[editedFieldName]: value, publicFields})
            .then(res => {
                if (!res) {
                    return;
                }

                userContext.setProfile(res);
                setIsLoading(false);
                setEditedFieldName('');
            }).catch(err => {
            console.log(err);
            setIsLoading(false);
            setEditedFieldName('');
        });
    }

    function submitHandlerAuth(e) {
        e.preventDefault();
        setIsLoading(true);
        const value = newAuthData[editedFieldName]; //change

        if (errorManager.hasError()) {
            errorManager.showAllErrors();
            setIsLoading(false);
            return;
        }
        const data = {
            email: userContext.userData.user.email,
            username: userContext.userData.user.username,
            [editedFieldName]: value
        };

        authService.editCredentials(user_id, data)
            .then(res => {
                if (!res) {
                    return;
                }
                const {id, email, username} = res;
                console.log(res)
                userContext.setUser({id, email, username});
                setIsLoading(false);
                setEditedFieldName('');
            }).catch(error => {
            if (error.message.type === 'Unique constraint violation') {
                errorManager.setErrors('server',
                    [{error: error.message.email},
                        {error: error.message.username}]);
                errorManager.showErrorsFor('server');
                setIsLoading(false);
                return;
            }
            alert('Something went wrong on our server. Please try again later.');
            setIsLoading(false);
        });
    }

    function cancel(e) {
        e.preventDefault();
        setEditedFieldName('');
    }


    return (
        <form
            className={styles.popupForm}
            onSubmit={model === 'auth'
                ? submitHandlerAuth
                : submitHandlerProfile}
        >
            <FormField
                name={editedFieldName}
                value={model === 'auth'
                    ? newAuthData[editedFieldName]
                    : newProfileData[editedFieldName]}
                onChange={model === 'auth'
                    ? changeHandlerAuth
                    : changeHandlerProfile}
                type={fieldType}
                withCheckBox={model === 'profile'}
                prefix={editedFieldName === 'phoneNumber' ? '+359 8' : ''}
                length={editedFieldName === 'phoneNumber' ? 8 : ''}
                checkBoxData={checkBoxData}/>
            <ErrorList errorData={errorManager.errorData}/>
            <div className={styles.btnWrapper}>
                <button>Save</button>
                <button onClick={cancel}>Cancel</button>
            </div>
        </form>
    );
}