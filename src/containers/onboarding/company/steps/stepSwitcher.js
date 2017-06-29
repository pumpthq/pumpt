import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
    SHOW_CONTACT_INFO_STEP,
    SHOW_COMPANY_TYPE_STEP,
    SHOW_HEADQUARTERS_LOCATION_STEP,
    SHOW_NUMBER_OF_EMPLOYEES_STEP,
    SHOW_FOUNDATION_YEAR_STEP,
    SHOW_WEBSITE_AND_SOCIAL_MEDIA_STEP,
    SHOW_VALUES_STEP,
    SHOW_SET_UP_PASSWORD_STEP
} from './../../../../constants/companyOnboarding'

import ContactInfoStep from './contactInfo'
import TypeStep from './type'
import LocationInfoStep from './location'
import NumberOfEmployeesStep from './numberOfEmployees'
import FoundationYearStep from './foundationYear'
import SocialMediaStep from './socialMedia'
import ValuesStep from './values'
import FinalStep from './final'

export function mapStateToProps(state, ownProps) {
    const { step } = state.companyOnboarding

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
class OnboardingCompanyStepSwitcher extends Component {
    render() {
        const { step, scrollTop } = this.props
        const props = {
            scrollTop
        }
        
        switch (step){
            case SHOW_CONTACT_INFO_STEP :
                return (<ContactInfoStep/>)
            case SHOW_COMPANY_TYPE_STEP :
                return (<TypeStep {...props}/>)
            case SHOW_HEADQUARTERS_LOCATION_STEP :
                return (<LocationInfoStep {...props}/>)
            case SHOW_NUMBER_OF_EMPLOYEES_STEP :
                return (<NumberOfEmployeesStep {...props}/>)
            case SHOW_FOUNDATION_YEAR_STEP :
                return (<FoundationYearStep {...props}/>)
            case SHOW_WEBSITE_AND_SOCIAL_MEDIA_STEP :
                return (<SocialMediaStep {...props}/>)
            case SHOW_SET_UP_PASSWORD_STEP :
                return (<FinalStep {...props}/>)
            case SHOW_VALUES_STEP :
                return (<ValuesStep {...props}/>)
            default : return (<ContactInfoStep/>)
        }
    }
}

OnboardingCompanyStepSwitcher.propTypes = {
    step : PropTypes.string,
    scrollTop : PropTypes.func
}

export default OnboardingCompanyStepSwitcher
