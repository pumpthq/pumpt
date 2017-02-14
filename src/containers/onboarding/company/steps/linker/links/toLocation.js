import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { SHOW_HEADQUATERS_LOCATION_STEP } from './../../../../../../constants/companyOnboarding'
import { showHeadquatersLocationStep } from './../../../../../../actions/companyOnboarding'
import { NavigationLink } from './../../../../../../components/main/navigation'
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
        const { headquatersCity, headquatersState } = onboardingState
        const location = `${headquatersCity}, ${headquatersState}`
        const text = (headquatersCity && headquatersState ? location : 'Headquarters')

        return (
            <NavigationLink
                style={{
                    cursor : isFilled || isActive ? 'pointer' : 'default'
                }}
                active={isActive}
                filled={isFilled}
                onClick={() => {
                    if (isEnabled) dispatch(showHeadquatersLocationStep())
                }}
            >{text}</NavigationLink>
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

const LinkToHeadquatersLocationStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_HEADQUATERS_LOCATION_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToHeadquatersLocationStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToHeadquatersLocationStep

