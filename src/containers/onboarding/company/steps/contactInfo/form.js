import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import co from 'co'
import emailValidator from 'email-validator'

import Form from './../../../../../components/main/form'
import Button from './../../../../../components/main/button'
import { OnboardingInput } from './../../../../../components/onboarding'

import {
    THIS_EMAIL_IS_ALREADY_REGISTERED,
    THIS_COMPANY_IS_ALREADY_REGISTERED
} from './../../../../../constants/companyOnboarding'
import {
    fetchByEmail as getCompanyByEmail,
    isAvailable as isAvailableCompanyName
} from './../../../../../sagas/companyOnboarding'
import {
    saveContactInfoData,
    showCompanyTypeStep
} from './../../../../../actions/companyOnboarding'

@connect(
    function mapStateToProps(state, ownProps) {
        const { companyOnboarding } = state
        const { companyName, fullName, jobTitle, email } = companyOnboarding

        return {
            initialValues : {
                companyName,
                fullName,
                jobTitle,
                email
            }
        }
    }
)
@reduxForm({
    form : 'onboardingCompanyContactInfo',
    fields : [
        'companyName',
        'fullName',
        'jobTitle',
        'email'
    ],
    alwaysAsyncValidate : true,
    asyncBlurFields : ['email', 'companyName'],
    validate : (values) => {
        const errors = {}

        if (!values.companyName) {
            errors.companyName = 'Can\'t be blank'
        }

        if (!values.fullName) {
            errors.fullName = 'Can\'t be blank'
        }

        if (!values.jobTitle) {
            errors.jobTitle = 'Can\'t be blank'
        }

        if (!values.email) {
            errors.email = 'Can\'t be blank'
        } else if (!emailValidator.validate(values.email)) {
            errors.email = 'Invalid Email'
        }

        return errors
    },
    asyncValidate : (values, dispatch) => {
        const { email, companyName } = values

        return co(function * () {
            return yield {
                companyName : companyName ? function * () {
                    const error = {
                        companyName : THIS_COMPANY_IS_ALREADY_REGISTERED
                    }
                    let metaData

                    try {
                        metaData = yield isAvailableCompanyName({ companyName })
                    } catch (ex) {
                        throw error
                    }

                    if (!metaData.isAvailable) {
                        throw error
                    }

                    return {}
                } : null,
                email : email ? function * () {
                    const error = {
                        email : THIS_EMAIL_IS_ALREADY_REGISTERED
                    }
                    let company

                    try {
                        company = yield getCompanyByEmail(email)
                    } catch (ex) {
                        throw error
                    }

                    if (company.email == true) {
                        throw error
                    }

                    if (company.length) {
                        throw error
                    }

                    return {}
                } : null
            }
        })
    },
    onSubmit : (fields, dispatch) => {
        dispatch(saveContactInfoData(fields))
        dispatch(showCompanyTypeStep())
    }
})
class ContactInfoForm extends Component {
    render() {
        const {
            fields : {
                companyName,
                fullName,
                jobTitle,
                email
            },
            handleSubmit,
            submitting,
            invalid
        } = this.props
        const isDisabledSubmit = invalid || submitting

        return (
            <Form onSubmit={handleSubmit}>
                <fieldset class="form__row">
                    <OnboardingInput
                        label='Company Name'
                        {...companyName}
                        error={companyName.touched && companyName.error}
                    />
                </fieldset>
                <fieldset class="form__row">
                    <OnboardingInput
                        label='Your Name'
                        {...fullName}
                        error={fullName.touched && fullName.error}
                    />
                </fieldset>
                <fieldset class="form__row">
                    <OnboardingInput
                        label='Job Title'
                        {...jobTitle}
                        error={jobTitle.touched && jobTitle.error}
                    />
                </fieldset>
                <fieldset class="form__row">
                    <OnboardingInput
                        type='email'
                        label='Email'
                        {...email}
                        error={email.touched && email.error}
                    />
                </fieldset>
                <div class='form__actions'>
                    <Button
                        type='submit'
                        typeColored
                        buttonSize='l'
                        disabled={isDisabledSubmit}
                    >
                        Get Started
                    </Button>
                </div>
            </Form>
        )
    }
}

ContactInfoForm.propTypes = {
    fields : PropTypes.object,
    asyncValidating : PropTypes.bool,
    submitting : PropTypes.bool,
    invalid : PropTypes.bool,
    handleSubmit : PropTypes.func
}

export default ContactInfoForm
