import {validationManager} from '../validatonManager.js';
import {
    ValidateIsAlphaAndSpace,
    ValidateMaxLength,
    ValidateMinLength
} from './validators.js';



function checkFirstName(name, value) {
    const validators = [
        new ValidateMinLength(2),
        new ValidateMaxLength(64),
        new ValidateIsAlphaAndSpace()
    ];
    validationManager.checkField('firstName', name, value, validators, this.profileErrorManager, true);
}
function checkLastName(name, value) {
    const validators = [
        new ValidateMinLength(2),
        new ValidateMaxLength(64),
        new ValidateIsAlphaAndSpace()
    ];
    validationManager.checkField('lastName', name, value, validators, this.profileErrorManager, true);
}

function checkCity(name, value) {
    const validators = [
        new ValidateMinLength(2),
        new ValidateMaxLength(64),
        new ValidateIsAlphaAndSpace()
    ];
    validationManager.checkField('city', name, value, validators, this.profileErrorManager, true);
}

function checkPhoneNumber(name, value) {
    const validators = [
        new ValidateMinLength(13),
    ];
    validationManager.checkField('phoneNumber', name, value, validators, this.profileErrorManager, true);
}


function checkAllProfileData(name, value) {
    this.checkFirstName(name, value);
    this.checkLastName(name, value);
    this.checkCity(name, value);
    this.checkPhoneNumber(name, value);
}

export const profileValidator = {
    checkFirstName,
    checkLastName,
    checkCity,
    checkPhoneNumber,
    checkAllProfileData
}

export function createProfileValidators(errorManager) {
    return {
        ...profileValidator,
        profileErrorManager: errorManager
    }
}

