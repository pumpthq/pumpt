import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { SHOW_FOUNDATION_YEAR_STEP } from './../../../../../../constants/companyOnboarding'
import { showFoundationYearStep } from './../../../../../../actions/companyOnboarding'
import { NavigationLink, NavigationLink2 } from './../../../../../../components/main/navigation'
import CallStep from './../../../../callStep'
import moment from 'moment';

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
            dispatch,
        } = this.props;
        const { foundationYear } = onboardingState;
        const yearsInBusiness = moment().year() - foundationYear;
        const text = (foundationYear ? `${yearsInBusiness} years in Business` : 'Years in Business');

        return(
            <NavigationLink2
                style={{
                    cursor : isFilled || isActive ? 'pointer' : 'default'
                }}
                active={isActive}
                filled={isFilled}
                onClick={() => {
                    if (isEnabled) dispatch(showFoundationYearStep())
                }}
                textLabel='Years in Business'
                textFilledWith={text}
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

const LinkToFoundationYearStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_FOUNDATION_YEAR_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToFoundationYearStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToFoundationYearStep
