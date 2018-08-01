import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm, SubmissionError} from 'redux-form'
import Button from './../../../../../components/main/button'
import {renderField} from 'components/form/helpers';

import {
    gotoValuesStep,
    saveWebsiteAndSocialMediaData,
    showValuesStep,
} from './../../../../../actions/companyOnboarding'

import * as V from 'components/main/form/validations'

let SocialMediaForm = props => {
		const { handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = props
		const submitDisabled = invalid || submitting || asyncValidating || error

    // handleSubmit function
    const submit = (values, dispatch) => {
			dispatch(saveWebsiteAndSocialMediaData(values))
      dispatch(showValuesStep())
			dispatch(gotoValuesStep())
		}
	return (
			<form onSubmit={handleSubmit(submit)} className="application-form medium">
					<fieldset class="form__row">
						<Field
								label="Website URL"
								name="websiteUrl"
								type="text"
								component={renderField}
								validate={[V.required,V.url]}
							/>
					</fieldset>
					<fieldset class="form__row">
						<Field
								label="LinkedIn Profile URL"
								name="linkedIneUrl"
								type="text"
								component={renderField}
                validate={[V.url]}
							/>
					</fieldset>
					<fieldset class="form__row">
						<Field
								label="Twitter URL"
								name="twitterUrl"
								type="text"
								component={renderField}
                validate={[V.url]}
							/>
					</fieldset>
					<fieldset class="form__row">
						<Field
								label="Facebook Profile URL"
								name="facebookUrl"
								type="text"
								component={renderField}
                validate={[V.url]}
							/>
					</fieldset>
					<div class='form__actions'>
							<Button
									type='submit'
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

SocialMediaForm = reduxForm({
	form: 'socialMediaForm',
})(SocialMediaForm)


SocialMediaForm = connect(
  state => ({
    initialValues: state.companyOnboarding // pull previous values from onboarding state
  })
)(SocialMediaForm)

export default SocialMediaForm
