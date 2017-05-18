import React, {Component, PropTypes} from 'react';
import { Link, browserHistory } from 'react-router'

const propTypes = {};
const defaultProps = {
    _id: '{_id}',
    title: '{title}',
    candidates: {
        briefs: [],
    }
};


export default class MatchesList extends Component {

    render() {
        const {title, candidates, _id} = this.props
        return (

            <div className="mdl-card card card_type_mini card_state_open">
                <a class="button_type_close" onClick={browserHistory.goBack}>×</a>

                <h2>{ title }</h2>
                <CardDivider />

                <h4>{ candidates.briefs.length } MATCHES</h4>

                { candidates.briefs && candidates.briefs.map( candidate =>
                    <div>
                        {candidate.firstName}
                        {candidate.lastName}
                        <img src={candidate.avatar} />

                        <Link className="link" to={`recruiter/jobs/${_id}/candidates/${candidate._id}`}>
                            View Candidate Details
                        </Link>
                        <CardDivider />
                    </div>
                )}
            </div>
        )
    }
}

const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)

MatchesList.propTypes = propTypes;
MatchesList.defaultProps = defaultProps;
