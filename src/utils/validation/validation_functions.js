import validator from 'email-validator';

export function validateMinLength(minLength, value, targetName, show = false) {
    if (value.length < minLength) {
        return {
            error: `${targetName} must be at least ${minLength} characters long!`,
            show: false
        };
    }
};

export function validateMaxLength(maxLength, value, targetName) {
    if (value.length > maxLength) {
        return {
            error: `${targetName} should be ${maxLength} characters or less!`,
            show: true
        };
    }
};

export function validateIsAlphaNumericAndSpace(value, targetName) {
    if (!value.match(/^[A-Za-z0-9\s]+$/)) {
        return {
            error: `${targetName} must contain only letters, numbers and spaces!`,
            show: true
        };
    }
};

export function validateEmail(value) {
    if (!validator.validate(value)) {
        return {
            error: `"${value}" is not valid email!`,
            show: false
        };
    }
}