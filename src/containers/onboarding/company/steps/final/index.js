import React, { Component, PropTypes } from 'react'
import OnboardingCompanyLinker from './../linker'

import {
    saveSetUpPasswordData,
    applyForMembership
} from './../../../../../actions/companyOnboarding'

import PrototypeFinalStep from './../../../prototypeFinalStep'

class FinalStep extends Component {
    componentDidMount() {
        this.props.scrollTop()
    }
    
    render() {
        return (
            <PrototypeFinalStep {...{
                onSubmit : (fields, dispatch) => {
                    dispatch(saveSetUpPasswordData(fields))
                    dispatch(applyForMembership())
                },
                OnboardingLinker : OnboardingCompanyLinker
            }} />
        )
    }
}

FinalStep.propTypes = {
    scrollTop : PropTypes.func
}

export default FinalStep
