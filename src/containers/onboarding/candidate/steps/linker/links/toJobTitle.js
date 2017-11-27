import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { SHOW_JOB_TITLE_STEP, JOB_TITLE_DROPDOWN_DATA } from './../../../../../../constants/candidateOnboarding'
import { showJobTitleStep, gotoJobTitleStep } from './../../../../../../actions/candidateOnboarding'
import { NavigationLink, NavigationLink2 } from './../../../../../../components/main/navigation'
import CallStep from './../../../../callStep'
import { NavLinkLabel } from '../../../../renderHelpers'
import { findById } from '../../../../../../constants/dropdownData'

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
        const stateItem = onboardingState.jobTitle
        const stateParent = onboardingState.jobTitleHead

        let value = ''
        if(stateParent) {
            value += stateParent.value + ' | '
        }
        if(stateItem) {
            value += stateItem.value
        }

        return(
            <NavigationLink2
                style={{
                    cursor : isFilled || isActive ? 'pointer' : 'default'
                }}
                active={isActive}
                filled={isFilled}
                onClick={() => {
                    if (isEnabled) {
                      dispatch(showJobTitleStep())
                      dispatch(gotoJobTitleStep())
                    }
                }}
                textLabel='Job Title'
                textFilledWith={value}
            />
        )

        /*return (
            <NavigationLink
                style={{
                    cursor : isFilled || isActive ? 'pointer' : 'default'
                }}
                active={isActive}
                filled={isFilled}
                onClick={() => {
                    if (isEnabled) dispatch(showJobTitleStep())
                }}
            >
                <NavLinkLabel {... {
                    defaultLabel : 'Job Title',
                    value : stateItem ? stateItem.value : null,
                    item
                }} />
            </NavigationLink>
        )*/
    }
}

To.propTypes = {
    onboardingState : PropTypes.object,
    isActive : PropTypes.bool,
    isFilled : PropTypes.bool,
    isEnabled : PropTypes.bool,
    dispatch : PropTypes.func
}

const LinkToJobTitleStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_JOB_TITLE_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToJobTitleStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToJobTitleStep
