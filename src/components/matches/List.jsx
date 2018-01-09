import React, {Component, PropTypes} from 'react';
import { Link, browserHistory } from 'react-router'
import { find } from 'lodash'

import MatchRecruiterActions from 'components/matches/RecruiterActions'
import './matches.less'
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

              <div className="matches-head">
                <h2>{ title }</h2>
                <CardDivider />
                <div className="matches-number">{ matches.length } Match{ matches.length !== 1 && 'es'}</div>
								{ matches.length === 0 &&
									<div className="empty-matches-message">
										<h3 className="message">No Matches Yet!</h3>
										<div className="message">We'll let you know when you have new interested candidates</div>
									</div>
								}	
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
    const {candidate: {status, brief:{firstName, lastName, avatar, recentWorkingAreas, recentAnnualIncome}},
      vacancy: {brief:{industry, salary}}} = match

    return (
        <div className={ status === 'rejected' ? "matched-item dimmed" : "matched-item" }>

          <div className="match-avatar-block">
						{avatar && <img src={apiImage(avatar)} className="match-avatar"/>}
            <br/>
            <h4>status: <span>{status}</span></h4>
          </div>

          <div className="match-avatar-info">


						<h4>{ `${firstName} ${lastName}` }</h4>
						<LabeledValue label="Current Working Area" value={  recentWorkingAreas.reduce( (acc, {value, parent}) => `${parent} | ${value}, ${acc}`, '') }/>
						<LabeledValue label="Current Toral Compensation" value={recentAnnualIncome} /> 

            <div className="row button-block">
							<div class="col-md-12">
								<MatchRecruiterActions match={match} status={status}/>
							</div>
            </div>
          </div>

            {/*<CardDivider />*/}
        </div>

    )
}

const LabeledValue = (props) => (
    <div className={props.className || 'labeled-value'} >
        <label>{props.label}:</label>
        <span>{props.value}</span>
    </div>
)

CandidateItem.defaultProps = {
    match: {
        candidate: {}
    }
}

const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)

MatchesList.propTypes = propTypes;
MatchesList.defaultProps = defaultProps;
