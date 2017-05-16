import React, {Component, PropTypes} from 'react';

import { browserHistory } from 'react-router'

const propTypes = {};
const defaultProps = {};

export default class CandidateProfile extends Component {

    render() {
        const { candidate, job } = this.props
        const { firstName, lastName, avatar } = candidate
        const { title } = job
        return (

            <div className="mdl-card card card_type_mini card_state_open">
                <a class="button button_type_close" onClick={browserHistory.goBack}>×</a>

                <h2>{ title }</h2>

                <CardDivider />

                <img src={avatar}></img>

                { `${lastName}, ${firstName}` }

            </div>
        )
    }
}

const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)

CandidateProfile.propTypes = propTypes;
CandidateProfile.defaultProps = defaultProps;
