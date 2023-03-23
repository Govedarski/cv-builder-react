import {validationManager} from '../../../../../utils/validation/validatonManager.js';
import {
    ValidateEmail,
    ValidateIsAlphaNumericAndSpace,
    ValidateMaxLength,
    ValidateMinLength,
    ValidateNumberCharactersMinCount,
    ValidatePasswordMatch,
    ValidateSpecialSymbols,
    ValidateUppercaseCharactersMinCount
} from '../../../../../utils/validation/validators.js';


export function checkEmail(name, value) {
    const validators = [
        new ValidateEmail(),
        new ValidateMinLength(1, {errorMessage: 'Email is required!'})
    ];
    validationManager.checkField('email', name, value, validators, this.authErrorManager, false);
}

export function checkUsername(name, value) {
    const validators = [
        new ValidateMinLength(3),
        new ValidateMaxLength(64),
        new ValidateIsAlphaNumericAndSpace()
    ];
    validationManager.checkField('username', name, value, validators, this.authErrorManager, true);
}

export function checkPassword(name, value) {
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

export function checkConfirmPassword(name, value) {
    const validator = [new ValidatePasswordMatch(this.authData.password)];
    validationManager.checkField('confirmPassword', name, value, validator, this.authErrorManager, false);
}


export function checkAllAuthData(name, value) {
    this.checkUsername(name, value);
    this.checkEmail(name, value);
    this.checkPassword(name, value);
    this.checkConfirmPassword(name, value);
}

