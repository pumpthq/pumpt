import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Panel from './../../../../../components/main/panel'
import Navigation from './../../../../../components/main/navigation'

import LinkToContactInfoStep from './links/toContactInfo'
import LinkToDegreeStep from './links/toDegree'
import LinkToIndustryStep from './links/toIndustry'
import LinkToFieldOfExpertiseStep from './links/toFieldOfExpertise'
import LinkToJobTitleStep from './links/toJobTitle'
import LinkToIncomeStep from './links/toIncome'
import LinkToExperienceStep from './links/toExperience'
import LinkToCompanySizeStep from './links/toCompanySize'
import LinkToValuesStep from './links/toValues'
import LinkToEmploymentStep from './links/toEmployment'

//import LinkToApplicationStep from './links/toApplication'

@connect(
    function mapStateToProps(state) {
        const onboardingState = state.candidateOnboarding

        return {
            onboardingState
        }
    }
)
class OnboardingCandidateLinker extends Component {
    render() {
        const { onboardingState } = this.props
        const props = {
            onboardingState
        }

        return (
            <Panel paddingFalse typeOfNav>
                <Navigation type='onboarding'>
                    <LinkToContactInfoStep {...props}/>
                    <LinkToDegreeStep {...props}/>
                    <LinkToIndustryStep {...props}/>
                    <LinkToFieldOfExpertiseStep {...props}/>
                    <LinkToJobTitleStep {...props}/>
                    <LinkToIncomeStep {...props}/>
                    <LinkToExperienceStep {...props}/>
                    <LinkToCompanySizeStep {...props}/>
                    <LinkToEmploymentStep {...props} />
                    <LinkToValuesStep {...props}/>
                </Navigation>
            </Panel>
        )
    }
}

OnboardingCandidateLinker.propTypes = {
    onboardingState : PropTypes.object
}

export default OnboardingCandidateLinker
