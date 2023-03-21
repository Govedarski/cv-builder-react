import {validator} from '../../../../../utils/validation/validator.js';
import {
    validateIsAlphaAndSpace,
    validateMaxLength,
    validateMinLength
} from '../../../../../utils/validation/validation_functions.js';


export function checkFirstName(name, value) {
    const validators = [
        validateMinLength.bind(null, 2),
        validateMaxLength.bind(null, 64),
        validateIsAlphaAndSpace
    ];
    validators.check('firstName', name, value, validators, this.setProfileErrors, true);
}
export function checkLastName(name, value) {
    const validators = [
        validateMinLength.bind(null, 2),
        validateMaxLength.bind(null, 64),
        validateIsAlphaAndSpace
    ];
    validators.check('lastName', name, value, validators, this.setProfileErrors, true);
}

export function checkCity(name, value) {
    const validators = [
        validateMinLength.bind(null, 2),
        validateMaxLength.bind(null, 64),
        validateIsAlphaAndSpace
    ];
    validators.check('city', name, value, validators, this.setProfileErrors, true);
}

export function checkAllProfileData(name, value) {
    this.checkFirstName(name, value);
    this.checkLastName(name, value);
    this.checkCity(name, value);
    validator.showAllErrors(this.setProfileErrors, true);
}
