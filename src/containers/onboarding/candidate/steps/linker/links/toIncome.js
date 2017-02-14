import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { SHOW_INCOME_STEP, ANNUAL_INCOME_DROPDOWN_DATA } from './../../../../../../constants/candidateOnboarding'
import { showIncomeStep } from './../../../../../../actions/candidateOnboarding'
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
        const stateItem = onboardingState.income
        let item = null

        stateItem ? item = findById({
            id : stateItem.id,
            data : ANNUAL_INCOME_DROPDOWN_DATA
        }) : null

        return (
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
