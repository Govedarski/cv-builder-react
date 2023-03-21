import validator from 'email-validator';

export function validateMinLength(minLength, name, value) {
    if (value.length < minLength) {
        return {
            error: `${name} must be at least ${minLength} characters long!`,
            show: false
        };
    }
};

export function validateMaxLength(maxLength, name, value) {
    if (value.length > maxLength) {
        return {
            error: `${name} should be ${maxLength} characters or less!`,
            show: true
        };
    }
};

export function validateIsAlphaNumericAndSpace(name, value) {
    if (!value.match(/^[A-Za-z0-9\s]+$/)) {
        return {
            error: `${name} must contain only letters, numbers and spaces!`,
            show: true
        };
    }
};

export function validateIsAlphaAndSpace(name, value) {
    if (!value.match(/^[a-zA-Z\u0400-\u04FF\s]+$/)) {
        return {
            error: `${name} must contain only letters and spaces!`,
            show: true
        };
    }
};

export function validateEmail(_, value) {
    if (value !=="" && !validator.validate(value)) {
        return {
            error: `"${value}" is not valid email!`,
            show: false
        };
    }
}

export function validateUppercaseCharactersMinCount(minCount, name, value) {
    let count = 0;
    for (const char of value) {
        if (char.toLowerCase() !== char && ++count === count) {
            return;
        }
    }
    return {
        error: `${name} must contain at least ${minCount} uppercase characters!"`,
        show: false
    };
}

export function validateNumberCharactersMinCount(minCount, name, value) {
    let count = 0;
    for (const char of value) {
        if (!isNaN(char) && ++count === count) {
            return;
        }
    }
    return {
        error: `${name} must contain at least ${minCount} number!"`,
        show: false
    };
}


export function validateSpecialSymbols(minCount, name, value) {
    const specialCharacters = '?!@#$%^&*()_+-=[]{};\':"|,.<>\\/';
    let count = 0;
    for (const char of value) {
        if (specialCharacters.includes(char) && ++count === count) {
            return;
        }
    }
    return {
        error: `${name} must contain at least ${minCount} special symbol!"`,
        show: false
    };
}

export function validatePasswordMatch(password, name, value) {
    if (value !== password) {
        return {
            error: `Password mismatched!`,
            show: false
        };
    }
}

export function validateIsFilledIn(name, value) {
    if (value===""){
            return {
                error:`${name} is mandatory!`,
                show:false
        }
    }
}