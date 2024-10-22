import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {SHOW_COMPANY_SIZE_STEP} from './../../../../../../constants/candidateOnboarding'
import {gotoCompanySizeStep, showCompanySizeStep} from './../../../../../../actions/candidateOnboarding'
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
        const stateItem = onboardingState.preferredCompanySize

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
                      dispatch(showCompanySizeStep())
                      dispatch(gotoCompanySizeStep())
                    }
                }}
                textLabel='Preferred Company Size'
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

const LinkToCompanySizeStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_COMPANY_SIZE_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToCompanySizeStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToCompanySizeStep
