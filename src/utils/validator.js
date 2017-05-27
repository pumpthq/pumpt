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

export const validateChangePassword = ({ oldPassword, newPassword, confirmPass }) => {
    const errors = {};

    if (!oldPassword) {
        errors.oldPassword = 'Can\'t be blank';
    } else if (oldPassword.length < MIN_PASSWORD_LENGTH) {
        errors.oldPassword = 'Not valid password';
    }

    if (newPassword && confirmPass && newPassword !== confirmPass) {
        errors.confirmPass = 'Passwords not matched';
    }

    if (!newPassword) {
        errors.newPassword = 'Can\'t be blank';
    } else if (newPassword.length < MIN_PASSWORD_LENGTH) {
        errors.newPassword = 'Not valid password';
    }

    if (!confirmPass) {
        errors.confirmPass = 'Can\'t be blank';
    } else if (confirmPass.length < MIN_PASSWORD_LENGTH) {
        errors.confirmPass = 'Not valid password';
    }

    return errors;
};
