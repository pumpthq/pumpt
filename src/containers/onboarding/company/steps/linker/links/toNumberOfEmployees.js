import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { SHOW_NUMBER_OF_EMPLOYEES_STEP, COMPANY_EMPLOYEES_DATA } from './../../../../../../constants/companyOnboarding'
import { showNumberOfEmployeesStep, gotoNumberOfEmployeesStep } from './../../../../../../actions/companyOnboarding'
import { NavigationLink, NavigationLink2 } from './../../../../../../components/main/navigation'
import CallStep from './../../../../callStep'
import { findById } from '../../../../../../constants/dropdownData'

@connect(
    function mapStateToProps(state) {
        const onboardingState = state.companyOnboarding

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
        const stateItem = onboardingState.numberOfEmployees
        let item = null

        stateItem ? item = findById({
            id : stateItem.id,
            data : COMPANY_EMPLOYEES_DATA
        }) : null

        return (
            <NavigationLink2
                style={{
                    cursor : isFilled || isActive ? 'pointer' : 'default'
                }}
                active={isActive}
                filled={isFilled}
                onClick={() => {
                    if (isEnabled) {
                      dispatch(showNumberOfEmployeesStep())
                      dispatch(gotoNumberOfEmployeesStep())
                    }
                }}
                textLabel='Company Size'
                textFilledWith={stateItem ? stateItem.value || item.value : ''}
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

const LinkToNumberOfEmployeesStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_NUMBER_OF_EMPLOYEES_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToNumberOfEmployeesStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToNumberOfEmployeesStep
