import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, formValueSelector, reduxForm } from 'redux-form';
import { RadioButton } from 'material-ui/RadioButton';
import { RadioButtonGroup } from 'redux-form-material-ui';
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
import { renderField } from 'components/form/helpers';
import {cityToGeocode} from '../../utils/converters'
import CKEditor from "react-ckeditor-component";

import './profile.less';
import './expander.less';

export const TextAreaField = ({ input, label, meta: { asyncValidating, touched, error } }) => (
  <span>
    <textarea {...input} placeholder={label} />
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

class Expander extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  toggleExpand = () => {
    this.setState(({expanded}) =>({expanded: !expanded}))
  }

  render() {
    const {title, children} = this.props;
    const { expanded } = this.state;
    return (
      <div className={`expander ${expanded ? 'expanded' : ''}`}>
        <header role="button" onClick={this.toggleExpand}>
          <h4>{title}</h4>
        </header>
        { expanded &&
          <div className="expander_content">
            {children}
          </div>
        }
      </div>
    );
  }
}

const Editor = ({value, onChange}) => (
  <CKEditor 
    content={value}
    scriptUrl="/static/ckeditor/ckeditor.js"
    events= {{
      change: onChange
    }}
  />
)

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
            <header>
              <h2>New Job Posting</h2>
            </header>
            <div>
              <label htmlFor="title">Title:</label>
              <div className="labeledField">
                <Field
                  name="title"
                  type="text"
                  component={renderField}
                  label="Ex: Account Manager"
                  validate={required}
                />
              </div>
            </div>
            <div>
              <label htmlFor="location">Location:</label>
              <div className="labeledField">
                <Field
                  name="location"
                  label="Ex: New York, NY"
                  component={PlaceField}
                  validate={required}
                />
              </div>
            </div>

            <Expander title="Employment Type">
              <Field
                name="employment" component={RadioButtonGroup} validate={required}
              >
                { EMPLOYEMENTS_DROPDOWN_DATA
                    .map(item => <RadioButton key={item.id} value={item.title} label={item.title} style={{marginBottom: 12}} />) }
                  </Field>
              </Expander>

              <Expander title="Total Compensation">
                <Field
                  name="salary" component={renderSelectField} validate={required}
                >
                  { ANNUAL_INCOME_DROPDOWN_DATA
                      .map(item => <option key={item.id} value={item.title}>{item.title}</option>) }
                </Field>
              </Expander>

              <Expander title="Industry Experience">
            <Field
              name="experience" component={RadioButtonGroup} validate={required}
              label="Industry Experience"
            >
              { EXPERIENCE_DROPDOWN_DATA
                .map(item => <RadioButton key={item.id} value={item.title} label={item.title}  style={{marginBottom: 12}} />) }
            </Field>
              </Expander>

              <Expander title="Required Degree">
            <Field
              name="degree" component={RadioButtonGroup} validate={required}
            >
              { DEGREES_DROPDOWN_DATA
                  .map(item => <RadioButton key={item.id} value={item.title} label={item.title}  style={{marginBottom: 12}} />) }
            </Field>
              </Expander>

              <Expander title="Field of Expertise">
            <Field
              name="industryParent" component={RadioButtonGroup} validate={required}
            >
              { FIELD_OF_EXPERTISE_DROPDOWN_DATA
                .map(item => <RadioButton key={item.id} value={item.title} label={item.title} style={{marginBottom: 12}}  />) }
            </Field>
              </Expander>

              <Expander title="Specialty" className={industryValue ? "" : 'disabled'}>
              <Field
                name="industry" component={MultiInput} validate={required}
                label="Specialty"
                values={industryValue && industryParentObj(industryValue).map((item) => item.title)}
                initialValues={{ input: { value: [] } }}
              />
              </Expander>

              <Expander title="Description" className={industryValue ? "" : 'disabled'}>
              <label htmlFor="description" className="desc">Please enter the Requirements and Responsibilities for the role.</label>
              <Field
                name="description"
                type="text"
                component={Editor}
                validate={required}
              />
              </Expander>
          </div>

          <div className="recruter__newjob-card__form-bottom">

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
          className="text-area" placeholder={`${placeholder}` + ' #' + (index + 1) + '...'} />
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
export const preSubmit = (values) => {
  const newVal = industryOut(values);
  return cityToGeocode(values.location).then(({lat,lng}) => {
    newVal.locationCoordinates = {lat, lng};
    return newVal;
  }).catch(err => {
    console.log("Error getting lat/lng");
    console.log(err);
    return newVal;
  })
};

export const industryIn = (values) => {
  const newVal = { ...values };
  newVal.industry = values.industries.map(i => (i.value));
  newVal.industryParent = values.industries.length > 0 ? values.industries[0].parent : undefined;
  delete newVal.industries;
  return newVal;
};
