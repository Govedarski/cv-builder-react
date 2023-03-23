import {FormField} from '../../../helpers/FormField/FormField.js';
import {useContext} from 'react';
import {RegisterContext} from '../RegisterContext/RegisterContext.js';

export function AuthFormFields() {
    const context = useContext(RegisterContext);
    const authFields = [
        {name: 'email', type: 'text',},
        {name: 'username', type: 'text', fieldTitle: 'Optional', placeholder: 'Username - optional'},
        {name: 'password', type: 'password'},
        {name: 'confirmPassword', type: 'password'}
    ];

    function blurHandler(e) {
        context.checkAllAuthData(e.target.name, e.target.value);
        context.authErrorManager.showErrorsFor(e.target.name);
    }

    function changeHandler(e) {
        if (context.authErrorManager.didFieldShowErrors(e.target.name)) {
            context.checkAllAuthData(e.target.name, e.target.value);
            context.authErrorManager.showErrorsFor(e.target.name);
        } else {
            context.checkUsername(e.target.name, e.target.value);
        }
        context.setAuthData(prevState => ({
                ...prevState, [e.target.name]: e.target.value
            })
        );
    }


    return (
        <>
            {authFields.map(fieldData =>
                <FormField
                    key={fieldData.name}
                    name={fieldData.name}
                    type={fieldData.type}
                    id={fieldData.name}
                    fieldTitle={fieldData.fieldTitle}
                    placeholder={fieldData.placeholder}
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    value={context.authData[fieldData.name]}
                />)}
        </>
    );
}