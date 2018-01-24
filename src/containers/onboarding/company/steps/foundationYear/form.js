import React, {Component} from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import Form from './../../../../../components/main/form'
import Button from './../../../../../components/main/button'
import { OnboardingInput } from './../../../../../components/onboarding'
import { renderField } from 'components/form/helpers'

import {
    saveFoundationYearData,
    showWebsiteAndSocialMediaStep,
    gotoWebsiteAndSocialMediaStep,
} from './../../../../../actions/companyOnboarding'

import { SubmissionError } from 'redux-form'
import { checkEmailAvailability } from 'actions/authorization'

//Validations
import * as V from 'components/main/form/validations'
import {normalizeYear} from 'components/main/form/normalizations'

let FoundationYearForm = props => {

	const { handleSubmit, submitting, error, invalid, valid, dispatch, onSubmit } = props
	const submitDisabled = invalid || submitting || error

	const submit = (values, dispatch) => {
        dispatch(saveFoundationYearData(values))
        dispatch(showWebsiteAndSocialMediaStep())
        dispatch(gotoWebsiteAndSocialMediaStep())
	}

	return (
			<form onSubmit={handleSubmit(submit)}>
			<Field
					type='int'
					name='foundationYear'
					label='Year'
					validate={[V.required,V.year]}
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

FoundationYearForm = reduxForm({
	form: 'foundationYearForm',
})(FoundationYearForm)


FoundationYearForm = connect(
  state => ({
    initialValues: state.companyOnboarding // pull previous values from onboarding state
  })
)(FoundationYearForm)

export default FoundationYearForm
