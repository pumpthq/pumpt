import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import MatchesList from 'components/matches/List'
import  ApproveAndEmailCandidateDialog  from 'components/matches/ApproveAndEmailCandidateDialog'
import VerticalScroller from 'components/VerticalScroller'
import { fetchMatches } from 'actions/companyJobs'

import { find, filter } from 'lodash'

function mapStateToProps(state, ownProps) {
    return {
        job: find(state.companyJobs.jobs, card => card._id === ownProps.id),
        matches: filter(state.companyJobs.matches, match => match._vacancy == ownProps.id),
        lastOpenApproved: state.companyJobs.lastOpenApproved,
				recruiter: state.companyJobs.recruiter
    }
}


@connect(mapStateToProps)
class MatchesContainer extends Component {

    componentWillMount() {
        const { dispatch, id, matches } = this.props;
        if(matches.length==0) {
            dispatch(fetchMatches(id))
        }
    } 


    render() {
        return (
            <VerticalScroller>
                <MatchesList job={this.props.job} matches={this.props.matches} />
                <ApproveAndEmailCandidateDialog recruiter={this.props.recruiter} trigger={this.props.lastOpenApproved} />
            </VerticalScroller>
        );
    }

}

// MatchesContainer.propTypes = propTypes;
// MatchesContainer.defaultProps = defaultProps;

module.exports = MatchesContainer
