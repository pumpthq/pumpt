import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'

import Form from 'components/main/form'
import { OnboardingInput } from 'components/onboarding'
import Button from 'components/main/button'
import { SubmissionError } from 'redux-form'

import { saveSetUpPasswordData as companySaveSetUpPasswordData } from 'actions/companyOnboarding';
import { applyForMembership as companyApplyForMembership } from 'actions/companyOnboarding';


//Validations
const validate = values => {
  const errors = {}

	if (!values.password) {
		errors.password = "Can\'t be Blank"
	}
	else if (!values.passwordRepeat) {
		errors.passwordRepeat = "Can\'t be Blank"
	}
	else if (values.password.length < 8) {
		errors.password = "Must be 8 characters or More"
	}
	else if (values.passwordRepeat.length < 8) {
		errors.passwordRepeat = "Must be 8 characters or More"
	}
	else if (values.passwordRepeat !== values.password){
		errors.passwordRepeat = 'Passwords do not match.'
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

//form
const CompanyFinalForm = props => {
	const { handleSubmit, submitting, error, invalid, valid, dispatch, onSubmit } = props
	const submitDisabled = invalid || submitting || error

	const submit = (values, dispatch) => {
				dispatch(companySaveSetUpPasswordData(values))

        /* workaround for using redux-saga to handle a redux-form submission */
        const P = new Promise((resolve,reject) => {
          dispatch(companyApplyForMembership(resolve,reject)) //injecting resolve/reject into the saga generator
        })

        return P.catch(err => { //from reject call from saga generator
					throw new SubmissionError({ _error: JSON.stringify(err) })
        })
	}

	return (
		<form onSubmit={handleSubmit(submit)}>
				<fieldset class="form__row">
					<div class="mdl-textfield mdl-js-textfield textfield is-upgraded textfield_size_l">
						<Field
								type='password'
								name='password'
								label='Password'
								component={renderField}
							/>
					</div>
				</fieldset>
				<fieldset class="form__row">
					<div class="mdl-textfield mdl-js-textfield textfield is-upgraded textfield_size_l">
						<Field
								type='password'
								name='passwordRepeat'
								label='Confirm password'
								component={renderField}
						/>
					</div>
				</fieldset>

                    {error && <span class="textfield__error">{error}</span>}
				<div class='form__actions form__actions_v-align_center'>
						<Button
								type='submit'
								disabled={!valid || submitting}
								typeColored
								buttonSize='l'
						>
								Next
						</Button>
						<p class='text'>
								By clicking ‘Apply for Membership’,
								you agree to the
								<a class='link' target="_blank" href='http://pumpthq.com/terms'> Terms &amp; Conditions</a>.
						</p>
				</div>
		</form>
)
}

export default reduxForm({
	form: 'companyOnboardingFinal',
	validate
})(CompanyFinalForm)
