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

function ExperienceDisplay(props){
	var html = null;
	if ((props.workingExperience === null) || (typeof props.workingExperience === 'undefined')){
	}else{
		var listItems = props.workingExperience.map(exp => <div className="item-title-text">Company: {exp.companyName}<br/>Position: {exp.position}<br/>Location: {exp.location}<br/>Duty: {exp.duty}</div>);
		html = listItems; 
	}
	return html;
}

function EducationDisplay(props){
	var html = null;
	if (props.education === null){
	}else{
		html = education.map(exp => <div className="item-title-text">School Name: {exp.schoolName}<br/>Specialty: {exp.specialty}<br/>Degree: {exp.degree}</div>);
	}
	return html;
}


function LocationDisplay(props){
	var html = null;
	if (props.location === null){
		return null;
	}else if(typeof props.location === 'undefined'){
		return null;
	}
	else{
		return (<div className='item-title-text'>City: {props.location.city}<br/>State: {props.location.state}</div>);
	}
}
const buttonStyle = {
    cursor: 'pointer',
};

export default class CandidateProfile extends Component {

    render() {
        const { candidate, job } = this.props
        const { firstName, lastName, avatar, socialMedia, location,
          education, interests, workingExperience, skills} = candidate
        const { title } = job

        return (

						<div>
							<button style={buttonStyle} className="button button_type_close" onClick={browserHistory.goBack}>×</button>
							<div className="candidate-profile mdl-card card card_type_mini card_state_open">
								<div className="profile-head row">
									<div className="profile-head-info col-md-9 col-xs-12">
										<h4>{ `${lastName}, ${firstName}` }</h4>
										<LabeledValue label="Current Total Compensation" value={candidate.recentAnnualIncome} />
										<LabeledValue label="Current Title" value={candidate.recentJob} />
										<LabeledValue label="Experience" value={candidate.recentAreaExperience} />
									</div>

									<div className="profile-avatar col-md-2 col-xs-12">
											<img src={apiImage(avatar)}></img>
									</div>

								</div>

								<div className="profile-data">

									<div className="col-xs-8">
									<div className="profile-data__item">
										<Case/><span className="item-title">Experience</span>
										{
											workingExperience && workingExperience.map(exp => <div className="item-title-text">Company: {exp.companyName}<br/>
											Position: {exp.position}<br/>Location: {exp.location}<br/>Duty: {exp.duty}</div>)
										}
									</div>

									<div className="profile-data__item">
										<Education/><span className="item-title">Education</span>
										{
											education && education.map(exp => <div className="item-title-text">School Name: {exp.schoolName}<br/>
											Specialty: {exp.specialty}<br/>Degree: {exp.degree}</div>)
										}
									</div>

											<div className="profile-data__item">
												<Pin/><span className="item-title">Location</span>
													<LocationDisplay location={location} />,
											</div>

											<div className="profile-data__item">
												<Social/><span className="item-title">Social Media</span>
												<div className="item-title-text">
													LinkedIn: <a href="{socialMedia.linkedInUrl}">{socialMedia ? socialMedia.linkedInUrl : null}</a><br/>
													Twitter: {socialMedia ? socialMedia.twitterAcc : null}<br/>
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
