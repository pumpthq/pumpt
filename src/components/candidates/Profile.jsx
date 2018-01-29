import React from 'react';
import { browserHistory } from 'react-router';

import { apiImage, displayIndustries } from 'components/helpers';
import { SKILLS } from 'constants/candidateOnboarding';

import './profile.less';

const propTypes = {};
const defaultProps = {
  candidate: false,
  job: false,
};

function ExperienceDisplay(props) {
  const { workingExperience } = props;
  return (
    <div>
      {workingExperience && workingExperience.filter(exp => exp).map((exp, index) =>
        <div key={index} className="item-title-text">
          Company: {exp.companyName}
          <br />Position: {exp.position}
          <br />Location: {exp.location}
          <br />Duty: {exp.duty}
          <br />Started At: {exp.startWorkingAt}
          <br />{exp.isCurrentJob ?
            <span>Current Job: Yes</span>
            : <span>Ended At: {exp.endWorkingAt}</span>
        }
        </div>
      )}
    </div>
  );
}

function EducationDisplay(props) {
  const { education } = props;
  return (
    <div className>
      {education && education.filter(exp => exp).map((exp, index) =>
        <div key={index} className="item-title-text">
          School Name: {exp.schoolName}
          <br />Specialty: {exp.specialty}
          <br />Degree: {exp.degree}
          <br />Started At: {exp.startStudyAt}
          <br />{exp.isCurrentSchool ?
            <span>Current School: Yes</span>
            : <span>Ended At: {exp.endStudyAt}</span>

          }
        </div>
      )}
    </div>
  );
}


function LocationDisplay(props) {
  return (<div className="item-title-text">{props.location}</div>);
}

function SkillsDisplay(props) {
  const { skills } = props;
  return (
    <div className="item-title-text">
      {skills && skills.map((skill, index) => <div key={index}>{skill && SKILLS[index]}</div>)}
    </div>
  );
}
const buttonStyle = {
  cursor: 'pointer',
};

const CandidateProfile = (props) => {
  const { firstName, lastName, avatar, socialMedia, location,
    education, workingExperience, skills, recentWorkingAreas,
    recentJob, recentAnnualIncome, recentAreaExperience } = props;

  return (
    <div>
      <button style={buttonStyle} className="button button_type_close" onClick={browserHistory.goBack}>×</button>
      <div className="candidate-profile mdl-card card card_type_mini card_state_open">
        <div className="profile-head row">
          <div className="profile-head-info col-md-9 col-xs-12">
            <h4>{ `${firstName} ${lastName}` }</h4>
            <LabeledValue
              label="Current Working Areas"
              value={displayIndustries(recentWorkingAreas)}
            />
            <LabeledValue label="Current Title" value={recentJob} />
            <LabeledValue label="Current Total Compensation" value={recentAnnualIncome} />
            <LabeledValue label="Experience" value={recentAreaExperience} />
          </div>

          <div className="profile-avatar col-md-2 col-xs-12">
            <img src={apiImage(avatar)} />
          </div>

        </div>

        <div className="profile-data">

          <div className="col-xs-8">
            <div className="profile-data__item">
              <span className="item-title">Experience</span>

              <ExperienceDisplay workingExperience={workingExperience} />
            </div>

            <div className="profile-data__item">
              <span className="item-title">Education</span>

              <EducationDisplay education={education} />
            </div>
            <div className="profile-data__item">
              <span className="item-title">Location</span>
              <LocationDisplay location={location} />,
            </div>

            <div className="profile-data__item">
              <span className="item-title">Social Media</span>
              <div className="item-title-text">
                <b>LinkedIn:</b><br /> {socialMedia && socialMedia.linkedInUrl && <a href={socialMedia.linkedInUrl} target="_blank">{socialMedia.linkedInUrl}</a>}<br />
                <b>Facebook:</b><br /> {socialMedia && socialMedia.faceBookUrl && <a href={socialMedia.faceBookUrl} target="_blank">{socialMedia.faceBookUrl}</a>}<br />
                <b>Twitter:</b><br /> {socialMedia ? socialMedia.twitterAcc : null}<br />
              </div>
            </div>

            <div className="profile-data__item">
              <span className="item-title">Skills</span>
              <SkillsDisplay skills={skills} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

const LabeledValue = (props) => (
  <div className={props.className || 'labeled-value'} >
    <label>{props.label}:</label>
    <span>{props.value}</span>
  </div>
);

CandidateProfile.propTypes = propTypes;
CandidateProfile.defaultProps = defaultProps;

export default CandidateProfile;
