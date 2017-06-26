import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'

import Form from '../../../components/main/form'
import { OnboardingInput } from '../../../components/onboarding'
import Button from './../../../components/main/button'
import { SubmissionError } from 'redux-form'

import {
    saveSetUpPasswordData,
    applyForMembership,
} from 'actions/candidateOnboarding';

//Validations
const required = value => (value ? undefined : 'Can\'t be Blank')
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

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
const FinalForm = props => {
	const { handleSubmit, submitting, error, valid, dispatch, onSubmit } = props

	// handleSubmit function with submit validation
	// //WIP: NOTHING HAPPENS
	const submit = function(values) {
		return(dispatch) => {
			try{
				dispatch(saveSetUpPasswordData(values)).then(
						dispatch(applyForMembership())
					);
			}
			catch(err) {
					throw new SubmissionError({ _error: 'Something Went Wrong' })
			}
		};
	}

	return (
		<Form onSubmit={handleSubmit(submit)}>
				<fieldset class="form__row">
					<div class="mdl-textfield mdl-js-textfield textfield is-upgraded textfield_size_l">
						<Field
								type='password'
								name='password'
								label='Password'
								component={renderField}
								validate={[required, minLength(8)]}
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
								validate={[required, minLength(8)]}
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
		</Form>
)
}

export default reduxForm({
	form: 'onboardingFinal'
})(FinalForm)
