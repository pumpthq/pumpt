import React, {Component} from 'react'
import { Link } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux';

import { login } from 'actions/authorization'
import { SubmissionError } from 'redux-form'

//Validations
const required = value => (value ? undefined : 'Can\'t be Blank')
const email = value =>
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
  meta: { touched, error }
}) => (
  <div>
    <div>
      <input class="mdl-textfield__input textfield__input" {...input} placeholder={label} type={type} />
      {touched && (error && <span class="textfield__error">{error}</span>)}
    </div>
  </div>
)



const LoginForm = props => {
	const { handleSubmit, submitting, error, valid, dispatch } = props

    // handleSubmit function with submit validation
    const submit = (values) => {
      return dispatch(login(values))
        .catch(err => {
            throw new SubmissionError({
                _error: 'Incorrect Username or Password' 
            })
        })
    }

	return (
			<form class="form form_padding-size_xs" onSubmit={handleSubmit(submit)}>
				<fieldset class="form__row form__row_indent-size_m">
					<div class="mdl-textfield mdl-js-textfield textfield is-upgraded textfield_size_l">
						<Field
							name="email"
							type="email"
							component={renderField}
							label="Email"
							validate={[required, email]}
						/>
					</div>
				</fieldset>


				<fieldset class="form__row form__row_indent-size_m">
					<div class="mdl-textfield mdl-js-textfield textfield is-upgraded textfield_size_l">
						<Field
							name="password"
							type="password"
							component={renderField}
							label="Password"
							validate={[required]}
						/>
					</div>
				</fieldset>

                    {error && <span class="textfield__error">{error}</span>}
					<div class="form__actions">
						<button
							type="submit"
							class="mdl-button button button_margin-right_m button_type_colored button_size_50p"
							disabled={!valid || submitting}
							>Log In</button>
						<Link class="link" to='/story/forgot'>Forgot Password?</Link>
					</div>
					<div class="form__subinfo">Not a member member yet? {` Begin as `}
						<Link class="link" to='/onboarding/candidate'>Candidate</Link>
						{` or `}
						<Link class="link" to='/onboarding/company'>Employer</Link>
					</div>

			</form>
	)
}

export default reduxForm({
	form: 'loginForm'
})(LoginForm)
