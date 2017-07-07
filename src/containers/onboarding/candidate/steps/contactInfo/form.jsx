import React, {Component} from 'react'
import { Link } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import { Checkbox, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { required, email_validation } from 'components/main/form/validations'

//Places Autocomplete Library
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

//Places Autocomplete Library
import { PlaceField } from 'components/main/form/PlaceField'

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

const renderCheckbox = ({ input, label }) => (
	<Form.Field>
		<Checkbox
			label={label}
			checked={input.value ? true : false}
			onChange={(e, { checked }) => input.onChange(checked)}
		/>
	</Form.Field>
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
let OnboardingCandidateContactInfo = props => {
		const { handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = props
		const submitDisabled = invalid || submitting || asyncValidating || error

		//Props for AutoComplete Item (Special)
		const cssClasses = {
			input: 'mdl-textfield__input textfield__input'
		}

    // handleSubmit function
    const submit = (values, dispatch) => {
			dispatch(saveContactInfoData(values))
			dispatch(showIndustryStep()) //this can also be called in a saga
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
								<Field
									name="location"
									label="Current Location"
									component={PlaceField}
									validate={required}
								 />
								<Field
									name="abilityToRelocate"
									label="Willing to Relocate?"
									component={renderCheckbox}
								/>
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

OnboardingCandidateContactInfo = reduxForm({
	form: 'onboardingCandidateContactForm',
	asyncValidate,
  asyncBlurFields: ['email']
})(OnboardingCandidateContactInfo)


OnboardingCandidateContactInfo = connect(
  state => ({
    initialValues: state.candidateOnboarding // pull previous values from onboarding state
  })
)(OnboardingCandidateContactInfo)

export default OnboardingCandidateContactInfo
