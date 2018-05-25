import React from 'react'
import {Field, reduxForm, SubmissionError} from 'redux-form'
import {connect} from 'react-redux';
import * as V from 'components/main/form/validations'
import {renderField} from 'components/form/helpers'

import {Checkbox} from 'redux-form-material-ui'
import Button from './../../../../../components/main/button';
import {THIS_EMAIL_IS_ALREADY_REGISTERED,} from './../../../../../constants/candidateOnboarding';
import {gotoDegreeStep, saveContactInfoData, showDegreeStep,} from 'actions/candidateOnboarding';
import {checkEmailAvailability} from 'actions/authorization'
//Places Autocomplete Library
import {PlaceField} from 'components/main/form/PlaceField'

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
		const submitDisabled = invalid || submitting || error

		//Props for AutoComplete Item (Special)
		const cssClasses = {
			input: 'mdl-textfield__input textfield__input'
		}

    // handleSubmit function
    const submit = (values, dispatch) => {
			dispatch(saveContactInfoData(values))
			dispatch(showDegreeStep()) //this can also be called in a saga
      dispatch(gotoDegreeStep()) 

		}

		return (
				<form onSubmit={handleSubmit(submit)}>

						<fieldset className="form__row">
								<Field
										label="First Name"
										name="firstName"
										type="text"
										component={renderField}
										validate={V.required}
									/>
						</fieldset>
						<fieldset className="form__row">
								<Field
										label="Last Name"
										name="lastName"
										type="text"
										component={renderField}
										validate={V.required}
									/>
						</fieldset>
						<fieldset className="form__row">
								<Field
										label="Email"
										name="email"
										type="email"
										component={renderField}
										validate={[V.email_validation,V.required]}
									/>
						</fieldset>
            <fieldset className="form__row">
								<Field
										label="LinkedIn Url"
										name="socialMedia.linkedInUrl"
										type="text"
										component={renderField}
										validate={[V.required,V.url]}
									/>
						</fieldset>
						<fieldset className="form__row">
								<Field
									name="location"
									label="Current Location"
									component={PlaceField}
									validate={V.required}
								 />

								<Field name="abilityToRelocate" id="abilityToRelocate" component={Checkbox} label="Willing to Relocate?"/>

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
