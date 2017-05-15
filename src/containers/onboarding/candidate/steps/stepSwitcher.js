import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
    SHOW_CONTACT_INFO_STEP,
    SHOW_INDUSTRY_STEP,
    SHOW_FIELD_OF_EXPERTISE_STEP,
    SHOW_JOB_TITLE_STEP,
    SHOW_INCOME_STEP,
    SHOW_EXPERIENCE_STEP,
    SHOW_SET_UP_PASSWORD_STEP,
    SHOW_VALUES_STEP,
} from './../../../../constants/candidateOnboarding'

import ContactInfoStep from './contactInfo'
import IndustryStep from './industry'
import FieldOfExpertiseStep from './fieldOfExpertion'
import JobTitleStep from './jobTitle'
import IncomeStep from './income'
import ExperienceStep from './experience'
import ValuesStep from './values'
import FinalStep from './final'

export function mapStateToProps(state, ownProps) {
    const { step } = state.candidateOnboarding
    
    return {
        state,
        step
    }
}

export function mapDispatchToProps(dispatch, ownProps) {
    return {
        dispatch
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class OnboardingCandidateStepSwitcher extends Component {
    render() {
        const { step, scrollTop } = this.props
        const props = {
            scrollTop
        }
        
        switch (step) {
            case SHOW_CONTACT_INFO_STEP :
                return (<ContactInfoStep/>)
            case SHOW_INDUSTRY_STEP :
                return (<IndustryStep {...props}/>)
            case SHOW_FIELD_OF_EXPERTISE_STEP :
                return (<FieldOfExpertiseStep {...props}/>)
            case SHOW_JOB_TITLE_STEP :
                return (<JobTitleStep {...props}/>)
            case SHOW_INCOME_STEP :
                return (<IncomeStep {...props}/>)
            case SHOW_EXPERIENCE_STEP :
                return (<ExperienceStep {...props}/>)
            case SHOW_VALUES_STEP :
                return (<ValuesStep {...props}/>)
            case SHOW_SET_UP_PASSWORD_STEP :
                return (<FinalStep {...props}/>)
            default : return (<ContactInfoStep/>)
        }
    }
}

OnboardingCandidateStepSwitcher.propTypes = {
    step : PropTypes.string,
    scrollTop : PropTypes.func
}

export default OnboardingCandidateStepSwitcher
