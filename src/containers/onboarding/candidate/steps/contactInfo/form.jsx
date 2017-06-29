import React, {Component} from 'react'
import { Link } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux';

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

//Places Autocomplete Field
const AutocompleteItem = ({ formattedSuggestion }) => (
	<div>
		<strong>{ formattedSuggestion.mainText }</strong>{' '}
		<small>{ formattedSuggestion.secondaryText }</small>
	</div>
)

export const PlaceField = ({ values, input, onChange, label, meta: { touched, error }, ...rest }) => {
	const hasError = touched && error;
	const id = input.name;

	const classes={
		input: 'mdl-textfield__input'
	}

	//NOTE: restrict to city results only
	const options = {
		types: ['(cities)']
		//componentRestrictions: new google.maps.ComponentRestrictions('country:us|country:pr|country:vi|country:gu|country:mp')
	}

	//WIP: restrict results to US only (US already prioritizes, but not exlusive)
	//Trying to configure using [https://github.com/kenny-hibino/react-places-autocomplete, https://developers.google.com/maps/documentation/javascript/reference#AutocompletionRequest]


	const inputProps = {
		value : input.value,
		onChange : input.onChange,
		id : id,
		typeAhead : false,
		inputName : input.name,
		autocompleteItem : AutocompleteItem,
		placeholder : label,
		classNames : classes,
	}

	return (
		<div className={`form-group${hasError ? ' has-danger' : ''}`}>
			<label className="form-control-label" htmlFor={id}>{input.label}</label>

			<PlacesAutocomplete
				inputProps={inputProps}
				options={options}
			/>

			{hasError && <div className="form-control-feedback">{error}</div>}
		</div>
	);
}

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
