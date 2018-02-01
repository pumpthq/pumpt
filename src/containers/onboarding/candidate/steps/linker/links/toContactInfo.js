import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {SHOW_CONTACT_INFO_STEP} from './../../../../../../constants/candidateOnboarding'
import {gotoContactInfoStep, showContactInfoStep} from './../../../../../../actions/candidateOnboarding'
import {NavigationLink, NavigationUserInfo} from './../../../../../../components/main/navigation'
import CallStep from './../../../../callStep'

@connect(
    function mapStateToProps(state) {
        const onboardingState = state.candidateOnboarding

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
            dispatch
        } = this.props

        if (isFilled) {
            const { firstName, lastName, email, location } = onboardingState
            const fullName = `${firstName || ''} ${lastName || ''}`

            return (
                <NavigationUserInfo
                    style={{
                        cursor : isFilled || isActive ? 'pointer' : 'default'
                    }}
                    name={fullName}
                    email={email}
										location={location}
                    onClick={() => {
                    if (isEnabled) {
                      dispatch(showContactInfoStep())
                      dispatch(gotoContactInfoStep())
                    }
                }}
                />
            )
        }

        return (
            <NavigationLink
                style={{
                    cursor : isFilled ? 'pointer' : 'default'
                }}
                active={isActive}
                onClick={() => {
                  if (isEnabled) {
                    dispatch(showContactInfoStep())
                    dispatch(gotoContactInfoStep())
                  }
                }}
            >Contact Info</NavigationLink>
        )
    }
}

To.propTypes = {
    onboardingState : PropTypes.object,
    isActive : PropTypes.bool,
    isFilled : PropTypes.bool,
    isEnabled : PropTypes.bool,
    dispatch : PropTypes.func
}

const LinkToContactInfoStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_CONTACT_INFO_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToContactInfoStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToContactInfoStep
