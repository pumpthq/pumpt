import React, {Component, PropTypes} from 'react';
import { Link, browserHistory } from 'react-router'
import { find } from 'lodash'

import MatchRecruiterActions from 'components/matches/RecruiterActions'
import './matches.less'

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

              <div className="matches-head">
                <h2>{ title }</h2>
                <CardDivider />
                <div className="matches-number">{ matches.length } Matches</div>
              </div>

                { matches.map( match =>
                    <CandidateItem key={match._id} match={match} />
                )}
            </div>
        )
    }
}

const CandidateItem = (props) => {
    const {match} = props
    const {candidate: {status, brief:{firstName, lastName, avatar}},
      vacancy: {brief:{industry, salary}}} = match

    console.log('=== match: ', match);

    return (
        <div className="matched-item">

          <div className="match-avatar-block">
            <img src={avatar} className="match-avatar"/>
            <br/>
            <h4>status: <span>{status}</span></h4>
          </div>

          <div className="match-avatar-info">

            <h4>{firstName} {lastName}</h4>
            <div className="vacancy-details">{industry}</div>
            <div className="vacancy-details">{salary}</div>

            <div className="button-block">
              <MatchRecruiterActions match={match} />

              <Link className="link" to={`recruiter/jobs/${match._vacancy}/candidates/${match._candidate}`}>
                  View Candidate Details
              </Link>
            </div>
          </div>

            {/*<CardDivider />*/}

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
