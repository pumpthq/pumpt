import React, {Component, PropTypes} from 'react';
import { Link, browserHistory } from 'react-router'
import { find } from 'lodash'

import MatchRecruiterActions from 'components/matches/RecruiterActions'

import { apiImage } from 'components/helpers'

const propTypes = {};
const defaultProps = {
    job: {
        _id: '{_id}',
        title: '{title}',
        candidates: {
            briefs: [],
        }
    },
    matches: []
};


export default class MatchesList extends Component {

    render() {
        const {job: {title, candidates, _id}, matches} = this.props
        return (

            <div className="mdl-card card card_type_mini card_state_open">
                <a class="button_type_close" onClick={browserHistory.goBack}>×</a>

                <h2>{ title }</h2>
                <CardDivider />

                <h4>{ matches.length } MATCHES</h4>

                { matches.map( match =>
                    <CandidateItem key={match._id} match={match} />
                )}
            </div>
        )
    }
}

const CandidateItem = (props) => {
    const {match} = props
    const {candidate: {status, brief:{firstName, lastName, avatar}}} = match
    return (
        <div className="col-xs-12">

            <h4>status: {status}</h4>
            <h4>{firstName} {lastName}</h4>
            <img src={apiImage(avatar)} className="col-xs-4"/>

            <MatchRecruiterActions match={match} />

            <Link className="link" to={`recruiter/jobs/${match._vacancy}/candidates/${match._candidate}`}>
                View Candidate Details
            </Link>

            <CardDivider />

        </div>

    )
}

CandidateItem.defaultProps = {
    match: {
        candidate: {}
    }
}

const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)

MatchesList.propTypes = propTypes;
MatchesList.defaultProps = defaultProps;
