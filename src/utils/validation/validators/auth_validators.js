import {validationManager} from '../validatonManager.js';
import {
    ValidateEmail,
    ValidateIsAlphaNumericAndSpace,
    ValidateMaxLength,
    ValidateMinLength,
    ValidateNumberCharactersMinCount,
    ValidatePasswordMatch,
    ValidateSpecialSymbols,
    ValidateUppercaseCharactersMinCount
} from './validators.js';
import {profileValidator} from './profile_validators.js';


function checkEmail(name, value) {
    const validators = [
        new ValidateEmail(),
        new ValidateMinLength(1, {errorMessage: 'Email is required!'})
    ];
    validationManager.checkField('email', name, value, validators, this.authErrorManager, false);
}

function checkUsername(name, value) {
    const validators = [
        new ValidateMinLength(3),
        new ValidateMaxLength(64),
        new ValidateIsAlphaNumericAndSpace()
    ];
    validationManager.checkField('username', name, value, validators, this.authErrorManager, true);
}

function checkPassword(name, value) {
    const validators = [
        new ValidateMinLength(8),
        new ValidateUppercaseCharactersMinCount(1),
        new ValidateNumberCharactersMinCount(1),
        new ValidateSpecialSymbols(1)
    ];
    validationManager.checkField('password', name, value, validators, this.authErrorManager, false);

    if (this.authData.confirmPassword.length > 0 && name === 'password') {
        let errors = validationManager.validate(
            [new ValidatePasswordMatch(this.authData.confirmPassword)],
            'confirmPassword',
            value);
        this.authErrorManager.setErrors('confirmPassword', errors);
    }
}

function checkConfirmPassword(name, value) {
    const validator = [new ValidatePasswordMatch(this.authData.password)];
    validationManager.checkField('confirmPassword', name, value, validator, this.authErrorManager, false);
}


function checkAllAuthData(name, value) {
    this.checkUsername(name, value);
    this.checkEmail(name, value);
    this.checkPassword(name, value);
    this.checkConfirmPassword(name, value);
}

export const authValidator = {
    checkUsername,
    checkEmail,
    checkPassword,
    checkConfirmPassword,
    checkAllAuthData
}

export function createAuthValidator(errorManager) {
    return {
        ...authValidator,
        authErrorManager: errorManager
    }
}
