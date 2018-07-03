import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, FieldArray, Field, SubmissionError, propTypes as formTypes } from 'redux-form';

// Places Autocomplete Library
import { PlaceField } from 'components/main/form/PlaceField';

import { Checkbox } from 'redux-form-material-ui';
import MultiInput from 'components/main/form/MultiInput'

// Actions
import { updateCandidate } from 'actions/candidateMatches';

// Field-level Validations & Normalizations
import { url, date } from 'components/main/form/validations';
import { normalizeDate, normalizeYear, normalizeTwitter } from 'components/main/form/normalizations';

import { SKILLS } from 'constants/candidateOnboarding';
import Skills from 'components/icons-application/skills';
import CaseIcon from 'components/icons-application/case';
import Education from 'components/icons-application/education';
import Social from 'components/icons-application/social';
import LinkedInIcon from 'components/icons-application/linkedIn';
import TwitterIcon from 'components/icons-application/twitter';
import FacebookIcon from 'components/icons-application/facebook';

import { renderField } from 'components/form/helpers';
import './style.less';

renderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  meta: PropTypes.object,
};

const CardDivider = () => (<hr className="my-5"/>);

const fieldArrayProps = {
  fields: PropTypes.object,
  meta: PropTypes.object,
};

// Form
let CandidateApplicationForm = ({ handleSubmit, submitting, invalid, submitSucceeded, pristine, dispatch }) => {
  const submitDisabled = invalid || submitting;

  return (
    <form onSubmit={handleSubmit} className="candidate-application-form">
      <CardDivider />

      <FieldArray name="workingExperience" label="Working Experience" component={renderWorkingExperiences} />
      <CardDivider />

      <FieldArray name="education" component={renderEducations} />
      <CardDivider />

      <FieldArray name="skills" component={renderSkills} />
      <CardDivider />

      <FieldArray name="social" component={renderSocial} />

      <div className="text-center pt-5">
        <button
          type="submit" disabled={submitDisabled}
          className="mdl-button button button_type_colored button_size_l candidate-submit"
        >
          Save
        </button>{(submitSucceeded && pristine) && <span className="message-success">Saved!</span>}

      </div>
    </form>
  );
};
CandidateApplicationForm.propTypes = formTypes;

// FieldArray Definitions
const renderWorkingExperiences = ({ fields, meta: { error } }) => (
  <div className="application-item">
    <h6>{fields.length === 0 && 'Add'} Working Experience</h6>
    {fields.map((workingExperience, index) => (
      <div key={index} className="info-block">
        <div className="row">
          <div className="col-12">
            <Field
              name={`${workingExperience}.companyName`}
              type="text"
              component={renderField}
              label="Company Name"
            />
          </div>
          <div className="col-12">
            <Field
              name={`${workingExperience}.position`}
              type="text"
              component={renderField}
              label="Title"
            />
          </div>
          <div className="col-12">
            <Field
              name={`${workingExperience}.location`}
              component={PlaceField}
              label="Company Location"
            />
          </div>
          <div className="col-12">
            <Field
              name={`${workingExperience}.duty`}
              component="textarea"
              className="text-area"
              placeholder="Description of your work"
            />
          </div>
          <div className="col-12 col-sm-6">
            <Field
              name={`${workingExperience}.startWorkingAt`}
              type="text"
              component={renderField}
              label="Start Date (MM/YYYY)"
              normalize={normalizeDate}
              validate={date}
            />
          </div>
          <div className="col-12 col-sm-6">
            <Field
              name={`${workingExperience}.endWorkingAt`}
              type="text"
              component={renderField}
              label="End Date (MM/YYYY)"
              normalize={normalizeDate}
              validate={date}
            />
            <div className="row">
              <div className="col-12 col-md"><Field
                  name={`${workingExperience}.isCurrentJob`}
                  id={`${workingExperience}.currentEducation`}
                  component={Checkbox} label="Currently Work Here"
                /></div>
              <div className="col-12 col-md-auto pt-sm-2 pt-md-0 text-right">
                <button
                  className="remove-entry button_type_colored button_size_s" type="button" onClick={() => {
                    fields.remove(index);
                  }}
                >Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    ))}
    {error && <li className="error">{error}</li>}

    <button
      className="button_type_colored button_size_l" type="button" onClick={() => {
        fields.push();
      }}
    >Add
    </button>
  </div>
);
renderWorkingExperiences.propTypes = fieldArrayProps;

