import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {SHOW_EXPERIENCE_STEP} from './../../../../../../constants/candidateOnboarding'
import {gotoExperienceStep, showExperienceStep} from './../../../../../../actions/candidateOnboarding'
import {NavigationLink2} from './../../../../../../components/main/navigation'
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
        const stateItem = onboardingState.experience

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
                    if (isEnabled) {
                      dispatch(showExperienceStep())
                      dispatch(gotoExperienceStep())
                    }
                }}
                textLabel='Years of Experience'
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
