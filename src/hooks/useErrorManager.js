import {useState} from 'react';

export function useErrorManager(initialState) {
    const [errorData, setErrorData] = useState(initialState);
    return {
        errorData,
        setErrorData,

        setErrors(name, errors) {
            console.log(errors)
            this.setErrorData(prevState => ({...prevState, [name]: errors}));
        },

        setError(name, error, errorIndex) {
            this.setErrorData(prevState => {
                const newState = {...prevState};
                newState[name][errorIndex] = error;
                return newState;
            });
        },

        clearErrors(name) {
            this.setErrorData(prevState => {
                let newState = {...prevState};
                newState[name] = [];
                return newState;
            });
        },

        showErrorsFor(name, show=true) {
            this.setErrorData(prevState => {
                let newState = {...prevState};
                newState[name]?.forEach(x => {
                    x.show = show;
                });
                return newState;
            });
        },

        showAllErrors(show=true) {
            this.setErrorData(prevState => {
                let newState = {...prevState};
                Object.keys(newState)
                    .forEach(key => this.showErrorsFor(key, show));
                return newState;
            });
        },

        hasError() {
            return (Object.values(this.errorData)
                .some(errors =>
                    errors.filter(x =>
                        x.error !== undefined).length > 0));
        },

        didFieldShowErrors(fieldName) {
            console.log(Object.values(this.errorData[fieldName] || {}).length > 0
                && Object.values(this.errorData[fieldName]).every(x => x.show === true))
            return Object.values(this.errorData[fieldName] || {}).length > 0
                && Object.values(this.errorData[fieldName]).every(x => x.show === true);
        },
    };
}

