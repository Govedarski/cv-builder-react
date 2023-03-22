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
    validationManager.check('firstName', name, value, validators, this.setProfileErrors, true);

}
export function checkLastName(name, value) {
    const validators = [
        new ValidateMinLength(2),
        new ValidateMaxLength(64),
        new ValidateIsAlphaAndSpace()
    ];
    validationManager.check('lastName', name, value, validators, this.setProfileErrors, true);
}

export function checkCity(name, value) {
    const validators = [
        new ValidateMinLength(2),
        new ValidateMaxLength(64),
        new ValidateIsAlphaAndSpace()
    ];
    validationManager.check('city', name, value, validators, this.setProfileErrors, true);
}

export function checkPhoneNumber(name, value) {
    const validators = [
        new ValidateMinLength(8),
    ];
    validationManager.check('phoneNumber', name, value, validators, this.setProfileErrors, true);
}


export function checkAllProfileData(name, value) {
    this.checkFirstName(name, value);
    this.checkLastName(name, value);
    this.checkCity(name, value);
    this.checkPhoneNumber(name, value);
}
