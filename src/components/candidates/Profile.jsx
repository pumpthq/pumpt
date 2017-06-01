import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'
import './profile.less'

const propTypes = {};
const defaultProps = {
    candidate: false,
    job: false,
};

export default class CandidateProfile extends Component {

    render() {
        const { candidate, job } = this.props
        const { firstName, lastName, avatar } = candidate
        const { title } = job

        return (

            <div className="candidate-profile mdl-card card card_type_mini card_state_open">

                <a class="button_type_close" onClick={browserHistory.goBack}>×</a>

              <div className="profile-head">

                <div className="profile-avatar">
                  <img src={avatar}></img>
                </div>

                <div className="profile-head-info">
                  <h2>Job: { title }</h2>
                  <h4>{ `${lastName}, ${firstName}` }</h4>
                  <LabeledValue label="Recent Income" value={candidate.recentAnnualIncome} />
                  <LabeledValue label="Recent Job" value={candidate.recentJob} />
                  <LabeledValue label="Experience Duration" value={candidate.recentAreaExperience} />
                </div>

              </div>

              <div className="profile-main-data">

                  <pre>
                      { JSON.stringify(candidate, null, 4) }
                  </pre>
              </div>


            </div>
        )
    }
}

const LabeledValue = (props) => (
    <div className={props.className || 'labeled-value'} >
        <label>{props.label}:</label>
        <span>{props.value}</span>
    </div>
)
const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle"></div>)

CandidateProfile.propTypes = propTypes;
CandidateProfile.defaultProps = defaultProps;
