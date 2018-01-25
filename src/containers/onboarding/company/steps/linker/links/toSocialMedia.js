import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {SHOW_WEBSITE_AND_SOCIAL_MEDIA_STEP} from './../../../../../../constants/companyOnboarding'
import {
    gotoWebsiteAndSocialMediaStep,
    showWebsiteAndSocialMediaStep
} from './../../../../../../actions/companyOnboarding'
import {NavigationLink2} from './../../../../../../components/main/navigation'
import CallStep from './../../../../callStep'

@connect(
    function mapStateToProps(state) {
        const onboardingState = state.companyOnboarding

        return {
            state,
            onboardingState
        }
    },
    function mapDispatchToProps(dispatch) {
        return {
            dispatch
        }
    }
)
export class To extends Component {
    render() {
        const {
            onboardingState,
            isActive,
            isFilled,
            isEnabled,
            dispatch,
            label
        } = this.props
        const { websiteUrl } = onboardingState

        return(
            <NavigationLink2
                style={{
                    cursor : isFilled || isActive ? 'pointer' : 'default'
                }}
                active={isActive}
                filled={isFilled}
                onClick={() => {
                    if (isEnabled) {
                      dispatch(showWebsiteAndSocialMediaStep())
                      dispatch(gotoWebsiteAndSocialMediaStep())
                    }
                }}
                textLabel={label}
                textFilledWith={websiteUrl}
            />
        )

    }
}

To.propTypes = {
    onboardingState : PropTypes.object,
    isActive : PropTypes.bool,
    isFilled : PropTypes.bool,
    isEnabled : PropTypes.bool,
    dispatch : PropTypes.func,
    label : PropTypes.string
}
To.defaultProps = {
    label : 'Website & Social Media'
}

const LinkToWebsiteAndSocialMediaStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_WEBSITE_AND_SOCIAL_MEDIA_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToWebsiteAndSocialMediaStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToWebsiteAndSocialMediaStep
