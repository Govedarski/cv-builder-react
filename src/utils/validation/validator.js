export const validator = {
    validate(validators, name, value, setData) {
        let errors = [];
        for (const validatorFunc of validators) {
            let error = validatorFunc(name, value);
            if (error) {
                errors.push(error);
            }
        }
        if (setData) {
            this.setErrors(setData, name, errors);
        }

        return errors;
    },
    check(fieldName, targetName, value, validators, setData, optional) {
        if (fieldName && fieldName !== targetName) {
            return;
        }
        if (optional && value.length === 0) {
            validator.clearErrors(setData, targetName);
            return;
        }
        validator.validate(validators, targetName, value, setData);
    },

    setErrors(setData, name, errors) {
        setData(prevState => ({...prevState, [name]: errors}));
    },

    clearErrors(setData, name) {
        setData(prevState => {
            let newState = {...prevState};
            newState[name] = [];
            return newState;
        });
    },

    showError(setData, name, show) {
        setData(prevState => {
            let newState = {...prevState};
            newState[name].forEach(x => x.show = show);
            return newState;
        });
    },

    showAllErrors(setData, show) {
        setData(prevState => {
            let newState = {...prevState};
            Object.values(newState).forEach(value => value.forEach(x => x.show = show));
            return newState;
        });
    },

    hasErrors(errorsData) {
        return (Object.values(errorsData).some(x => x.length > 0));
    },

    checkAllData(data, checkFunction) {
        Object.entries(data).forEach(([name, value]) => {
            checkFunction(name, value);
        });
    }
};

