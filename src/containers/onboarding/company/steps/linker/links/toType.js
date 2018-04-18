import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {SHOW_COMPANY_TYPE_STEP} from './../../../../../../constants/companyOnboarding'
import {gotoCompanyTypeStep, showCompanyTypeStep} from './../../../../../../actions/companyOnboarding'
import {NavigationLink2} from './../../../../../../components/main/navigation'
import CallStep from './../../../../callStep'

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
        let type = "";
        if (stateItem) {
            type = stateItem.map(({ value }) => value).join(' | ');
        }

        return(
            <NavigationLink2
                style={{
                    cursor : isFilled || isActive ? 'pointer' : 'default'
                }}
                active={isActive}
                filled={isFilled}
                textFilledWith={type}
                textLabel='Company Type'
                onClick={() => {
                    if (isEnabled) {
                      dispatch(showCompanyTypeStep())
                      dispatch(gotoCompanyTypeStep())
                    }
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
