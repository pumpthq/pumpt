import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {
    SHOW_COMPANY_SIZE_STEP,
    SHOW_CONTACT_INFO_STEP,
    SHOW_EXPERIENCE_STEP,
    SHOW_FIELD_OF_EXPERTISE_STEP,
    SHOW_INCOME_STEP,
    SHOW_DEGREE_STEP,
    SHOW_INDUSTRY_STEP,
    SHOW_JOB_TITLE_STEP,
    SHOW_SET_UP_PASSWORD_STEP,
    SHOW_VALUES_STEP,
    SHOW_EMPLOYMENT_STEP,
} from './../../../../constants/candidateOnboarding'

import ContactInfoStep from './contactInfo'
import DegreeStep from './degree'
import IndustryStep from './industry'
import FieldOfExpertiseStep from './fieldOfExpertion'
import JobTitleStep from './jobTitle'
import IncomeStep from './income'
import ExperienceStep from './experience'
import ValuesStep from './values'
import CompanySizeStep from './companySize'
import CandidateFinalStep from './final'
import EmploymentStep from './employment'

@connect()
class OnboardingCandidateStepSwitcher extends Component {
    render() {
        const { step, scrollTop } = this.props
        const props = {
            scrollTop
        }

        switch (step) {
            case SHOW_CONTACT_INFO_STEP :
                return (<ContactInfoStep/>)
            case SHOW_DEGREE_STEP :
                return (<DegreeStep {...props}/>)
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
          case SHOW_EMPLOYMENT_STEP :
              return (<EmploymentStep {...props} />)
            case SHOW_COMPANY_SIZE_STEP :
                return (<CompanySizeStep {...props}/>)
            case SHOW_SET_UP_PASSWORD_STEP :
                return (<CandidateFinalStep {...props}/>)
            default : return (<ContactInfoStep/>)
        }
    }
}

OnboardingCandidateStepSwitcher.propTypes = {
    step : PropTypes.string,
    scrollTop : PropTypes.func
}

export default OnboardingCandidateStepSwitcher
