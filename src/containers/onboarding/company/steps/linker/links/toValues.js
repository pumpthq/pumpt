import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { SHOW_VALUES_STEP } from './../../../../../../constants/companyOnboarding'
import { VALUE_ASSESSMENTS_DROPDOWN_DATA } from './../../../../../../constants/candidateOnboarding'
import { showValuesStep } from './../../../../../../actions/companyOnboarding'
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
        const stateItem = onboardingState.values
        let caption = null

        if(stateItem) {

            caption = ""
            let titles = [];

            for(let a of stateItem) {
                let i = findById({
                    id : a.id,
                    data : VALUE_ASSESSMENTS_DROPDOWN_DATA
                })
                if(i) {
                    titles.push(i.title);
                }
            }

            caption = titles.join(" | ");

        }
        return(
            <NavigationLink2
                style={{
                    cursor : isFilled || isActive ? 'pointer' : 'default'
                }}
                active={isActive}
                filled={isFilled}
                onClick={() => {
                    if (isEnabled) dispatch(showValuesStep())
                }}
                textLabel='Company Values Assessment'
                textFilledWith={caption}
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
