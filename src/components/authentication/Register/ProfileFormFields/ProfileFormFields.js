import {FormField} from '../../../helpers/FormField/FormField.js';
import {ImageInput} from '../../../helpers/custom_inputs/ImageInput/ImageInput.js';
import styles from './ProfiledataFields.module.css';
import placeholder from './placeholder.jpg';
import {StyledCheckInput} from '../../../helpers/custom_inputs/StyledCheckInput/StyledCheckInput.js';
import {useContext} from 'react';
import {RegisterContext} from '../RegisterContext/RegisterContext.js';
import {camelCaseTextToSnakeCase} from '../../../../utils/helper_functions.js';

export function ProfileFormFields() {
    const context = useContext(RegisterContext);

    function onCheckboxChangeHandler(e) {
        if (e.target.checked) {
            context.setPublicFields(prevState => [...prevState, e.target.name]);
        } else {
            context.setPublicFields(prevState => prevState.filter(x => x !== e.target.name));
        }
    }

    const checkBoxData = {
        size: 14,
        textOn: '(Public)',
        textOff: '(Private)',
        positionX: 16,
        onChangeHandler: onCheckboxChangeHandler
    };
    const profileFields = [
        {name: 'firstName', type: 'text'},
        {name: 'lastName', type: 'text'},
        {name: 'dateOfBirth', type: 'date'},
        {name: 'phoneNumber', type: 'phoneNumber', prefix: '+359 8', length: 8},
        {name: 'city', type: 'text'},
        {name: 'address', type: 'text'},
    ];

    function onChangeHandler(e) {
        context.setProfileData(prevState => ({
                ...prevState, [e.target.name]: e.target.value
            })
        );
        context.checkAllProfileData(e.target.name, e.target.value);
    }

    return (
        <>
            <div className={styles.imageWrapper}>
                <ImageInput
                    imageData={context.profilePicture}
                    setImageData={context.setProfilePicture}
                    placeholder={placeholder}
                />
                <StyledCheckInput
                    checkBoxData={{
                        ...checkBoxData,
                        name: 'profile_picture'
                    }}
                />
            </div>
            {profileFields.map(fieldData => {
                return <FormField
                    key={fieldData.name}
                    name={fieldData.name}
                    id={fieldData.name}
                    type={fieldData.type}
                    onChange={onChangeHandler}
                    value={context.profileData[fieldData.name]}
                    prefix={fieldData.prefix}
                    length={fieldData.length}
                    withCheckBox={true}
                    checkBoxData={{
                        ...checkBoxData,
                        name: camelCaseTextToSnakeCase(fieldData.name),
                        checkedFields: context.publicFields
                    }}
                />;
            })}

        </>
    );
}

