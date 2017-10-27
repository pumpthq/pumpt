import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import PopUpBig from './../../components/main/popup'
import { Link } from 'react-router'
import Form from './../../components/main/form'
import { reduxForm, Field } from 'redux-form'
import { OnboardingInput } from './../../components/onboarding'
import emailValidator from 'email-validator'
import { forgotPassword } from '../../actions/authorization'
import {required, email_validation } from 'components/main/form/validations'

function mapStateToProps(state) {
    return { apiError: state.apiError.message };
}

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
    form : 'forgotPassword',
    validate : (values) => {
        const errors = {}

        if (!values.email) {
            errors.email = 'Can\'t be blank'
        } else if (!emailValidator.validate(values.email)) {
            errors.email = 'Invalid Email'
        }

        return errors
    },
    onSubmit : (values, dispatch) => {
      const {email} = values
      dispatch(forgotPassword({ email }))
    }
})
class ForgotPasswordForm extends Component {

    constructor(props) {
        super(props)

        this.state = {}
    }



    render() {
        const {
            handleSubmit,
            submitting,
            invalid,
            anyTouched,
            dispatch,
            apiError,
        } = this.props

        return (
            <PopUpBig
                heading='Forgot Password'
            >
                <Form onSubmit={handleSubmit}>
                    <Field
                      name="email"
                      component={EmailField}
                      placeholder="Email"
                      apiError={apiError}
                      validate={[required, email_validation]}
                    />

                    <div class="form__actions">
                        <button
                            type="submit"
                            class="mdl-button button button_margin-right_m button_type_colored button_size_50p"
                            disabled={submitting}
                        >
                            Request reset link
                        </button>
                        <Link class="link" to='/story/login'>Back to log in</Link>
                    </div>
                </Form>
            </PopUpBig>
        )
    }
}

ForgotPasswordForm.propTypes = {
    handleSubmit : PropTypes.func,
    submitting : PropTypes.bool,
    invalid : PropTypes.bool,
    dispatch : PropTypes.func
}
ForgotPasswordForm.defaultProps = {}


const EmailField = ({ input, placeholder, apiError, meta: { touched, error } }) => (
  <div>
    <input {...input} class="mdl-textfield__input textfield__input" type='email' placeholder={placeholder} />
    {touched && error &&
      <span class="textfield__error">{error}</span>
    }
    {apiError &&
      <span class="textfield__error">{apiError}</span>
    }
  </div>
)

export default ForgotPasswordForm
