import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import Form from '../../../components/main/form'
import { OnboardingInput } from '../../../components/onboarding'
import Button from './../../../components/main/button'

@reduxForm({
    form : 'onboardingFinal',
    fields : [
        'password',
        'passwordRepeat'
    ],
    validate : (values) => {
        const errors = {}

        if (!values.password || values.password.length < 6) {
            errors.password = 'Must be at least 6 characters long'
        }

        if (!values.passwordRepeat) {
            errors.passwordRepeat = 'Can\'t be blank'
        }

        if (values.passwordRepeat !== values.password) {
            errors.passwordRepeat = 'The password doesn\'t match'
        }

        return errors
    }
})
class FinalForm extends Component {
    render() {
        const {
            fields : {
                password,
                passwordRepeat
            },
            handleSubmit,
            submitting,
            invalid,
            
            onSubmit
        } = this.props
        const isDisabledSubmit = invalid || submitting

        return (
            <Form onSubmit={(event) => {
                event.preventDefault()

                handleSubmit(onSubmit)
            }}>
                <fieldset class="form__row">
                    <OnboardingInput
                        type='password'
                        label='Password'
                        {...password}
                        error={password.touched && password.error}
                    />
                </fieldset>
                <fieldset class="form__row">
                    <OnboardingInput
                        type='password'
                        label='Confirm password'
                        {...passwordRepeat}
                        error={passwordRepeat.touched && passwordRepeat.error}
                    />
                </fieldset>
                <div class='form__actions form__actions_v-align_center'>
                    <Button
                        type='submit'
                        typeColored
                        buttonSize='l'
                        disabled={isDisabledSubmit}
                    >
                        Next
                    </Button>
                    <p class='text'>
                        By clicking ‘Apply for Membership’,
                        you agree to the
                        <a class='link' href='http://pumpthq.com/terms-of-use.html'> Terms &amp; Conditions</a>.
                    </p>
                </div>
            </Form>
        )
    }
}

FinalForm.propTypes = {
    fields : PropTypes.object,
    submitting : PropTypes.bool,
    invalid : PropTypes.bool,
    handleSubmit : PropTypes.func,
    onSubmit : PropTypes.func
}

export default FinalForm
