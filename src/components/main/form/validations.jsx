import validator from 'validator';

export const url = value => {
	if (!value) { return undefined }
	if(!validator.isURL(value)) { return "Invalid URL" }
	return undefined
}
export const date = value => value && value.length !== 7 ? 'Invalid Date' : undefined
export const required = value => (value ? undefined : 'Can\'t be Blank')

export const email_validation = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
