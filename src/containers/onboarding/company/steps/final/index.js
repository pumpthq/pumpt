import React, { Component, PropTypes } from 'react'
import OnboardingCompanyLinker from './../linker'

import {
    saveSetUpPasswordData,
    applyForMembership
} from 'actions/companyOnboarding'

import CompanyPrototypeFinalStep from 'containers/onboarding/company/steps/prototypeFinalStep'

class CompanyFinalStep extends Component {
    componentDidMount() {
        this.props.scrollTop()
    }
    
    render() {
        return (
            <CompanyPrototypeFinalStep {...{
                onSubmit : (fields, dispatch) => {
                    dispatch(saveSetUpPasswordData(fields))
                    dispatch(applyForMembership())
                },
                OnboardingLinker : OnboardingCompanyLinker
            }} />
        )
    }
}

CompanyFinalStep.propTypes = {
    scrollTop : PropTypes.func
}

export default CompanyFinalStep
