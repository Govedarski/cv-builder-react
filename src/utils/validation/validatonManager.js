import {errorManager} from '../errorManager/errorManager.js';

export const validationManager = {
    validate(validators, name, value, setData) {
        let errors = [];
        for (const validator of validators) {
            let error = validator.validate(name, value);
            errors.push(error || {});
        }
        if (setData) {
            errorManager.setErrors(setData, name, errors);
        }

        return errors;
    },

    check(allowedField, targetName, value, validators, setData, optional) {
        if (allowedField && allowedField !== targetName) {
            return;
        }
        if (optional && value.length === 0) {
            errorManager.clearErrors(setData, targetName);
            return;
        }
        this.validate(validators, targetName, value, setData);
    },
};

