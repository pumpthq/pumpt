import React, {Component, PropTypes} from 'react'
import OnboardingCompanyLinker from './../linker'

import CompanyPrototypeFinalStep from 'containers/onboarding/company/steps/prototypeFinalStep'

class CompanyFinalStep extends Component {
    componentDidMount() {
        this.props.scrollTop()
    }

    render() {
        return (
            <CompanyPrototypeFinalStep OnboardingLinker={OnboardingCompanyLinker} />
        )
    }
}

CompanyFinalStep.propTypes = {
    scrollTop : PropTypes.func
}

export default CompanyFinalStep
