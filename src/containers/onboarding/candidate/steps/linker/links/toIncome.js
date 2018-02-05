import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {SHOW_INCOME_STEP} from './../../../../../../constants/candidateOnboarding'
import {gotoIncomeStep, showIncomeStep} from './../../../../../../actions/candidateOnboarding'
import {NavigationLink2} from './../../../../../../components/main/navigation'
import CallStep from './../../../../callStep'

import { INCOME_NA_ID } from 'constants/candidateOnboarding';

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
        const stateItem = onboardingState.income

        let value = ''
        if(stateItem) {
          if (stateItem.id === INCOME_NA_ID) {
            value = "NA"
          } else {
            value += stateItem.value
          }
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
                      dispatch(showIncomeStep())
                      dispatch(gotoIncomeStep())
                    }
                }}
                textLabel='Income'
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
                    if (isEnabled) dispatch(showIncomeStep())
                }}
            >{item ? stateItem.value || item.title : 'Income'}</NavigationLink>
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

const LinkToIncomeStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_INCOME_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToIncomeStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToIncomeStep
