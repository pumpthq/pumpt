import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import co from 'co';
import emailValidator from 'email-validator';
import Form from './../../../../../components/main/form';
import Button from './../../../../../components/main/button';
import { OnboardingInput } from './../../../../../components/onboarding';
import {
    THIS_EMAIL_IS_ALREADY_REGISTERED,
} from './../../../../../constants/candidateOnboarding';
import {
    fetchByEmail as getCandidateByEmail,
} from './../../../../../sagas/candidateOnboarding';
import {
    saveContactInfoData,
    showIndustryStep,
} from './../../../../../actions/candidateOnboarding';

@connect(
    (state) => {
        const { candidateOnboarding } = state;
        const { firstName, lastName, email } = candidateOnboarding;

        return {
            initialValues: {
                firstName,
                lastName,
                email,
            },
        };
    }
)
@reduxForm({
    form: 'onboardingCandidateContactInfo',
    fields: [
        'firstName',
        'lastName',
        'email',
    ],
    alwaysAsyncValidate: true,
    asyncBlurFields: ['email'],
    validate: (values) => {
        const errors = {};

        if (!values.firstName) {
            errors.firstName = 'Can\'t be blank';
        }

        if (!values.lastName) {
            errors.lastName = 'Can\'t be blank';
        }

        if (!values.email) {
            errors.email = 'Can\'t be blank';
        } else if (!emailValidator.validate(values.email)) {
            errors.email = 'Invalid Email';
        }

        return errors;
    },
    asyncValidate: (values) => {
        const { email } = values;
        return co(function* () {
            return yield {
                * email() {
                    const error = {
                        email: THIS_EMAIL_IS_ALREADY_REGISTERED,
                    };
                    let candidate;

                    try {
                        candidate = yield getCandidateByEmail(email);
                    } catch (ex) {
                        throw error;
                    }

                    if (candidate.email === true) {
                        throw error;
                    }

                    if (candidate.length) {
                        throw error;
                    }

                    return {};
                },
            };
        });
    },
    onSubmit: (fields, dispatch) => {
        dispatch(saveContactInfoData(fields));
        dispatch(showIndustryStep());
    },
})
    // TODO
class ContactInfoForm extends Component {
    render() {
        const {
            fields: {
                firstName,
                lastName,
                email,
            },
            handleSubmit,
            submitting,
            invalid,
        } = this.props;
        const isDisabledSubmit = invalid || submitting;

        return (
            <Form onSubmit={handleSubmit}>
                <fieldset className="form__row">
                    <OnboardingInput
                        label="First Name"
                        {...firstName}
                        error={firstName.touched && firstName.error}
                    />
                </fieldset>
                <fieldset className="form__row">
                    <OnboardingInput
                        label="Last Name"
                        {...lastName}
                        error={lastName.touched && lastName.error}
                    />
                </fieldset>
                <fieldset className="form__row">
                    <OnboardingInput
                        type="email"
                        label="Email"
                        {...email}
                        error={email.touched && email.error}
                    />
                </fieldset>
                <div className="form__actions">
                    <Button
                        type="submit"
                        typeColored
                        buttonSize="l"
                        disabled={isDisabledSubmit}
                    >
                        Get Started
                    </Button>
                </div>
            </Form>
        );
    }
}

ContactInfoForm.propTypes = {
    fields: PropTypes.object,
    asyncValidating: PropTypes.bool,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
};

export default ContactInfoForm;
