export const RESEND_TOKEN_TO_EMAIL = 'RESEND_TOKEN_TO_EMAIL';
export const CLEAN_MESSAGE = 'CLEAN_MESSAGE';

export const cleanMessage = () => ({
    type: CLEAN_MESSAGE,
});

export const resendTokenToEmail = email => ({
    type: RESEND_TOKEN_TO_EMAIL,
    payload: { email },
});
