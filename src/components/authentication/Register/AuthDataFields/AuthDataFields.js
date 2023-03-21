import {FormField} from '../../../helpers/FormField/FormField.js';
import {validator} from '../../../../utils/validation/validator.js';
import {useContext} from 'react';
import {RegisterContext} from '../RegisterContext/RegisterContext.js';

export function AuthDataFields() {
    const context = useContext(RegisterContext);
    const authFields = [
        {name: 'email', type: 'text',},
        {name: 'username', type: 'text', fieldTitle: 'Optional', placeholder: 'Username - optional'},
        {name: 'password', type: 'password'},
        {name: 'confirmPassword', type: 'password'}
    ];

    function blurHandler(e) {
        context.checkAllAuthData(e.target.name, e.target.value);
        validator.showError(context.setAuthErrors, e.target.name, true);
    }

    function onChangeHandler(e) {
        context.setAuthData(prevState => ({
                ...prevState, [e.target.name]: e.target.value
            })
        );
        context.checkUsername(e.target.name, e.target.value);
        if (context.authErrors[e.target.name]?.length !== 0) {
            context.checkAllAuthData(e.target.name, e.target.value);
            validator.showError(context.setAuthErrors, e.target.name, true);
        }
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
                    onBlur={blurHandler}
                    value={context.authData[fieldData.name]}
                />)}
        </>
    );
}