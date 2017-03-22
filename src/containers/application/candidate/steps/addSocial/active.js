import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import validateJs from 'validate.js'
import Form from './../../../../../components/main/form'
import Button from './../../../../../components/main/button'
import { OnboardingInput } from './../../../../../components/onboarding'
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'
import LinkedInIcon from './../../../../../components/icons/linkedIn'
import TwitterIcon from './../../../../../components/icons/twitter'
import FacebookIcon from './../../../../../components/icons/facebook'
import {
    saveSocialMediaData,
    cancelSocialMediaStep
} from './../../../../../actions/applicationCandidate'

@connect(
    function mapStateToProps(state, ownProps) {
        const {
            linkedInProfileUrl,
            twitterUsername,
            facebookProfileUrl
        } = state.applicationCandidate.socialMedia

        return {
            initialValues : {
                linkedInProfileUrl,
                twitterUsername,
                facebookProfileUrl
            }
        }
    },
    function mapDispatchToProps(dispatch, ownProps) {
        return {
            dispatch
        }
    }
)
@reduxForm({
    form : 'ApplicationAddSocialForm',
    fields : [
        'linkedInProfileUrl',
        'twitterUsername',
        'facebookProfileUrl'
    ],
    touchOnChange : true,
    validate : (values) => {
        const errors = {}
        const {
            linkedInProfileUrl,
            twitterUsername,
            facebookProfileUrl
        } = values
        const urlSchema = {
            url : true
        }


        if (linkedInProfileUrl) {
            if (validateJs.single(`http://${linkedInProfileUrl.replace('http://').replace('https://')}`, urlSchema)) {
                errors.linkedInProfileUrl = 'Invalid URL'
            }
        }

        if (facebookProfileUrl) {
            if (validateJs.single(`http://${facebookProfileUrl.replace('http://').replace('https://')}`, urlSchema)) {
                errors.facebookProfileUrl = 'Invalid URL'
            }
        }

        return errors
    },
    onSubmit : () => {

    }
})
class AddSocialForm extends Component {
    render() {

        const {
            fields : {
                linkedInProfileUrl,
                twitterUsername,
                facebookProfileUrl
            },
            dispatch,
            handleSubmit
        } = this.props

        return (
            <DescriptionListItem>
                <Form onSubmit={
                    handleSubmit((fields, dispatch) => {
                        if (!fields.linkedInProfileUrl && !fields.twitterUsername && !fields.facebookProfileUrl) {
                            return dispatch(cancelSocialMediaStep({
                                replace : true
                            }))
                        }
                        dispatch(saveSocialMediaData({
                            ...fields
                        }))
                    })
                }>
                    <fieldset class="form__row">
                        <OnboardingInput
                            {...linkedInProfileUrl}
                            label='LinkedIn Profile URL'
                            beforeImg={
                                <LinkedInIcon/>
                            }
                            textFieldSize={false}
                            additionalClass='textfield_type_social'
                            error={linkedInProfileUrl.touched && linkedInProfileUrl.error}
                        />
                    </fieldset>
    
                    <fieldset class="form__row">
                        <OnboardingInput
                            {...twitterUsername}
                            label='Twitter @username'
                            beforeImg={
                                <TwitterIcon/>
                            }
                            textFieldSize={false}
                            additionalClass='textfield_type_social'
                        />
                    </fieldset>
    
                    <fieldset class="form__row">
                        <OnboardingInput
                            {...facebookProfileUrl}
                            label='Facebook Profile URL'
                            beforeImg={
                                <FacebookIcon/>
                            }
                            textFieldSize={false}
                            additionalClass='textfield_type_social'
                            error={facebookProfileUrl.touched && facebookProfileUrl.error}
                        />
                    </fieldset>
                    <div class="form__actions">
                        <Button
                            type='submit'
                            typeColored
                        >
                            Add
                        </Button>
                        <a class="link" href="" onClick={(event) => {
                            event.preventDefault()
                            dispatch(cancelSocialMediaStep({}))
                        }}>
                            Cancel
                        </a>
                    </div>
                </Form>
            </DescriptionListItem>
        )
    }
}

AddSocialForm.propTypes = {
    fields : PropTypes.object,
    submitting : PropTypes.bool,
    invalid : PropTypes.bool,
    handleSubmit : PropTypes.func,
    dispatch : PropTypes.func
}

export default AddSocialForm
