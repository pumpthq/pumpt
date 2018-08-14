import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {SHOW_EMPLOYMENT_STEP} from './../../../../../../constants/candidateOnboarding'
import {gotoEmploymentStep, showEmploymentStep} from './../../../../../../actions/candidateOnboarding'
import {NavigationLink2} from './../../../../../../components/main/navigation'
import CallStep from './../../../../callStep'
import {findById} from '../../../../../../constants/dropdownData'
import {EMPLOYMENT_DROPDOWN_DATA} from '../../../../../../constants/candidateOnboarding'

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
      const stateItem = onboardingState.industries;
      let industries = "";
        if (stateItem) {
          industries = stateItem.map(({ id }) => findById({
            id,
            data : EMPLOYMENT_DROPDOWN_DATA
          }).title
          ).join(' | ');
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
                      dispatch(showEmploymentStep())
                      dispatch(gotoEmploymentStep())
                    }
                }}
                textLabel='Preferred Employment Type'
                textFilledWith={industries}
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

const LinkToEmploymentStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_EMPLOYMENT_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToEmploymentStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToEmploymentStep
