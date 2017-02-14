import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import PopUpBig from './../../components/main/popup'
import { Link } from 'react-router'
import Form from './../../components/main/form'
import { reduxForm } from 'redux-form'
import { OnboardingInput } from './../../components/onboarding'
import emailValidator from 'email-validator'
import { forgotPassword } from '../../actions/authorization'

function mapStateToProps(state) {
    return { apiError: state.apiError.message };
}

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
    form : 'forgotPassword',
    fields : [
        'email'
    ],
    validate : (values) => {
        const errors = {}

        if (!values.email) {
            errors.email = 'Can\'t be blank'
        } else if (!emailValidator.validate(values.email)) {
            errors.email = 'Invalid Email'
        }

        return errors
    }
})
class ForgotPasswordForm extends Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        const {
            fields : {
                email
            },
            handleSubmit,
            submitting,
            invalid,
            dispatch,
            apiError
        } = this.props
        const isDisabledSubmit = invalid || submitting;
        const { touched, error } = email;

        email.error = apiError ? apiError : touched ? error : '';

        return (
            <PopUpBig
                heading='Forgot Password'
            >
                <Form onSubmit={
                    handleSubmit((fields, dispatch) => {
                        dispatch(forgotPassword({ email }))
                    })
                }>
                    <OnboardingInput
                        label='Email'
                        type="email"
                        {...email}
                        error={email.touched && email.error}
                    />
                    <div class="form__actions">
                        <button
                            type="submit"
                            class="mdl-button button button_margin-right_m button_type_colored button_size_50p"
                            disabled={isDisabledSubmit}
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
    fields : PropTypes.shape({
        email : PropTypes.object,
        password : PropTypes.object
    }),
    handleSubmit : PropTypes.func,
    submitting : PropTypes.bool,
    invalid : PropTypes.bool,
    dispatch : PropTypes.func
}
ForgotPasswordForm.defaultProps = {}

export default ForgotPasswordForm
