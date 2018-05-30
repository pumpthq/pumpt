import React from 'react';
import {Field, reduxForm} from 'redux-form'

import SubmitButton from './SubmitButton.jsx';
import CancelLink from './CancelLink.jsx';
import Title from './Title.jsx';
import './style.less'

import {changePassword} from 'actions/authorization'
import {browserHistory} from 'react-router'
import {renderField} from 'components/form/helpers'

const buttonStyle = {
    cursor: 'pointer',
};

//Validations
const validate = values => {
  const errors = {}

	if (!values.oldPassword) {
		errors.oldPassword = "Can\'t be Blank"
	}
	else if (!values.newPassword) {
		errors.newPassword = "Can\'t be Blank"
	}
	else if (!values.confirmPass) {
		errors.confirmPass = "Can\'t be Blank"
	}
	else if (values.newPassword.length < 8) {
		errors.newPassword = "Must be 8 characters or More"
	}
	else if (values.confirmPass.length < 8) {
		errors.confirmPass = "Must be 8 characters or More"
	}
	else if (values.confirmPass !== values.newPassword){
		errors.confirmPass = 'Passwords do not match.'
	}

	return errors
}

let ChangePassForm = props => {

	const { handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = props
	const submitDisabled = invalid || submitting || asyncValidating || error

    const submit = (values, dispatch) => {
			dispatch(changePassword(values))
		}

	return (
					<div className='change-password-popup'>
						<div>
									<Title />
									<form className="form form_padding-size_xs" onSubmit={handleSubmit(submit)}>
											<Field
												name='oldPassword'
												type="password"
												component={renderField}
												label="Current"
											/>
											<Field
												name='newPassword'
												type="password"
												component={renderField}
												label="New"
												//validate={[required, minLength(8)]}
											/>
											<Field
												name='confirmPass'
												type="password"
												component={renderField}
												label="Confirm"
												//validate={[required, minLength(8), passwordConfirm]}
											/>

											<div className="form__actions">
													<SubmitButton isDisabled={submitDisabled} />
											</div>
									</form>
							</div>
					</div>
	)
}

ChangePassForm = reduxForm({
	form: 'changePassForm',
	validate,
})(ChangePassForm)

export default ChangePassForm
