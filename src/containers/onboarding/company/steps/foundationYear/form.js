import React, {Component} from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import Form from './../../../../../components/main/form'
import Button from './../../../../../components/main/button'
import { OnboardingInput } from './../../../../../components/onboarding'

import {
    saveFoundationYearData,
    showWebsiteAndSocialMediaStep
} from './../../../../../actions/companyOnboarding'

import { SubmissionError } from 'redux-form'
import { checkEmailAvailability } from 'actions/authorization'

//Validations
import {year} from 'components/main/form/validations'
import {normalizeYear} from 'components/main/form/normalizations'

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


const FoundationYearForm = props => {

	const { handleSubmit, submitting, error, invalid, valid, dispatch, onSubmit } = props
	const submitDisabled = invalid || submitting || error

	const submit = (values, dispatch) => {
        dispatch(saveFoundationYearData(values))
        dispatch(showWebsiteAndSocialMediaStep())
	}

	return (
			<form ref='innerForm' onSubmit={handleSubmit(submit)}>
			<Field
					type='int'
					name='foundationYear'
					label='Year'
					validate={year}
					normalize={normalizeYear}
					component={renderField}
			/>
					<div class='form__actions'>
							<Button type='submit'
											typeColored 
											buttonSize='l'
											disabled={submitDisabled}
							>
									Next
							</Button>
					</div>
			</form>
	)
}

export default reduxForm({
	form: 'foundationYearForm',
})(FoundationYearForm)
