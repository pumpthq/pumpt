import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {SHOW_DEGREE_STEP} from './../../../../../../constants/candidateOnboarding'
import {gotoDegreeStep, showDegreeStep} from './../../../../../../actions/candidateOnboarding'
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
        const stateItem = onboardingState.degree

        let value = ''
        if(stateItem) {
          value += stateItem.value
        }

        return (
            <NavigationLink2
                style={{
                    cursor : isFilled || isActive ? 'pointer' : 'default'
                }}
                active={isActive}
                filled={isFilled}
                onClick={() => {
                    if (isEnabled) {
                      dispatch(showDegreeStep())
                      dispatch(gotoDegreeStep())
                    }
                }}
                textLabel='Degree'
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

const LinkToDegreeStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_DEGREE_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToDegreeStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToDegreeStep
