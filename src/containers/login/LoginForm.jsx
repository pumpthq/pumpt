import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import { OnboardingInput } from './../../components/onboarding'
import { uiLogin } from './../../sagas/authorization'
import emailValidator from 'email-validator'

@reduxForm({
    form : 'login',
    fields : [
        'email',
        'password'
    ],
    validate : (values) => {
        const errors = {}

        if (!values.email) {
            errors.email = 'Can\'t be blank'
        } else if (!emailValidator.validate(values.email)) {
            errors.email = 'Invalid Email'
        }

        if (!values.password) {
            errors.password = 'Can\'t be blank'
        }

        return errors
    },
    onSubmit : (fields, dispatch) => {
        return uiLogin.apply({ dispatch }, [fields])
    },
    returnRejectedSubmitPromise: true
})
class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        const {
            fields : {
                email,
                password
            },
            handleSubmit,
            submitting,
            invalid
        } = this.props
        const isDisabledSubmit = invalid || submitting

        return (
            <form class="form form_padding-size_xs" onSubmit={handleSubmit}>
                <fieldset class="form__row form__row_indent-size_m">
                    <OnboardingInput
                        label='Email'
                        type="email"
                        {...email}
                        error={email.touched && email.error}
                    />
                </fieldset>
                <fieldset class="form__row form__row_indent-size_m">
                    <OnboardingInput
                        label='Password'
                        type='password'
                        {...password}
                        error={password.touched && password.error}
                    />
                </fieldset>
                <div class="form__actions">
                    <button
                        type="submit"
                        class="mdl-button button button_margin-right_m button_type_colored button_size_50p"
                        onSubmit={this.props.handleSubmit}
                        disabled={isDisabledSubmit}>Log In</button>
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

}

LoginForm.propTypes = {
    fields : PropTypes.shape({
        email : PropTypes.object,
        password : PropTypes.object
    }),
    handleSubmit : PropTypes.func,
    submitting : PropTypes.bool,
    invalid : PropTypes.bool
}
LoginForm.defaultProps = {}

export default LoginForm
