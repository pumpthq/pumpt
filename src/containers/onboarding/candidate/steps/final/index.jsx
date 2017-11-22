import React, { Component, PropTypes } from 'react';
import OnboardingCandidateLinker from './../linker';

import {
    saveSetUpPasswordData,
    applyForMembership,
} from './../../../../../actions/candidateOnboarding';
import CandidatePrototypeFinalStep from 'containers/onboarding/candidate/steps/prototypeFinalStep';

class CandidateFinalStep extends Component {
    componentDidMount() {
        this.props.scrollTop();
    }

    render() {
        return (
            <CandidatePrototypeFinalStep OnboardingLinker={OnboardingCandidateLinker}/>
        );
    }
}

CandidateFinalStep.propTypes = {
    scrollTop: PropTypes.func,
};

export default CandidateFinalStep;
