import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import MatchesList from 'components/matches/List'

import VerticalScroller from 'components/VerticalScroller'
import { fetchMatches } from 'actions/companyJobs'

function mapStateToProps(state, ownProps) {
    return {
        job: find(state.companyJobs.jobs, card => card._id === ownProps.id),
        matches: filter(state.companyJobs.matches, match => match._vacancy == ownProps.id)}
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
                <MatchesList {...this.props} />
            </VerticalScroller>
        );
    }

}

// MatchesContainer.propTypes = propTypes;
// MatchesContainer.defaultProps = defaultProps;

module.exports = MatchesContainer