const renderEducations = ({ fields, meta: { error } }) => (
  <div className="application-item">
    <h6>{fields.length === 0 && 'Add'} Education</h6>
    {fields.map((education, index) => (
      <div key={index} className="info-block">
        <div className="row">
          <div className="col-md-12">
            <Field
              name={`${education}.schoolName`}
              type="text"
              component={renderField}
              label="School Name"
            />
          </div>
          <div className="col-12 col-md-6">
            <Field
              name={`${education}.specialty`}
              type="text"
              component={renderField}
              label="Field of Study"
            />
          </div>
          <div className="col-12 col-md-6">
            <Field
              label="Degree"
              className="mdl-textfield__input textfield__input pad-top-30"
              name={`${education}.degree`}
              component="select"
            >
              <option value="" className="disabled-text-option" disabled selected>Degree</option>
              <option value="high-school">High School</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="other">Other</option>
            </Field>
          </div>
          <div className="col-12 col-sm-6">
            <Field
              name={`${education}.startStudyAt`}
              component={renderField}
              type="text"
              label="Start Date (YYYY)"
              normalize={normalizeYear}
            />
          </div>
          <div className="col-12 col-sm-6">
            <Field
              name={`${education}.endStudyAt`}
              type="text"
              component={renderField}
              label="End Date (YYYY)"
              normalize={normalizeYear}
            />
            <div className="row">
              <div className="col-12 col-md">
                <Field
                  name={`${education}.isCurrentSchool`}
                  id={`${education}.currentEducation`}
                  component={Checkbox}
                  label="Currently Attending"
                />
              </div>
              <div className="col-12 col-md-auto pt-sm-2 pt-md-0 text-right">
                <button
                  className="remove-entry button_type_colored button_size_s" type="button" onClick={() => {
                    fields.remove(index);
                  }}
                >Remove
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

    ))}
    {error && <li className="error">{error}</li>}

    {fields.length > 0 &&
        <button
          className="button_type_colored button_size_l" type="button" onClick={() => {
            fields.push();
          }}
        >Add
        </button>}
      </div>
);
renderEducations.propTypes = fieldArrayProps;

const renderSkills = () => (
  <div className="application-item">
    <h6>Skills</h6>
    <p>Select all that apply</p>
    <div className="info-block">
      {SKILLS.map((skill, index) =>
        <div className="checkbox-item">
          <Field name={`skills[${skill}]`} id={`skills[${skill}]`} component={Checkbox} label={skill} />
        </div>
      )}
    </div>
  </div>
);


const renderSocial = () => (
  <div className="application-item">
    <h6>Social Media</h6>
    <div className="info-block social-media-block">
      <div className="row">
        <div className="col-auto pr-0">
          <LinkedInIcon />
        </div>
        <div className="col">
          <Field
            name="socialMedia.linkedInUrl"
            type="text"
            component={renderField}
            label="LinkedIn"
            className="social-application-item"
            validate={url}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-auto pr-0">
          <TwitterIcon />
        </div>
        <div className="col">
          <Field
            name="socialMedia.twitterAcc"
            type="text"
            className="social-application-item"
            component={renderField}
            normalize={normalizeTwitter}
            label="Twitter"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-auto pr-0">
          <FacebookIcon />
        </div>
        <div className="col">
          <Field
            name="socialMedia.faceBookUrl"
            type="text"
            component={renderField}
            className="social-application-item"
            label="Facebook"
            validate={url}
          />
        </div>
      </div>
    </div>
  </div>
);

// Define Form
CandidateApplicationForm = reduxForm({
  form: 'candidateApplication',
  enableReinitialize: true,
})(CandidateApplicationForm);

CandidateApplicationForm = connect(
  state => ({
    initialValues: state.candidateMatches.candidate,
  })
)(CandidateApplicationForm);

// Export Form
export default CandidateApplicationForm;
