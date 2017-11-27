import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { SHOW_VALUES_STEP, VALUE_ASSESSMENTS_DROPDOWN_DATA } from './../../../../../../constants/candidateOnboarding'
import { showValuesStep, gotoValuesStep } from './../../../../../../actions/candidateOnboarding'
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
        const stateItem = onboardingState.values
        let value = null

        if(stateItem) {

            value = ""
            let titles = [];

            for(let a of stateItem) {
                let i = findById({
                    id : a.id,
                    data : VALUE_ASSESSMENTS_DROPDOWN_DATA
                })
                if(i) {
                    titles.push("\n"+i.title);
                }
            }

            value = titles.join("\n");

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
                      dispatch(showValuesStep())
                      dispatch(gotoValuesStep())
                    }
                }}
                textLabel='Values Assessment'
                textFilledWith={value}
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

const LinkToValuesStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_VALUES_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToValuesStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToValuesStep
