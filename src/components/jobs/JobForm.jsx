import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, formValueSelector, reduxForm } from 'redux-form';
// Places Autocomplete Library
import { PlaceField } from 'components/main/form/PlaceField';
import MultiInput from 'components/main/form/MultiInput';
// Actions

import { browserHistory } from 'react-router';
import {
  ANNUAL_INCOME_DROPDOWN_DATA,
  EXPERIENCE_DROPDOWN_DATA,
  FIELD_OF_EXPERTISE_DROPDOWN_DATA,
} from 'constants/candidateOnboarding';
import { DEGREES_DROPDOWN_DATA, EMPLOYEMENTS_DROPDOWN_DATA } from 'constants/companyJobs';
import { find } from 'lodash';
// Field-level Validations & Normalizations
import { hasText, required } from 'components/main/form/validations';
import { industryChild } from 'components/main/form/normalizations';
import { renderField } from 'components/form/helpers';

export const TextAreaField = ({ input, label, meta: { asyncValidating, touched, error } }) => (
  <span>
    <textarea className="mdl-textfield__input textfield__input" {...input} placeholder={label} />
    {touched && error && <span className="textfield__error textfield__error_small">{error}</span>}
  </span>
);

const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => {
  const inputProps = { ...input };
  delete inputProps.value;
  return (
    <div>
      <select
        {...inputProps}
        className="mdl-textfield__input textfield__input textfield__light"
        defaultValue={label}
      >
        <option value={label} className="disabled_text_option" disabled >{label}</option>
        {children}
      </select>
      {touched && error && <span className="textfield__error textfield__error_small">{error}</span>}
    </div>
  );
};
const buttonStyle = {
  cursor: 'pointer',
};

// NOTE: this generic job form is used for creating a new job and editing an existing one,
// which is why submit is handled by its parents (new job form and edit job form)
let JobForm = props => {
  const { handleSubmit, submitting, error, industryValue } = props;

  const industryParentObj = (parentValue) => {
    const output = find(FIELD_OF_EXPERTISE_DROPDOWN_DATA, o => o.title === parentValue);
    return output.items;
  };

  return (
    <div>
      <div className="recruter__newjob-card">
        <button
          style={buttonStyle}
          className="button button_type_close"
          onClick={browserHistory.goBack}
        >
          ×
        </button>
        <form onSubmit={handleSubmit} className="mdl-card card card_state_open card_state_scroll">
          <div className="recruter__newjob-card__form-top">
            <div>
              <label htmlFor="title">Title</label>
              <div>
                <Field
                  name="title"
                  type="text"
                  component={renderField}
                  label="Enter Job Title"
                  validate={required}
                />
              </div>
            </div>
            <div>
              <label htmlFor="location">Location</label>
              <div className="dark">
                <Field
                  name="location"
                  label="Location"
                  component={PlaceField}
                  validate={required}
                />
              </div>
            </div>

            <Field
              name="salary" component={renderSelectField} validate={required}
              label="Income" class="mdl-textfield__input textfield__input textfield__light"
            >
              { ANNUAL_INCOME_DROPDOWN_DATA
                .map(item => <option key={item.id} value={item.title}>{item.title}</option>) }
            </Field>

            <Field
              name="experience" component={renderSelectField} validate={required}
              label="Industry Experience"
              class="mdl-textfield__input textfield__input textfield__light"
            >
              { EXPERIENCE_DROPDOWN_DATA
                .map(item => <option key={item.id} value={item.title}>{item.title}</option>) }
            </Field>

            <Field
              name="employment" component={renderSelectField} validate={required}
              label="Employment Type" class="mdl-textfield__input textfield__input textfield__light"
            >
              { EMPLOYEMENTS_DROPDOWN_DATA
                .map(item => <option key={item.id} value={item.title}>{item.title}</option>) }
            </Field>

            <Field
              name="degree" component={renderSelectField} validate={required}
              label="Lowest Degree Needed"
              class="mdl-textfield__input textfield__input textfield__light"
            >
              { DEGREES_DROPDOWN_DATA
                .map(item => <option key={item.id} value={item.title}>{item.title}</option>) }
            </Field>

            <Field
              name="industryParent" component={renderSelectField} validate={required}
              label="Field of Expertise"
              class="mdl-textfield__input textfield__input textfield__light"
            >
              { FIELD_OF_EXPERTISE_DROPDOWN_DATA
                .map(item => <option key={item.id} value={item.title}>{item.title}</option>) }
            </Field>

            {industryValue &&
            <div>
              <label>Specialty</label>
              <Field
                name="industry" component={MultiInput} validate={required}
                label="Specialty" class="mdl-textfield__input textfield__input textfield__light"
                values={industryParentObj(industryValue).map((item) => item.title)}
                initialValues={{ input: { value: [] } }}
              />
            </div>
            }
            <div>
              <label htmlFor="description">Description</label>
              <Field
                name="description"
                type="text"
                component={TextAreaField}
                validate={required}
              />
            </div>
          </div>

          <div className="recruter__newjob-card__form-bottom">


            <FieldArray
              name="responsibilities" label="Responsibilities"
              validateEach={required} placeholder="Responsibility" component={renderLists}
            />
            <FieldArray
              name="requirements" label="Requirements"
              validateEach={required} placeholder="Requirement" component={renderLists}
            />

            {error && <span className="textfield__error">{error}</span>}
            <br />

            <div>
              <button
                type="submit"
                className="mdl-button button button_type_colored button_size_m candidate-submit"
                disabled={submitting}
              >
                {submitting ? <i /> : <i />} Save Job
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

const renderLists = ({ fields, label, validateEach, placeholder, meta: { error } }) => (
  <div>
    <button
      className="mdl-button new-job-add-button" type="button"
      onClick={() => {
        fields.push();
      }}
    >
      <i />
      {fields.length === 0 && 'Add'} {label}
    </button>

    {fields.map((child, index) =>
      <div key={index}>
        <Field
          name={child} component={TextAreaField} validate={validateEach}
          class="text-area" placeholder={`${placeholder}` + ' #' + (index + 1) + '...'} />
        <button
          type="button" className="remove-entry" onClick={() => {
            fields.remove(index);
          }}
        >
          <i>Remove</i>
        </button>
      </div>
    )}

    {error && <li className="error">{error}</li>}
    {fields.length > 0 && <button className="add-entry mdl-button" type="button" onClick={() => {
      fields.push();
    }}>Add
    </button>}
  </div>

);


// Define Form
JobForm = reduxForm({
  form: 'jobForm',
  enableReinitialize: true,
})(JobForm);

const selector = formValueSelector('jobForm');

JobForm = connect(state => {
  const industryValue = selector(state, 'industryParent');
  return {
    industryValue,
  };
})(JobForm);

// Export Form
export default JobForm;
export const industryOut = (values) => {
  const newVal = { ...values };
  newVal.industries = values.industry.map(i => ({ parent: values.industryParent, value: i }));
  delete newVal.industry;
  delete newVal.industryParent;
  return newVal;
};
export const industryIn = (values) => {
  const newVal = { ...values };
  newVal.industry = values.industries.map(i => (i.value));
  newVal.industryParent = values.industries.length > 0 ? values.industries[0].parent : undefined;
  delete newVal.industries;
  return newVal;
};
