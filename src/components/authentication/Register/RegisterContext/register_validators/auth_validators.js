import {validator} from '../../../../../utils/validation/validator.js';
import {
    validateEmail,
    validateIsAlphaNumericAndSpace, validateIsFilledIn,
    validateMaxLength,
    validateMinLength,
    validateNumberCharactersMinCount,
    validatePasswordMatch,
    validateSpecialSymbols,
    validateUppercaseCharactersMinCount
} from '../../../../../utils/validation/validation_functions.js';


export function checkEmail(name, value) {
    const validators = [validateEmail, validateIsFilledIn]
    validator.check("email", name, value, validators, this.setAuthErrors, false)
}

export function checkUsername(name, value) {
    const validators = [
        validateMinLength.bind(null, 3),
        validateMaxLength.bind(null, 64),
        validateIsAlphaNumericAndSpace
    ]
    validator.check("username", name, value, validators, this.setAuthErrors, true)
}

export function checkPassword(name, value) {
    const validators = [
        validateMinLength.bind(null, 8),
        validateUppercaseCharactersMinCount.bind(null, 1),
        validateNumberCharactersMinCount.bind(null, 1),
        validateSpecialSymbols.bind(null, 1)
    ]
    validator.check("password", name, value, validators, this.setAuthErrors, false)
}

export function checkConfirmPassword(name, value) {
    const validators = [validatePasswordMatch.bind(null, this.authData.password)]
    validator.check("confirmPassword", name, value, validators, this.setAuthErrors, false)
}

export function checkAllAuthData(name, value){
    this.checkEmail(name, value);
    this.checkUsername(name, value);
    this.checkPassword(name, value);
    this.checkConfirmPassword(name, value);
    validator.showAllErrors(this.setAuthErrors, true);
}

