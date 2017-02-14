import { validateForgot } from './validator';

export const forgotForm = ({
    form: 'forgotPassword',
    fields: ['email'],
    validate: validateForgot
});
