import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'

import { apiImage } from 'components/helpers'
import Case from '../icons-application/case'
import Education from '../icons-application/education'
import Pin from '../icons-application/pin'
import Social from '../icons-application/social'
import Skills from '../icons-application/skills'
import Heart from '../icons-application/heart'
import './profile.less'

const propTypes = {};
const defaultProps = {
    candidate: false,
    job: false,
};

export default class CandidateProfile extends Component {

    render() {
        const { candidate, job } = this.props
        const { firstName, lastName, avatar, socialMedia, location,
          education, interests, workingExperience, skills} = candidate
        const { title } = job

        return (

            <div className="candidate-profile mdl-card card card_type_mini card_state_open">

							<a class="button_type_close" onClick={browserHistory.goBack}>×</a>

              <div className="profile-head">

                <div className="profile-avatar">
                  <img src={avatar}/>
                </div>

                <div className="profile-head-info">
                  <h2>Job: { title }</h2>
                  <h4>{ `${lastName}, ${firstName}` }</h4>
                  <LabeledValue label="Recent Income" value={candidate.recentAnnualIncome} />
                  <LabeledValue label="Recent Job" value={candidate.recentJob} />
                  <LabeledValue label="Experience Duration" value={candidate.recentAreaExperience} />
                </div>

              </div>

              <div className="profile-data">

                <div className="col-xs-4">
                    <img src={apiImage(avatar)}></img>
										<div className="profile-data__item">
											<Case/><span className="item-title">Experience</span>
											{
												workingExperience.map(exp => <div className="item-title-text">Company: {exp.companyName}<br/>
												Position: {exp.position}<br/>Location: {exp.location}<br/>Duty: {exp.duty}</div>)
											}
										</div>

										<div className="profile-data__item">
											<Education/><span className="item-title">Education</span>
											{
												education.map(exp => <div className="item-title-text">School Name: {exp.schoolName}<br/>
												Speciality: {exp.speciality}<br/>Degree: {exp.degree}</div>)
											}
										</div>

										<div className="profile-data__item">
											<Pin/><span className="item-title">Location</span>
											<div className="item-title-text">
												City: {location.city}<br/>
												State: {location.state}
												</div>
										</div>

										<div className="profile-data__item">
											<Social/><span className="item-title">Social Media</span>
											<div className="item-title-text">
												LinkedIn: <a href="{socialMedia.linkedInUrl}">{socialMedia.linkedInUrl}</a><br/>
												Twitter: {socialMedia.twitterAcc}<br/>
											</div>
										</div>

										<div className="profile-data__item">
											<Skills/><span className="item-title">Skills</span>

										</div>

										<div className="profile-data__item">
											<Heart/><span className="item-title">Interests</span>

										</div>


                {/*<hr/>*/}
                  {/*<pre>*/}
                      {/*{ JSON.stringify(candidate, null, 4) }*/}
                  {/*</pre>*/}

								</div>
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
