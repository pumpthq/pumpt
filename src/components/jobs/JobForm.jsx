import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, getFormValues, reduxForm } from 'redux-form';
import { RadioButton } from 'material-ui/RadioButton';
import { RadioButtonGroup } from 'redux-form-material-ui';
// Places Autocomplete Library
import { PlaceField } from 'components/main/form/PlaceField';
import MultiInput from 'components/main/form/MultiInput';
import './jobform.less';
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

const buttonStyle = {
  cursor: 'pointer',
};

export const TextAreaField = ({ children, input, label} ) => (
  <div>
    {children}
    <textarea className="textfield__input" {...input} placeholder={label} />
  </div>
);

// Expander needs to be wrapped inside Field so that it can display errors even
// when it isn't expanded.
// Expander can't manage its own state because every time Field re-renders its
// open/close state will reset.
// TODO: lift the state of Expanders up into JobForm
const ExpandableField = (FieldComponent) => {
  const expandableField = ({ children, expander, componentProps, input, label, meta: { touched, error } }) => (
    <div>
    <Expander {...expander}>
      <FieldComponent {...componentProps} input={input} label={label}>
        {children}
      </FieldComponent>
    </Expander>
        {touched && error && <span className="textfield__error textfield__error_small">{error}</span>}
      </div>
  )
  return expandableField;
}
class Expander extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  toggleExpand = () => {
    this.setState(({expanded}) =>({expanded: !expanded}))
  }

  render() {
    const {title, preview, children} = this.props;
    const { expanded } = this.state;
    return (
      <div className={`expander ${expanded ? 'expanded' : ''}`}>
        <header role="button" style={buttonStyle} tabIndex="0" onClick={this.toggleExpand}>
          <h5>{title}</h5>
        </header>

          <div className="expander_content">
            {children}
          </div>
          {
            !expanded &&
          <div className="expander_preview">
            {preview}
          </div>

        }
      </div>
    );
  }
}


class Editor extends Component {
  constructor(props){
    super(props);
  }

  onChange = (evt) => {
    this.props.input.onChange(evt.editor.getData());
    console.log(evt);
  }

  render() {
    return (
      <div>
      <CKEditor
        scriptUrl="/static/ckeditor/ckeditor.js"
        content={this.props.input.value}
        events={{
          change: this.onChange
        }}
      />
    </div>
    );
  }
}

// NOTE: this generic job form is used for creating a new job and editing an existing one,
// which is why submit is handled by its parents (new job form and edit job form)
let JobForm = props => {
  const { handleSubmit, submitting, error, formValues } = props;

  const { industryParent } = formValues;
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

            <Expander title="Employment Type"
              preview={(formValues.employment)}
            >
              <Field
                name="employment" component={RadioButtonGroup} validate={required}
              >
                { EMPLOYEMENTS_DROPDOWN_DATA
                    .map(item => <RadioButton key={item.id} value={item.title} label={item.title} style={{marginBottom: 12}} />) }
                  </Field>
              </Expander>

              <Expander title="Total Compensation"
                preview={(formValues.salary)}
              >
                <Field
                  name="salary" component={RadioButtonGroup} validate={required}
                >
                  { ANNUAL_INCOME_DROPDOWN_DATA
                      .map(item => <RadioButton key={item.id} value={item.title} label={item.title} style={{marginBottom: 12}} />) }
                </Field>
              </Expander>

              <Expander title="Industry Experience"
                preview={(formValues.experience)}
              >
            <Field
              name="experience" component={RadioButtonGroup} validate={required}
              label="Industry Experience"
            >
              { EXPERIENCE_DROPDOWN_DATA
                .map(item => <RadioButton key={item.id} value={item.title} label={item.title}  style={{marginBottom: 12}} />) }
            </Field>
              </Expander>

              <Expander title="Required Degree"
                preview={(formValues.degree)}
              >
            <Field
              name="degree" component={RadioButtonGroup} validate={required}
            >
              { DEGREES_DROPDOWN_DATA
                  .map(item => <RadioButton key={item.id} value={item.title} label={item.title}  style={{marginBottom: 12}} />) }
            </Field>
              </Expander>

              <Expander title="Field of Expertise"
                preview={(formValues.industryParent)}
              >
            <Field
              name="industryParent" component={RadioButtonGroup} validate={required}
            >
              { FIELD_OF_EXPERTISE_DROPDOWN_DATA
                .map(item => <RadioButton key={item.id} value={item.title} label={item.title} style={{marginBottom: 12}}  />) }
            </Field>
              </Expander>

              <Field
                name="industry" validate={required}
                component={ExpandableField(MultiInput)}
                expander={{
                title: "Specialty",
                className: industryParent ? "" : 'disabled',
                preview: formValues.industry && formValues.industry.join(', ')
                }}
                componentProps={{
                  label: "Specialty",
                  values: industryParent && industryParentObj(industryParent).map((item) => item.title),
                  initialValues: { input: { value: [] } }
                }}
              />

              <Field
                name="description"
                component={ExpandableField(TextAreaField)}
                expander={{
                  title: "Description",
                  preview: formValues.description 
                }}
                validate={required}
              >
                <label 
                  htmlFor="description"
                  className="desc">
                  Please enter the Requirements and Responsibilities for the role.
                </label>
            </Field>
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

// Define Form
JobForm = reduxForm({
  form: 'jobForm',
  enableReinitialize: true,
})(JobForm);

JobForm = connect(state => ({formValues: getFormValues('jobForm')(state) || {}}))(JobForm);

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
