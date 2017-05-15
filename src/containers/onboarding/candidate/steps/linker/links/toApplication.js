import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { SHOW_APPLICATION_STEP } from './../../../../../../constants/candidateOnboarding'
import { showApplicationStep } from './../../../../../../actions/candidateOnboarding'
import { NavigationLink, NavigationLink2 } from './../../../../../../components/main/navigation'
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
        const stateItem = onboardingState.application

        let value = ''
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
                    if (isEnabled) dispatch(showApplicationStep())
                }}
                textLabel='Application'
                textFilledWith={value}
            />
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

const LinkToApplicationStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_APPLICATION_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToApplicationStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToApplicationStep
