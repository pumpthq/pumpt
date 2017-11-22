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
import { checkCompanyNameAvailability } from 'actions/authorization'

import * as V from 'components/main/form/validations'
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

//Async Validation - on if email is already registered + on Company Name Uniqueness
function composeAsyncValidators(validatorFns) {
  return async (values, dispatch, props, field) => {
      if(field) {
          const validatorFn = validatorFns[field]
          return validatorFn(values, dispatch, props, field);
      }else{ // form is trying to run async validations on submit

          // OPTION 1: perform all async validations onSubmit, delaying submission
          let errors;
          for (const validatorFn of Object.values(validatorFns)) {
            try {
              await validatorFn(values, dispatch, props, field);
            } catch (err) {
              errors = Object.assign({}, errors, err);
            }
          }

          if (errors) throw errors;
          return new Promise((resolve)=> {resolve()})

          // OPTION 2: skip async validations onSubmit and just return a resolved promise
          //return new Promise(resolve=> resolve())
      }
  };
}

const emailValidate = (values, dispatch) => {
	const { email } = values
	const error = { email: THIS_EMAIL_IS_ALREADY_REGISTERED }

	return dispatch(checkEmailAvailability(email))
        .then((data) => {
    		if (data.email === true) { throw error }
    		if (data.email.length) { throw error }
    		else { return {} }
    	})
}

const companyNameValidate = (values, dispatch) => {
	const { companyName } = values
	const error = { companyName: THIS_COMPANY_IS_ALREADY_REGISTERED }

    return dispatch(checkCompanyNameAvailability(companyName))
			.then((data) => {
				if (data.companyName === true) {throw error}
			})
}

const asyncValidate = composeAsyncValidators({
  email:emailValidate,
  companyName:companyNameValidate
});

let OnboardingCompanyContactInfo = props => {
		const { handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = props
		const submitDisabled = invalid || submitting || error || asyncValidating

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
									validate={[V.required, V.minLength(3)]}
								/>
						</fieldset>
						<fieldset class="form__row">
							<Field
									label="Your Name"
									name="fullName"
									type="text"
									component={renderField}
									validate={V.required}
								/>
						</fieldset>
						<fieldset class="form__row">
							<Field
									label="Your Job Title"
									name="jobTitle"
									type="text"
									component={renderField}
									validate={V.required}
								/>
						</fieldset>
						<fieldset class="form__row">
							<Field
									label="Email"
									name="email"
									type="email"
									component={renderField}
									validate={[V.required, V.email_validation]}
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
  asyncBlurFields: ['email', 'companyName']
})(OnboardingCompanyContactInfo)


OnboardingCompanyContactInfo = connect(
  state => ({
    initialValues: state.companyOnboarding // pull previous values from onboarding state
  })
)(OnboardingCompanyContactInfo)

export default OnboardingCompanyContactInfo
