import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { SHOW_INDUSTRY_STEP, INDUSTRY_DROPDOWN_DATA } from './../../../../../../constants/candidateOnboarding'
import { showIndustryStep, gotoIndustryStep } from './../../../../../../actions/candidateOnboarding'
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
      const stateItem = onboardingState.industries;
      let industries = "";
        if (stateItem) {
            industries = stateItem.map(({ value }) => value).join(' | ');
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
                      dispatch(showIndustryStep())
                      dispatch(gotoIndustryStep())
                    }
                }}
                textLabel='Industry'
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

const LinkToIndustryStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_INDUSTRY_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToIndustryStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToIndustryStep
