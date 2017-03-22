import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import validateJs from 'validate.js';
import Form from './../../../../../components/main/form';
import Button from './../../../../../components/main/button';
import { OnboardingInput } from './../../../../../components/onboarding';
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem';
import LinkedInIcon from './../../../../../components/icons/linkedIn';
import TwitterIcon from './../../../../../components/icons/twitter';
import FacebookIcon from './../../../../../components/icons/facebook';
import ChainIcon from './../../../../../components/icons/chain';
import {
    saveSocialMediaData,
    cancelSocialMediaStep,
} from './../../../../../actions/applicationCompany';

@connect(
    (state) => {
        const {
            websiteUrl,
            linkedInProfileUrl,
            twitterUsername,
            facebookProfileUrl,
        } = state.applicationCompany.socialMedia;

        return {
            initialValues: {
                websiteUrl,
                linkedInProfileUrl,
                twitterUsername,
                facebookProfileUrl,
            },
        };
    },
    (dispatch) => ({ dispatch })
)
@reduxForm({
    form: 'ApplicationCompanyAddSocialForm',
    fields: [
        'websiteUrl',
        'linkedInProfileUrl',
        'twitterUsername',
        'facebookProfileUrl',
    ],
    touchOnChange: true,
    validate: (values) => {
        const errors = {};
        const {
            linkedInProfileUrl,
            websiteUrl,
            facebookProfileUrl,
        } = values;
        const urlSchema = {
            url: true,
        };

        if (websiteUrl) {
            if (validateJs.single(`http://${websiteUrl.replace('http://').replace('https://')}`, urlSchema)) {
                errors.websiteUrl = 'Invalid URL';
            }
        }

        if (linkedInProfileUrl) {
            if (validateJs.single(`http://${linkedInProfileUrl.replace('http://').replace('https://')}`, urlSchema)) {
                errors.linkedInProfileUrl = 'Invalid URL';
            }
        }

        if (facebookProfileUrl) {
            if (validateJs.single(`http://${facebookProfileUrl.replace('http://').replace('https://')}`, urlSchema)) {
                errors.facebookProfileUrl = 'Invalid URL';
            }
        }

        return errors;
    },
    onSubmit: () => {

    },
})
class AddSocialForm extends Component {
    render() {
        const {
            fields: {
                websiteUrl,
                linkedInProfileUrl,
                twitterUsername,
                facebookProfileUrl,
            },
            dispatch,
            handleSubmit,
        } = this.props;

        return (
            <DescriptionListItem>
                <Form
                    onSubmit={
                        handleSubmit((fields) => {
                            if (!fields.websiteUrl && !fields.linkedInProfileUrl && !fields.twitterUsername && !fields.facebookProfileUrl) {
                                return dispatch(cancelSocialMediaStep({
                                    replace: true,
                                }));
                            }
                            return dispatch(saveSocialMediaData({
                                ...fields,
                            }));
                        })
                    }
                >
                    <fieldset className="form__row">
                        <OnboardingInput
                            {...websiteUrl}
                            label="Website URL"
                            beforeImg={
                                <ChainIcon />
                            }
                            textFieldSize={false}
                            additionalClass="textfield_type_social"
                            error={websiteUrl.touched && websiteUrl.error}
                        />
                    </fieldset>

                    <fieldset className="form__row">
                        <OnboardingInput
                            {...linkedInProfileUrl}
                            label="LinkedIn Profile URL"
                            beforeImg={
                                <LinkedInIcon />
                            }
                            textFieldSize={false}
                            additionalClass="textfield_type_social"
                            error={linkedInProfileUrl.touched && linkedInProfileUrl.error}
                        />
                    </fieldset>

                    <fieldset className="form__row">
                        <OnboardingInput
                            {...twitterUsername}
                            label="Twitter @username"
                            beforeImg={
                                <TwitterIcon />
                            }
                            textFieldSize={false}
                            additionalClass="textfield_type_social"
                        />
                    </fieldset>

                    <fieldset className="form__row">
                        <OnboardingInput
                            {...facebookProfileUrl}
                            label="Facebook Profile URL"
                            beforeImg={
                                <FacebookIcon />
                            }
                            textFieldSize={false}
                            additionalClass="textfield_type_social"
                            error={facebookProfileUrl.touched && facebookProfileUrl.error}
                        />
                    </fieldset>
                    <div className="form__actions">
                        <Button
                            type="submit"
                            typeColored
                        >
                            Add
                        </Button>
                        <a
                            className="link"
                            href=""
                            onClick={(event) => {
                                event.preventDefault();
                                dispatch(cancelSocialMediaStep({}));
                            }}
                        >
                            Cancel
                        </a>
                    </div>
                </Form>
            </DescriptionListItem>
        );
    }
}

AddSocialForm.propTypes = {
    fields: PropTypes.object,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
};

export default AddSocialForm;
