export const validator = {
    validate(validators, targetName,  value, setData) {
        let errors = [];
        for (const validatorFunc of validators) {
            let error = validatorFunc(value,targetName);
            if (error) {
                errors.push(error);
            }
        }
        if (setData){
            this.setErrors(setData, targetName, errors)
        }

        return errors;
    },

    setErrors(setData, targetName, errors) {
        setData(prevState => ({...prevState, [targetName]: errors}));
    },

    clearErrors(setData, targetName) {
        setData(prevState => {
            let newState = {...prevState};
            newState[targetName] = [];
            return newState;
        })},

    showError(setData, targetName, show) {
        setData(prevState => {
            let newState = {...prevState};
            newState[targetName].forEach(x => x.show = show);
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
    }
};

