import React, {Component} from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import Form from './../../../../../components/main/form'
import Button from './../../../../../components/main/button'
import { ListLink, ListItem } from './../../../../../components/main/list'
import { OnboardingInput } from './../../../../../components/onboarding'
import ChainIcon from './../../../../../components/icons/chain'
import LinkedInIcon from './../../../../../components/icons/linkedIn'
import TwitterIcon from './../../../../../components/icons/twitter'
import FacebookIcon from './../../../../../components/icons/facebook'

import {
    saveWebsiteAndSocialMediaData,
    showValuesStep
} from './../../../../../actions/companyOnboarding'
import { SubmissionError } from 'redux-form'

//Field Validations
const required = value => (value ? undefined : 'Can\'t be Blank')

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

let SocialMediaForm = props => {
		const { handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = props
		const submitDisabled = invalid || submitting || asyncValidating || error

    // handleSubmit function
    const submit = (values, dispatch) => {
			dispatch(saveWebsiteAndSocialMediaData(values))
			dispatch(showValuesStep())
		}
	return (
			<form onSubmit={handleSubmit(submit)}>
					<fieldset class="form__row">
						<Field
								label="Website URL"
								name="websiteUrl"
								type="text"
								component={renderField}
								validate={required}
							/>
					</fieldset>
					<fieldset class="form__row">
						<Field
								label="LinkedIn Profile URL"
								name="linkedIneUrl"
								type="text"
								component={renderField}
							/>
					</fieldset>
					<fieldset class="form__row">
						<Field
								label="Twitter @username"
								name="twitterUrl"
								type="text"
								component={renderField}
							/>
					</fieldset>
					<fieldset class="form__row">
						<Field
								label="Facebook Profile URL"
								name="facebookUrl"
								type="text"
								component={renderField}
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
    initialValues: state.candidateOnboarding // pull previous values from onboarding state
  })
)(SocialMediaForm)

export default SocialMediaForm
