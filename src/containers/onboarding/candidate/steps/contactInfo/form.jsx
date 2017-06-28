import React, {Component} from 'react'
import { Link } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux';
import PlacesAutocomplete from 'react-places-autocomplete'

import co from 'co';
import Button from './../../../../../components/main/button';
import {
    THIS_EMAIL_IS_ALREADY_REGISTERED,
} from './../../../../../constants/candidateOnboarding';
import {
    saveContactInfoData,
    showIndustryStep,
} from 'actions/candidateOnboarding';

import { SubmissionError } from 'redux-form'
import { checkEmailAvailability } from 'actions/authorization'

//Field Validations
const required = value => (value ? undefined : 'Can\'t be Blank')
const email_validation = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

//Generalized Redux Field
const renderField = ({
  input,
  label,
  type,
  meta: { asyncValidating, touched, error }
}) => (
  <div>
		<div class={asyncValidating ? 'async-validating' : 'class'}>
      <input class="mdl-textfield__input textfield__input" {...input} placeholder={label} type={type} />
      {touched && error && <span class="textfield__error">{error}</span>}
    </div>
  </div>
)

//Async Validation - on if email is already registered
const asyncValidate = (values, dispatch) => {
	const { email } = values
	const error = { email: THIS_EMAIL_IS_ALREADY_REGISTERED }

	return dispatch(checkEmailAvailability(email))
        .then((data) => {
    		if (data.email === true) { throw error }
    		if (data.email.length) { throw error }
    		else { return {} }
    	})
}

//Form
const OnboardingCandidateContactInfo = props => {
		const { handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = props
			const submitDisabled = invalid || submitting || asyncValidating || error

		//Props for AutoComplete Item (Special)
		const cssClasses = {
			input: 'mdl-textfield__input textfield__input'
		}

    // handleSubmit function
    const submit = (values, dispatch) => {
	//		return dispatch(saveContactInfoData(values)).then(dispatch(showIndustryStep()))
				return dispatch(showIndustryStep())
		}

		return (
				<form onSubmit={handleSubmit(submit)}>

						<fieldset className="form__row">
								<Field
										label="First Name"
										name="firstName"
										type="text"
										component={renderField}
										validate={required}
									/>
						</fieldset>
						<fieldset className="form__row">
								<Field
										label="Last Name"
										name="lastName"
										type="text"
										component={renderField}
										validate={required}
									/>
						</fieldset>
						<fieldset className="form__row">
								<Field
										label="Email"
										name="email"
										type="email"
										component={renderField}
										validate={[email_validation,required]}
									/>
						</fieldset>
						<fieldset className="form__row">
							<PlacesAutocomplete
								//inputProps={inputProps}
								classNames={cssClasses}/>

								<Field
									name="abilityToRelocate"
									id="abilityToRelocation"
									component="input"
									type="checkbox"
								/>
								<label>Willing to Relocate</label>
						</fieldset>
						{error && <span class="textfield__error">{error}</span>}
						<div className="form__actions">
								<Button
										type="submit"
										typeColored
										buttonSize="l"
										disabled={submitDisabled}
								>
										Get Started
								</Button>
						</div>
				</form>
		);
}

export default reduxForm({
	form: 'onboardingCandidateContactForm',
	asyncValidate,
  asyncBlurFields: ['email']
})(OnboardingCandidateContactInfo)
