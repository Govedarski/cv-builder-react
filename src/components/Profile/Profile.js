import {useContext, useEffect, useState} from 'react';
import {UserContext} from '../../context/UserContext.js';
import {ImageInput} from '../helpers/custom_inputs/ImageInput/ImageInput.js';
import placeholder from '../authentication/Register/ProfileFormFields/placeholder.jpg';
import {StyledCheckInput} from '../helpers/custom_inputs/StyledCheckInput/StyledCheckInput.js';
import {useImageData} from '../../hooks/useImageData.js';
import styles from './Profile.module.css';
import {EditProfilePopupForm} from './EditProfilePopupForm/EditProfilePopupForm.js';
import * as profileService from '../../services/profileService/profileService.js';
import {LoadingContext} from '../../context/LoadingContext.js';
import {camelCaseTextToNormalText, camelCaseTextToSnakeCase, capitalize} from '../../utils/helper_functions.js';
import {Routes, useLocation, useNavigate} from "react-router-dom";
import {routes} from "../../constants/routes";
export function Profile() {
    const [isInitialRendering, setIsInitialRendering] = useState(true);
    const {setIsLoading} = useContext(LoadingContext);
    const {profileData} = useContext(UserContext);
    const userContext = useContext(UserContext);
    const [profilePicture, setProfilePicture] = useImageData();
    const [editedFieldName, setEditedFieldName] = useState('');
    const [publicFields, setPublicFields] = useState(profileData.publicFields);
    const user_id = userContext.userData.id;
    const user = userContext.userData.user;
    const location = useLocation()
    const {previousUrl, state} = location.state || {};
    const navigate = useNavigate()

    useEffect(() => {
        setIsInitialRendering(true);
        setPublicFields(profileData.publicFields);
    }, [profileData.publicFields]);

    useEffect(() => {
        if (isInitialRendering || (!profileData.profilePictureFileUrl && !profilePicture.image)) {
            setIsInitialRendering(false);
            return;
        }
        setIsLoading(true);
        profileService.editProfile(user_id, {
            binary: profilePicture.binary,
            extension: profilePicture.extension,
            publicFields
        })
            .then(res => {
                userContext.setProfile(res);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });

    }, [profilePicture, publicFields]);


    const checkBoxData = {
        size: 14,
        textOn: '(Public)',
        textOff: '(Private)',
        onChangeHandler: onCheckboxChangeHandler
    };

    const fieldNames = ['firstName', 'lastName', 'phoneNumber', 'dateOfBirth', 'city', 'address'];

    function onCheckboxChangeHandler(e) {
        if (e.target.checked) {
            setPublicFields(prevState => [...prevState, e.target.name]);
        } else {
            setPublicFields(prevState => prevState.filter(x => x !== e.target.name));
        }
    }


    function doubleClickHandler(e) {
        setEditedFieldName(e.target.id);
    }

    function deleteProfilePicture() {
        if (!profileData.profilePictureFileUrl && !profilePicture.image) {
            return;
        }
        setIsLoading(true);
        profileService.deleteProfilePicture(user_id)
            .then(res => {
                userContext.setProfile(res);
                setProfilePicture('', '', '');
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            });
    }

    function backToCV(){
        state.profile = profileData
        state.email = user.email
        navigate(
            previousUrl,
            {state: {cv: state}}
        )
    }

    return (
        <div className={styles.container}>
            <h1>Profile</h1>
            <div className={styles.imageContainer}>
                <ImageInput
                    imageData={profilePicture}
                    imageUrl={profileData.profilePictureFileUrl}
                    setImageData={setProfilePicture}
                    placeholder={placeholder}
                    deleteImageHandler={deleteProfilePicture}
                />

                <StyledCheckInput checkBoxData={{
                    ...checkBoxData,
                    name: 'profile_picture_file_url',
                    checkedFields: publicFields,
                    onChangeHandler: onCheckboxChangeHandler
                }}/>
            </div>
            <div className={styles.fieldsContainer}>
                <span
                    id={'email'}
                    onDoubleClick={doubleClickHandler}
                    style={{borderColor: 'green', color: 'green'}}
                >
                    Email: {user.email}
                </span>
                <span
                    id={'username'}
                    onDoubleClick={doubleClickHandler}
                    style={{borderColor: 'green', color: 'green'}}
                >
                    Username: {user.username || 'Not set'}
                </span>
                {fieldNames.map(fieldName => {
                    return (
                        <span
                            key={fieldName}
                            id={fieldName}
                            onDoubleClick={doubleClickHandler}
                            style={publicFields.includes(camelCaseTextToSnakeCase(fieldName))
                                ? {
                                    borderColor: 'green',
                                    color: 'green'
                                }
                                : {}}
                            title={'Double click to edit'}
                        >
                            {capitalize(camelCaseTextToNormalText(fieldName))}: {profileData[fieldName] || 'Not set'}
                        </span>
                    );
                })}
            </div>
            {state && <button className={styles.btn} onClick={backToCV}>Back to CV</button>}

            {editedFieldName &&
                <EditProfilePopupForm
                    editedFieldName={editedFieldName}
                    setEditedFieldName={setEditedFieldName}
                />
            }

        </div>
    );
}