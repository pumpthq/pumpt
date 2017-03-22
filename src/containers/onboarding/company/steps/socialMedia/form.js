import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import validateJs from 'validate.js'
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

@connect(
    function mapStateToProps(state, ownProps) {
        const { companyOnboarding } = state
        const { websiteUrl, linkedInProfileUrl, twitterUsername, facebookProfileUrl } = companyOnboarding

        return {
            initialValues : {
                websiteUrl,
                linkedInProfileUrl,
                twitterUsername,
                facebookProfileUrl
            }
        }
    }
)
@reduxForm({
    form : 'websiteAndSocialMediaCompanyOnboarding',
    fields : [
        'websiteUrl',
        'linkedInProfileUrl',
        'twitterUsername',
        'facebookProfileUrl'
    ],
    validate : (values) => {
        const errors = {}
        const {
            websiteUrl,
            linkedInProfileUrl,
            twitterUsername,
            facebookProfileUrl
        } = values
        const urlSchema = {
            url : true
        }

        if (!websiteUrl) {
            errors.websiteUrl = 'Can\'t be blank'
        } else if (validateJs.single(`http://${websiteUrl.replace('http://').replace('https://')}`, urlSchema)) {
            errors.websiteUrl = 'Invalid URL'
        }

        /*if (!linkedInProfileUrl) {
            errors.linkedInProfileUrl = 'Can\'t be blank'
        } else */

        if (linkedInProfileUrl && validateJs.single(`http://${linkedInProfileUrl.replace('http://').replace('https://')}`, urlSchema)) {
            errors.linkedInProfileUrl = 'Invalid URL'
        }

        /*if (!twitterUsername) {
            errors.twitterUsername = 'Can\'t be blank'
        }*/

        /*if (!facebookProfileUrl) {
            errors.facebookProfileUrl = 'Can\'t be blank'
        } else */

        if (facebookProfileUrl && validateJs.single(`http://${facebookProfileUrl.replace('http://').replace('https://')}`, urlSchema)) {
            errors.facebookProfileUrl = 'Invalid URL'
        }

        return errors
    },
    onSubmit : (fields, dispatch) => {
        dispatch(saveWebsiteAndSocialMediaData(fields))
        dispatch(showValuesStep())
    }
})
class SocialMediaForm extends Component {
    render() {
        const {
            fields : {
                websiteUrl,
                linkedInProfileUrl,
                twitterUsername,
                facebookProfileUrl
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
                        label='Website URL'
                        beforeImg={
                            <ChainIcon/>
                        }
                        additionalClass='textfield_type_social'
                        {...websiteUrl}
                        error={websiteUrl.touched && websiteUrl.error}
                    />
                </fieldset>
                <fieldset class="form__row">
                    <OnboardingInput
                        label='LinkedIn Profile URL'
                        beforeImg={
                            <LinkedInIcon/>
                        }
                        additionalClass='textfield_type_social'
                        {...linkedInProfileUrl}
                        error={linkedInProfileUrl.touched && linkedInProfileUrl.error}
                    />
                </fieldset>
                <fieldset class="form__row">
                    <OnboardingInput
                        label='Twitter @username'
                        type="text"
                        beforeImg={
                            <TwitterIcon/>
                        }
                        additionalClass='textfield_type_social'
                        {...twitterUsername}
                        error={twitterUsername.touched && twitterUsername.error}
                    />
                </fieldset>
                <fieldset class="form__row">
                    <OnboardingInput
                        label='Facebook Profile URL'
                        beforeImg={
                            <FacebookIcon/>
                        }
                        additionalClass='textfield_type_social'
                        {...facebookProfileUrl}
                        error={facebookProfileUrl.touched && facebookProfileUrl.error}
                    />
                </fieldset>
                <div class='form__actions'>
                    <Button 
                        type='submit'
                        typeColored
                        buttonSize='l'
                        disabled={isDisabledSubmit}
                    >
                        Next
                    </Button>
                </div>
            </Form>
        )
    }
}

SocialMediaForm.propTypes = {
    fields : PropTypes.object,
    submitting : PropTypes.bool,
    invalid : PropTypes.bool,
    handleSubmit : PropTypes.func
}

export default SocialMediaForm
