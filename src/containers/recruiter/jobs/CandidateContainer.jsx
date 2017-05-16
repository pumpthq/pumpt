import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import CandidateProfile from 'components/candidates/Profile'

import VerticalScroller from 'components/VerticalScroller'
import { fetchCandidate } from 'actions/companyJobs'

function mapStateToProps(state, ownProps) {
    return {
        job: find(state.companyJobs.jobs, o => o._id === ownProps.id),
        candidate: find(state.companyJobs.candidate, o => o._id == ownProps.cid)}
}

@connect(mapStateToProps)
class CandidateContainer extends Component {

    componentWillMount() {
        const { dispatch, id, cid, candidate } = this.props;
        if(!candidate) {
            dispatch(fetchCandidate(cid))
        }
    }


    render() {
        return (
            <VerticalScroller>
                <CandidateProfile {...this.props} />
            </VerticalScroller>
        );
    }

}

// CandidateContainer.propTypes = propTypes;
// CandidateContainer.defaultProps = defaultProps;

module.exports = CandidateContainer
