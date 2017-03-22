import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ApplicationCandidateAccordion from './steps'

@connect(
    function mapStateToProps(state, ownProps) {
        const { accordion } = state.applicationCandidate

        return {
            state,
            accordionState : accordion
        }
    },
    null
)
class ApplicationCandidate extends Component {
    render() {
        const { accordionState } = this.props
        
        return (accordionState ?
            <ApplicationCandidateAccordion/> :
            null
        )
    }
}

ApplicationCandidate.propTypes = {
    accordionState : PropTypes.string
}

export default ApplicationCandidate
