import validator from 'validator';

export const url = value => {
	if (!value) { return undefined }
	if(!validator.isURL(value)) { return "Invalid URL" }
	return undefined
}
export const date = value => value && value.length !== 7 ? 'Invalid Date' : undefined
export const required = value => (value ? undefined : 'Can\'t be Blank')
