import {FormField} from '../../../helpers/FormField/FormField.js';
import {ImageInput} from '../../../helpers/ImageInput/ImageInput.js';
import styles from './ProfiledataFields.module.css';
import placeholder from "./placeholder.jpg"
import {StyledCheckInput} from '../../../helpers/StyledCheckInput/StyledCheckInput.js';
import {useContext} from 'react';
import {RegisterContext} from '../RegisterContext/RegisterContext.js';

export function ProfileDataFields() {
    const context = useContext(RegisterContext)
    const checkBoxData = {
        size: 14,
        textOn: '(Public)',
        textOff: '(Private)',
        positionX: 16
    };
    const profileFields = [
        {name: 'firstName', type: 'text'},
        {name: 'lastName', type: 'text'},
        {name: 'dateOfBirth', type: 'date'},
        {name: 'phoneNumber', type: 'text'},
        {name: 'city', type: 'text'},
        {name: 'address', type: 'text'},
    ];

    function onChangeHandler(e) {
        context.setProfileData(prevState => ({
                ...prevState, [e.target.name]: e.target.value
            })
        );
    }


    return (
        <>
            <div className={styles.imageWrapper}>
                <ImageInput data={context.profilePicture} setData={context.setProfilePicture} placeholder={placeholder}/>
                <StyledCheckInput checkBoxData={{...checkBoxData, id:'profilePicturePublic'}}/>
            </div>
            {profileFields.map(fieldData =>{
                return <FormField
                    key={fieldData.name}
                    name={fieldData.name}
                    id={fieldData.name}
                    type={fieldData.type}
                    onChange={onChangeHandler}
                    value={context.profileData[fieldData.name]}
                    withCheckBox={true}
                    checkBoxData={{...checkBoxData, id: fieldData.name + 'Public'}}
                />})}

        </>
    );
}

