import validator from 'email-validator';

class Validator {
    showByDefault=false;

    constructor(options = {}) {
        this.show = options.show;
        this.errorMessage = options.errorMessage;
    }

    getError(defaultErrorMessage) {
        return {
            error: this.errorMessage || (defaultErrorMessage),
            show: this.show || this.showByDefault
        };
    }
}

export class ValidateMinLength extends Validator {
    constructor(minLength, options = {}) {
        super(options);
        this.minLength = minLength;
    }

    validate(name, value) {
        value = value || '';
        if (value.length < this.minLength) {
            return this.getError(`${name} must be at least ${this.minLength} characters long!`);
        }
    }
}

export class ValidateMaxLength extends Validator {
    showByDefault = true;

    constructor(maxLength, options = {}) {
        super(options);
        this.maxLength = maxLength;
    }

    validate(name, value) {
        value = value || '';
        if (value.length > this.maxLength) {
            return this.getError(`${name} should be ${this.maxLength} characters or less!`);
        }
    }
}

export class ValidateIsAlphaNumericAndSpace extends Validator {
    showByDefault = true;

    validate(name, value) {
        if (!value.match(/^[A-Za-z0-9\s]+$/)) {
            return this.getError(`${name} must contain only letters, numbers and spaces!`);
        }
    }
}

export class ValidateIsAlphaAndSpace extends Validator {
    showByDefault = true;

    validate(name, value) {
        if (!value.match(/^[a-zA-Z\u0400-\u04FF\s]+$/)) {
            return this.getError(`${name} must contain only letters and spaces!`);
        }
    }
}

export class ValidateEmail extends Validator {
    validate(name, value) {
        if (value !== '' && !validator.validate(value)) {
            return this.getError(`"${value}" is not valid email!`);
        }
    }
}

export class ValidateUppercaseCharactersMinCount extends Validator {
    constructor(minCount, options = {}) {
        super(options);
        this.minCount = minCount;
    }

    validate(name, value) {
        let count = 0;
        for (const char of value) {
            if (char.toLowerCase() !== char && ++count === this.minCount) {
                console.log('return');
                return;
            }
        }
        return this.getError(`${name} must contain at least ${this.minCount} uppercase characters!"`);
    }
}

export class ValidateNumberCharactersMinCount extends Validator {
    constructor(minCount, options = {}) {
        super(options);
        this.minCount = minCount;
    }

    validate(name, value) {
        let count = 0;
        for (const char of value) {
            if (!isNaN(char) && ++count === this.minCount) {
                return;
            }
        }
        return this.getError(`${name} must contain at least ${this.minCount} number!"`);
    }
}

export class ValidateSpecialSymbols extends Validator {
    specialCharacters = '?!@#$%^&*()_+-=[]{};\':"|,.<>\\/';

    constructor(minCount, options = {}) {
        super(options);
        this.minCount = minCount;
        this.specialCharacters = options.specialCharacters || this.specialCharacters;
    }

    validate(name, value) {
        let count = 0;
        for (const char of value) {
            if (this.specialCharacters.includes(char) && ++count === this.minCount) {
                return;
            }
        }
        return this.getError(`${name} must contain at least ${this.minCount} special symbols!"`);
    }
}

export class ValidatePasswordMatch extends Validator {
    constructor(password, options = {}) {
        super(options);
        this.password = password;
    }

    validate(name, value) {
        if (value !== this.password) {
            return this.getError('Password mismatched!');
        }
    }
}


export class ValidateMinValue extends Validator {
    constructor(minValue, options = {}) {
        super(options);
        this.minValue = minValue;
    }

    validate(name, value) {
        if (value < this.minValue) {
            return this.getError(`${name} must be at least ${this.minValue}!`);
        }
    }
}