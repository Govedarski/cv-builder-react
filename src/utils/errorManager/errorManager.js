export const errorManager = {
    setErrors(setData, name, errors) {
        setData(prevState => ({...prevState, [name]: errors}));
    },

    setError(setData, name, error, errorIndex) {
        setData(prevState => {
            const newState = {...prevState};
            newState[name][errorIndex] = error;
            return newState;
        });
    },

    clearErrors(setData, name) {
        setData(prevState => {
            let newState = {...prevState};
            newState[name] = [];
            return newState;
        });
    },

    showErrorsFor(name, setData, show) {
        setData(prevState => {
            let newState = {...prevState};
            newState[name]?.forEach(x => {
                if (x.show !== undefined) {
                    x.show = show;
                }
            });
            return newState;
        });
    },

    showAllErrors(setData, show) {
        setData(prevState => {
            let newState = {...prevState};
            Object.keys(newState)
                .forEach(key => this.showErrorsFor(key, setData, show));
            return newState;
        });
    },

    hasError(errorsData) {
        return (Object.values(errorsData)
            .some(errors =>
                errors.filter(x =>
                    x.error !== undefined).length > 0));
    },
};

