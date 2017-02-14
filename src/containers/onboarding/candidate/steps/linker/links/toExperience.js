import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { SHOW_EXPERIENCE_STEP, EXPERIENCE_DROPDOWN_DATA } from './../../../../../../constants/candidateOnboarding'
import { showExperienceStep } from './../../../../../../actions/candidateOnboarding'
import { NavigationLink } from './../../../../../../components/main/navigation'
import CallStep from './../../../../callStep'
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
        const stateItem = onboardingState.experience
        let item = null

        stateItem ? item = findById({
            id : stateItem.id,
            data : EXPERIENCE_DROPDOWN_DATA
        }) : null

        return (
            <NavigationLink
                style={{
                    cursor : isFilled || isActive ? 'pointer' : 'default'
                }}
                active={isActive}
                filled={isFilled}
                onClick={() => {
                    if (isEnabled) dispatch(showExperienceStep())
                }}
            >{item ? stateItem.value || item.title : 'Experience'}</NavigationLink>
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

const LinkToExperienceStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_EXPERIENCE_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToExperienceStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToExperienceStep
