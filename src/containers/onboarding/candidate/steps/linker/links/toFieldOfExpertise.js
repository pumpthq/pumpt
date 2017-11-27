import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { SHOW_FIELD_OF_EXPERTISE_STEP, FIELD_OF_EXPERTISE_DROPDOWN_DATA } from './../../../../../../constants/candidateOnboarding'
import { showFieldOfExpertiseStep, gotoFieldOfExpertiseStep  } from './../../../../../../actions/candidateOnboarding'
import { NavigationLink, NavigationLink2 } from './../../../../../../components/main/navigation'
import CallStep from './../../../../callStep'
import { NavLinkLabel } from '../../../../renderHelpers'
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
        const stateItem = onboardingState.fieldOfExpertise
        const stateParent = onboardingState.fieldOfExpertiseHead
        // let item = null
        // stateItem ? item = findById({
        //     id : stateItem.id,
        //     data : FIELD_OF_EXPERTISE_DROPDOWN_DATA
        // }) : null

        let value = ''
        if(stateParent) {
            value += stateParent.value + ' | '
        }
        if(stateItem) {
            value += stateItem.value
        }

        return(
            <NavigationLink2
                style={{
                    cursor : isFilled || isActive ? 'pointer' : 'default'
                }}
                active={isActive}
                filled={isFilled}
                onClick={() => {
                    if (isEnabled) {
                      dispatch(showFieldOfExpertiseStep())
                      dispatch(gotoFieldOfExpertiseStep())
                    }
                }}
                textLabel='Area of Expertise'
                textFilledWith={value}
            />
        )

        /*return(
            <NavigationLink
                style={{
                    cursor : isFilled || isActive ? 'pointer' : 'default'
                }}
                active={isActive}
                filled={isFilled}
                onClick={() => {
                    if (isEnabled) dispatch(showFieldOfExpertiseStep())
                }}
            >
                <NavLinkLabel {...{
                    defaultLabel : 'Field of Expertise',
                    value : stateItem ? stateItem.value : null,
                    item
                }} />
            </NavigationLink>
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

const LinkToFieldOfExpertiseStep = ({ onboardingState }) => {
    return (
        <CallStep {...{
            activeOnStep : SHOW_FIELD_OF_EXPERTISE_STEP,
            onboardingState,
            To
        }} />
    )
}

LinkToFieldOfExpertiseStep.propTypes = {
    onboardingState : PropTypes.object
}

export default LinkToFieldOfExpertiseStep
