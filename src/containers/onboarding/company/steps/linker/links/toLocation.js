import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {SHOW_HEADQUARTERS_LOCATION_STEP} from './../../../../../../constants/companyOnboarding'
import {gotoHeadquartersLocationStep, showHeadquartersLocationStep} from './../../../../../../actions/companyOnboarding'
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
				const { headquartersLocation } = onboardingState
        const location = `${headquartersLocation}`
        const text = (headquartersLocation ? location : 'Headquarters')

        return (
            <NavigationLink2
                style={{
                    cursor : isFilled || isActive ? 'pointer' : 'default'
                }}
                active={isActive}
                filled={isFilled}
                onClick={() => {
                    if (isEnabled) {
                      dispatch(showHeadquartersLocationStep())
                      dispatch(gotoHeadquartersLocationStep())
                    }
                }}
                textLabel='Headquarters'
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

const LinkToHeadquartersLocationStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_HEADQUARTERS_LOCATION_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToHeadquartersLocationStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToHeadquartersLocationStep
