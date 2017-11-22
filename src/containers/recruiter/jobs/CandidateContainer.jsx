import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import CandidateProfile from 'components/candidates/Profile'

import VerticalScroller from 'components/VerticalScroller'
import { fetchCandidate } from 'actions/companyJobs'

import { find } from 'lodash'

function mapStateToProps(state, ownProps) {

    return {
        job: find(state.companyJobs.jobs, o => o._id === ownProps.id),
        candidate: find(state.companyJobs.candidates, o => o._id == ownProps.cid)
    }
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
      const {candidate, job, cid} = this.props
      if(!candidate || !job) {
        return <div>Loading...</div>
      }else{
        const candidateBrief = job.candidates.briefs.find(c => c._id === cid)

        //NOTE: merging candidate's latest data with periodically cached data (aka. brief) for consistency between views
        return (
            <VerticalScroller>
                <CandidateProfile {...candidate} {...candidateBrief} />
            </VerticalScroller>
        );
      }
    }

}

// CandidateContainer.propTypes = propTypes;
// CandidateContainer.defaultProps = defaultProps;

module.exports = CandidateContainer
