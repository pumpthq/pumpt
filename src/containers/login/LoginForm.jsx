import React from 'react'
import {Link} from 'react-router'
import {Field, reduxForm, SubmissionError} from 'redux-form'
import {Checkbox} from 'redux-form-material-ui';

import {login} from 'actions/authorization'
import {renderField} from 'components/form/helpers';

//Validations
const required = value => (value ? undefined : 'Can\'t be Blank')
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

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
			<form class="application-form large" onSubmit={handleSubmit(submit)}>
						<Field
							name="email"
							type="email"
							component={renderField}
							label="Email"
							validate={[required, email]}
						/>

						<Field
							name="password"
							type="password"
							component={renderField}
							label="Password"
							validate={[required]}
						/>

        <div className="py-4">
          <Field
            name="remember"
            type="checkbox"
            component={Checkbox}
            label="Stay logged in?"
          />
        </div>

                    {error && <span class="textfield__error">{error}</span>}
					<div class="form__actions">
						<button
							type="submit"
							class="button_type_colored button_size_l"
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
