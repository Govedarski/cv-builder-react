export const validationManager = {
    validate(validators, name, value, errorManager) {
        let errors = [];
        for (const validator of validators) {
            let error = validator.validate(name, value);
            errors.push(error || {});
        }
        if (errorManager) {
            errorManager.setErrors(name, errors);
        }

        return errors;
    },

    checkField(targetField, fieldName, value, validators, errorManager, optional) {
        if (targetField && targetField !== fieldName) {
            return;
        }
        if (optional && value.length === 0) {
            errorManager.clearErrors(fieldName);
            return;
        }
        return this.validate(validators, fieldName, value, errorManager);
    },

    checkData(data, checkFunction){
        return Object.entries(data).forEach(([name, value]) => {
            checkFunction(name, value);
        });
    }
};

