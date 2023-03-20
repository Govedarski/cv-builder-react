import {FormField} from '../../../helpers/FormField/FormField.js';
import {
    validateEmail,
    validateMaxLength,
    validateMinLength
} from '../../../../utils/validation/validation_functions.js';
import {validator} from '../../../../utils/validation/validator.js';
import {useContext} from 'react';
import {RegisterContext} from '../RegisterContext/RegisterContext.js';

export function AuthDataFields() {
    const context = useContext(RegisterContext)
    const authFields = [
        {name: 'email', type: 'text'},
        {name: 'username', type: 'text', fieldTitle: 'Optional', placeholder: 'Username - optional'},
        {name: 'password', type: 'password'},
        {name: 'confirmPassword', type: 'password'},
    ];



    function onChangeHandler(e) {
        context.setAuthData(prevState => ({
                ...prevState, [e.target.name]: e.target.value
            })
        );

        switch (e.target.name) {
            case "email":
                context.validateEmailData(e.target);
                break
            case "username":
                context.validateUsernameData(e.target);
                break
            default:
                break
        }
        validator.showAllErrors(context.setAuthErrors, true)
    }



    return (
        <>
            {authFields.map(fieldData =>
                <FormField
                    key={fieldData.name}
                    name={fieldData.name}
                    id={fieldData.name}
                    fieldTitle={fieldData.fieldTitle}
                    placeholder={fieldData.placeholder}
                    onChange={onChangeHandler}
                    value={context.authData[fieldData.name]}
                />)}
        </>
    );
}