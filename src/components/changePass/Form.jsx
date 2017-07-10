import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form'

import SubmitButton from './SubmitButton.jsx';
import CancelLink from './CancelLink.jsx';
import PassInput from './PassInput.jsx';
import Title from './Title.jsx';
import ScrollContainer from 'components/main/scrollContainer'
import './style.less'
import {required, passwordConfirm, minLength } from 'components/main/form/validations'

import {changePassword} from 'actions/authorization'
import { browserHistory } from 'react-router'

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
//Generalized Redux Field
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div>
    <div>
      <input class="mdl-textfield__input textfield__input" {...input} placeholder={label} type={type} />
      {touched && (error && <span class="textfield__error">{error}</span>)}
    </div>
  </div>
)

let ChangePassForm = props => {

	const { handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = props
	const submitDisabled = invalid || submitting || asyncValidating || error

    const submit = (values, dispatch) => {
			dispatch(changePassword(values))
		}

	return (
					<div className='change-password-popup'>
							<button
									style={buttonStyle}
									className="button button_type_close"
									onClick={browserHistory.goBack}
							>
									×
							</button>
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
													<CancelLink handleClose={browserHistory.goBack} />
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
