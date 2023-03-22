import {validationManager} from '../../../../../utils/validation/validatonManager.js';
import {
    ValidateIsAlphaAndSpace,
    ValidateMaxLength,
    ValidateMinLength
} from '../../../../../utils/validation/validators.js';



export function checkFirstName(name, value) {
    const validators = [
        new ValidateMinLength(2),
        new ValidateMaxLength(64),
        new ValidateIsAlphaAndSpace()
    ];
    validationManager.checkField('firstName', name, value, validators, this.setProfileErrors, true);

}
export function checkLastName(name, value) {
    const validators = [
        new ValidateMinLength(2),
        new ValidateMaxLength(64),
        new ValidateIsAlphaAndSpace()
    ];
    validationManager.checkField('lastName', name, value, validators, this.setProfileErrors, true);
}

export function checkCity(name, value) {
    const validators = [
        new ValidateMinLength(2),
        new ValidateMaxLength(64),
        new ValidateIsAlphaAndSpace()
    ];
    validationManager.checkField('city', name, value, validators, this.setProfileErrors, true);
}

export function checkPhoneNumber(name, value) {
    const validators = [
        new ValidateMinLength(8),
    ];
    validationManager.checkField('phoneNumber', name, value, validators, this.setProfileErrors, true);
}


export function checkAllProfileData(name, value) {
    this.checkFirstName(name, value);
    this.checkLastName(name, value);
    this.checkCity(name, value);
    this.checkPhoneNumber(name, value);
}
