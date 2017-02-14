import React, { Component, PropTypes } from 'react';
import OnboardingCandidateLinker from './../linker';

import {
    saveSetUpPasswordData,
    applyForMembership,
} from './../../../../../actions/candidateOnboarding';
import PrototypeFinalStep from './../../../prototypeFinalStep';

class FinalStep extends Component {
    componentDidMount() {
        this.props.scrollTop();
    }

    render() {
        return (
            <PrototypeFinalStep
                {...{
                    onSubmit: (fields, dispatch) => {
                        dispatch(saveSetUpPasswordData(fields));
                        dispatch(applyForMembership());
                    },
                    OnboardingLinker: OnboardingCandidateLinker,
                }}
            />
        );
    }
}

FinalStep.propTypes = {
    scrollTop: PropTypes.func,
};

export default FinalStep;
