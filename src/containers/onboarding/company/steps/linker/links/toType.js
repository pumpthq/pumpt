import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { SHOW_COMPANY_TYPE_STEP, COMPANY_TYPE_DATA } from './../../../../../../constants/companyOnboarding'
import { showCompanyTypeStep } from './../../../../../../actions/companyOnboarding'
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
        const stateItem = onboardingState.companyType
        let item = null

        stateItem ? item = findById({
            id : stateItem.id,
            data : COMPANY_TYPE_DATA
        }) : null
        return(
            <NavigationLink2
                style={{
                    cursor : isFilled || isActive ? 'pointer' : 'default'
                }}
                active={isActive}
                filled={isFilled}
                textFilledWith={stateItem ? stateItem.value || item.value : ''}
                textLabel='Company Type'
                onClick={() => {
                    if (isEnabled) dispatch(showCompanyTypeStep())
                }}
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

const LinkToComapanyTypeStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_COMPANY_TYPE_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToComapanyTypeStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToComapanyTypeStep
