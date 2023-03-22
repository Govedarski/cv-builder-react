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
    validationManager.check('email', name, value, validators, this.setAuthErrors, false);
}

export function checkUsername(name, value) {
    const validators = [
        new ValidateMinLength(3),
        new ValidateMaxLength(64),
        new ValidateIsAlphaNumericAndSpace()
    ];
    validationManager.check('username', name, value, validators, this.setAuthErrors, true);
}

export function checkPassword(name, value) {
    const validators = [
        new ValidateMinLength(8),
        new ValidateUppercaseCharactersMinCount(1),
        new ValidateNumberCharactersMinCount(1),
        new ValidateSpecialSymbols(1)
    ];

    if (this.authErrors?.password?.length > 4) {
        validators.push(
            new ValidatePasswordMatch(this.authData.confirmPassword)
        );
    }

    validationManager.check('password', name, value, validators, this.setAuthErrors, false);
}

export function checkConfirmPassword(name, value) {
    if (name !== 'confirmPassword') {
        return;
    }
    let error = validationManager.validate(
        [new ValidatePasswordMatch(this.authData.password)],
        'password',
        value,
        this.SetAuthErrors)[0];
    validationManager.setError(this.setAuthErrors, 'password', error, 4);
}


export function checkAllAuthData(name, value) {
    this.checkEmail(name, value);
    this.checkUsername(name, value);
    this.checkPassword(name, value);
    this.checkConfirmPassword(name, value);
}

