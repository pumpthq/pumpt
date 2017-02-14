import emailValidator from 'email-validator';

const MIN_PASSWORD_LENGTH = 6;
//const CAN_NOT_BE_BLANK = 'Can\'t be blank';

export const validateForgot = ({ email }) => {
    if (!email) {
        return { email: 'Can\'t be blank' };
    }

    if (!emailValidator.validate(email)) {
        return { email: 'Invalid Email' };
    }

    return {};
};

export const validateLogin = ({ email, password }) => {
    const errors = {};

    if (!email) {
        errors.email = 'Can\'t be blank';
    } else if (!emailValidator.validate(email)) {
        errors.email = 'Invalid Email';
    }

    if (!password) {
        errors.password = 'Can\'t be blank';
    }

    return errors;
};

export const validateChangePassword = ({ currentPass, newPass, confirmPass }) => {
    const errors = {};

    if (!currentPass) {
        errors.currentPass = 'Can\'t be blank';
    } else if (currentPass.length < MIN_PASSWORD_LENGTH) {
        errors.currentPass = 'Not valid password';
    }

    if (newPass && confirmPass && newPass !== confirmPass) {
        errors.confirmPass = 'Passwords not matched';
    }

    if (!newPass) {
        errors.newPass = 'Can\'t be blank';
    } else if (newPass.length < MIN_PASSWORD_LENGTH) {
        errors.newPass = 'Not valid password';
    }

    if (!confirmPass) {
        errors.confirmPass = 'Can\'t be blank';
    } else if (confirmPass.length < MIN_PASSWORD_LENGTH) {
        errors.confirmPass = 'Not valid password';
    }

    return errors;
};
