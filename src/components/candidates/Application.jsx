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

const CardDivider = () => (<div className="summary-head__title-item summary-head__title-item_type_alignment summary-head__title-item_type_middle" />);

const fieldArrayProps = {
  fields: PropTypes.object,
  meta: PropTypes.object,
};

// Form
let CandidateApplicationForm = ({ handleSubmit, submitting, invalid, submitSucceeded, pristine, dispatch }) => {
  const submitDisabled = invalid || submitting;

  return (
    <form onSubmit={handleSubmit} className="candidate-application-form text-input-underlined">
      <FieldArray name="workingExperience" label="Working Experience" component={renderWorkingExperiences} />
      <CardDivider />

      <FieldArray name="education" component={renderEducations} />
      <CardDivider />

      <FieldArray name="skills" component={renderSkills} />
      <CardDivider />

      <FieldArray name="social" component={renderSocial} />
      <CardDivider />

      <div className="text-center">
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
    <button
      className="application-item-button" type="button" onClick={() => {
        fields.push();
      }}
    ><i />
      {fields.length === 0 && 'Add'} Working Experience
    </button>
    {fields.map((workingExperience, index) => (
      <div key={index} className="info-block">
        <div className="row">
          <div className="application-detail col-md-12">
            <Field
              name={`${workingExperience}.companyName`}
              type="text"
              component={renderField}
              label="Company Name"
            />
          </div>
          <div className="application-detail col-md-6">
            <Field
              name={`${workingExperience}.position`}
              type="text"
              component={renderField}
              label="Title"
            />
          </div>
          <div className="application-detail col-md-6">
            <Field
              name={`${workingExperience}.location`}
              component={PlaceField}
              label="Company Location"
            />
          </div>
          <div className="application-detail col-md-12">
            <Field
              name={`${workingExperience}.duty`}
              component="textarea"
              class="text-area"
              placeholder="Description of your work"
            />
          </div>
          <div className="application-detail col-md-4 col-sm-6">
            <Field
              name={`${workingExperience}.startWorkingAt`}
              type="text"
              component={renderField}
              label="Start Date (MM/YYYY)"
              normalize={normalizeDate}
              validate={date}
            />
          </div>
          <div className="application-detail col-md-4 col-sm-6">
            <Field
              name={`${workingExperience}.endWorkingAt`}
              type="text"
              component={renderField}
              label="End Date (MM/YYYY)"
              normalize={normalizeDate}
              validate={date}
            />
            <Field
              name={`${workingExperience}.isCurrentJob`}
              id={`${workingExperience}.currentEducation`}
              component={Checkbox} label="Currently Work Here"
            />
          </div>
        </div>

        <button
          className="remove-entry" type="button" onClick={() => {
            fields.remove(index);
          }}
        ><i>Remove</i>
        </button>
      </div>

    ))}
    {error && <li className="error">{error}</li>}

    {fields.length > 0 && <button
      className="add-entry mdl-button" type="button" onClick={() => {
        fields.push();
      }}
    >Add
    </button>}
  </div>
);
renderWorkingExperiences.propTypes = fieldArrayProps;

const renderEducations = ({ fields, meta: { error } }) => (
  <div className="application-item">
    <button
      className="application-item-button" type="button" onClick={() => {
        fields.push();
      }}
    ><i />
      {fields.length === 0 && 'Add'} Education
    </button>
    {fields.map((education, index) => (
      <div key={index} className="info-block">
        <div className="row">
          <div className="application-detail col-md-12">
            <Field
              name={`${education}.schoolName`}
              type="text"
              component={renderField}
              label="School Name"
            />
          </div>
          <div className="application-detail col-md-6">
            <Field
              name={`${education}.specialty`}
              type="text"
              component={renderField}
              label="Field of Study"
            />
          </div>
          <div className="application-detail col-md-6">
            <Field
              label="Degree"
              class="mdl-textfield__input textfield__input pad-top-30"
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
          <div className="application-detail col-md-12">
            <div className="row">

              <div className="application-detail col-md-4 col-sm-6">
                <Field
                  name={`${education}.startStudyAt`}
                  component={renderField}
                  type="text"
                  label="Start Date (YYYY)"
                  normalize={normalizeYear}
                />
              </div>
              <div className="application-detail col-md-4 col-sm-6">
                <Field
                  name={`${education}.endStudyAt`}
                  type="text"
                  component={renderField}
                  label="End Date (YYYY)"
                  normalize={normalizeYear}
                />
                <Field
                  name={`${education}.isCurrentSchool`}
                  id={`${education}.currentEducation`}
                  component={Checkbox}
                  label="Currently Attending"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          className="remove-entry" type="button" onClick={() => {
            fields.remove(index);
          }}
        ><i>Remove</i>
        </button>
      </div>

    ))}
    {error && <li className="error">{error}</li>}

    {fields.length > 0 &&
      <button
        className="add-entry mdl-button" type="button" onClick={() => {
          fields.push();
        }}
      >Add
      </button>}
  </div>
);
renderEducations.propTypes = fieldArrayProps;

const renderSkills = () => (
  <div className="application-item">
    <button className="application-item-button" type="button">Skills</button>
    {SKILLS.map((skill, index) =>
      <div className="application-detail checkbox-item col-md-12">
        <Field name={`skills[${skill}]`} id={`skills[${skill}]`} component={Checkbox} label={skill} />
      </div>
    )}
  </div>
);


const renderSocial = () => (
  <div className="application-item">
    <button
      className="application-item-button" type="button" onClick={() => {
      }}
    ><i />
      Social Media
    </button>
    <div className="info-block">
      <div className="row">
        <div className="social-media-block">
          <LinkedInIcon />
          <Field
            name="socialMedia.linkedInUrl"
            type="text"
            component={renderField}
            label="LinkedIn"
            className="social-application-item"
            validate={url}
          />
          <TwitterIcon />
          <Field
            name="socialMedia.twitterAcc"
            type="text"
            className="social-application-item"
            component={renderField}
            normalize={normalizeTwitter}
            label="Twitter"
          />
          <FacebookIcon />
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

// Export Form
export default CandidateApplicationForm;
