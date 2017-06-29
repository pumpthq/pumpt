import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Panel from './../../../../../components/main/panel'
import Navigation from './../../../../../components/main/navigation'

import LinkToContactInfoStep from './links/toContactInfo' 
import LinkToCompanyTypeStep from './links/toType'
import LinkToHeadquartersLocationStep from './links/toLocation'
import LinkToNumberOfEmployeesStep from './links/toNumberOfEmployees'
import LinkToFoundationYearStep from './links/toFoundationYear'
import LinkToSocialMediaStep from './links/toSocialMedia'
import LinkToValuesStep from './links/toValues'

@connect(
    function mapStateToProps(state) {
        const onboardingState = state.companyOnboarding

        return {
            onboardingState
        }
    }
)
class OnboardingCompanyLinker extends Component {
    render() {
        const { onboardingState } = this.props
        const props = {
            onboardingState
        }

        return (
            <Panel paddingFalse typeOfNav>
                <Navigation type='onboarding'>
                    <LinkToContactInfoStep {...props}/>
                    <LinkToCompanyTypeStep {...props}/>
                    <LinkToHeadquartersLocationStep {...props}/>
                    <LinkToNumberOfEmployeesStep {...props}/>
                    <LinkToFoundationYearStep {...props}/>
                    <LinkToSocialMediaStep {...props}/>
                    <LinkToValuesStep {...props}/>
                </Navigation>
            </Panel>
        )
    }
}

OnboardingCompanyLinker.propTypes = {
    onboardingState : PropTypes.object
}

export default OnboardingCompanyLinker
