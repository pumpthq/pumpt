import React, { Component } from 'react'
import { reduxForm, Field} from 'redux-form'
import { connect } from 'react-redux'
import co from 'co'
import emailValidator from 'email-validator'
import PlacesAutocomplete from 'react-places-autocomplete'

import Form from './../../../../../components/main/form'
import Button from './../../../../../components/main/button'
import { OnboardingInput } from './../../../../../components/onboarding'

import {
    THIS_EMAIL_IS_ALREADY_REGISTERED,
    THIS_COMPANY_IS_ALREADY_REGISTERED
} from './../../../../../constants/companyOnboarding'
import {
    fetchByEmail as getCompanyByEmail,
    isAvailable as isAvailableCompanyName
} from './../../../../../sagas/companyOnboarding'
import {
    saveContactInfoData,
    showCompanyTypeStep
} from './../../../../../actions/companyOnboarding'
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

let OnboardingCompanyContactInfo = props => {
		const { handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = props
		const submitDisabled = invalid || submitting || error

    // handleSubmit function
    const submit = (values, dispatch) => {
        dispatch(saveContactInfoData(values))
        dispatch(showCompanyTypeStep())
		}

		return (
				<form onSubmit={handleSubmit(submit)}>
						<fieldset class="form__row">
							<Field
									label="Company Name"
									name="companyName"
									type="text"
									component={renderField}
									validate={required}
								/>
						</fieldset>
						<fieldset class="form__row">
							<Field
									label="Your Name"
									name="fullName"
									type="text"
									component={renderField}
									validate={required}
								/>
						</fieldset>
						<fieldset class="form__row">
							<Field
									label="Your Job Title"
									name="jobTitle"
									type="text"
									component={renderField}
									validate={required}
								/>
						</fieldset>
						<fieldset class="form__row">
							<Field
									label="Email"
									name="email"
									type="email"
									component={renderField}
									validate={[required, email_validation]}
								/>
						</fieldset>
						<div class='form__actions'>
								<Button
										type='submit'
										typeColored
										buttonSize='l'
										disabled={submitDisabled}
								>
										Get Started
								</Button>
						</div>
				</form>
		)
}

OnboardingCompanyContactInfo = reduxForm({
	form: 'onboardingCompanyContactForm',
	asyncValidate,
  asyncBlurFields: ['email']
})(OnboardingCompanyContactInfo)


OnboardingCompanyContactInfo = connect(
  state => ({
    initialValues: state.companyOnboarding // pull previous values from onboarding state
  })
)(OnboardingCompanyContactInfo)

export default OnboardingCompanyContactInfo
