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

    checkField(targetField, fieldName, value, validators, setData, optional) {
        if (targetField && targetField !== fieldName) {
            return;
        }
        if (optional && value.length === 0) {
            errorManager.clearErrors(setData, fieldName);
            return;
        }
        this.validate(validators, fieldName, value, setData);
    },

    checkData(data, checkFunction){
        return Object.entries(data).forEach(([name, value]) => {
            checkFunction(name, value);
        });
    }
};

