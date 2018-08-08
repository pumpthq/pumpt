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

// Expander needs to be wrapped inside Field so that it can display errors even
// when it isn't expanded.
// Expander can't manage its own state because every time Field re-renders its
// open/close state will reset.
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
  render() {
    const {title, preview, children, onToggleExpand, expanded} = this.props;
    return (
      <div className={`expander ${expanded ? 'expanded' : ''}`}>
        <header role="button" style={buttonStyle} tabIndex="0" onClick={onToggleExpand(title)}>
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
    const data = evt.editor.getData();
    this.props.input.onChange(data);
  }

  render() {
    return (
      <div>
      <CKEditor
        scriptUrl="/static/ckeditor/ckeditor.js"
        content={this.props.input.value}
        events={{
          change: this.onChange,
          blur: () => this.props.input.onBlur()
        }}
      />
      {this.props.meta.touched && this.props.meta.error &&
          <span className="textfield__error textfield__error_small">{this.props.meta.error}</span>}
    </div>
    );
  }
}

// NOTE: this generic job form is used for creating a new job and editing an existing one,
// which is why submit is handled by its parents (new job form and edit job form)
class JobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {expandedFields: []};
  }

  onToggleExpand = (id) => () => {
    this.setState(({expandedFields}) => (
      expandedFields.includes(id) ?
      {expandedFields: expandedFields.filter(f => f !== id)}
      :
      {expandedFields: expandedFields.concat([id])}
    ))
  }

  expanded = (id) => {
    return this.state.expandedFields.includes(id);
  }

  render() {
  const { handleSubmit, submitting, error, formValues } = this.props;

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
          <div className="recruter__newjob-card__form-top card-inner">
            <header>
              <h2>New Job Posting</h2>
            </header>
            <div className="row">
              <label className="col-auto" htmlFor="title">Job Title:</label>
              <div className="col labeledField">
                <Field
                  name="title"
                  type="text"
                  component={renderField}
                  label="Ex: Account Manager"
                  validate={required}
                />
              </div>
            </div>
            <div className="row">
              <label className="col-auto" htmlFor="location">Location:</label>
              <div className="col labeledField">
                <Field
                  name="location"
                  label="Ex: New York, NY"
                  component={PlaceField}
                  validate={required}
                />
              </div>
            </div>

              <Field
                name="employment"
                component={ExpandableField(MultiInput)}
                validate={required}
                expander = {{
                  title: "Employment Type",
                  preview: formValues.employment,
                  onToggleExpand: this.onToggleExpand,
                  expanded: this.expanded("Employment Type")
                }}
                componentProps={{
                  values: EMPLOYEMENTS_DROPDOWN_DATA.map(i => i.title)
                }}
              />

                <Field
                  name="salary" component={ExpandableField(RadioButtonGroup)}
                  validate={required}
                  expander= {{
                    title: "Total Compensation",
                    preview: formValues.salary,
                    onToggleExpand: this.onToggleExpand,
                    expanded: this.expanded("Total Compensation")
                  }}
                >
                  { ANNUAL_INCOME_DROPDOWN_DATA
                      .map(item => <RadioButton key={item.id} value={item.title} label={item.title} style={{marginBottom: 12}} />) }
                </Field>

            <Field
              name="experience" component={ExpandableField(RadioButtonGroup)}
              validate={required}
              expander= {{
                title: "Years of Experience",
                preview: formValues.experience,
                onToggleExpand: this.onToggleExpand,
                expanded: this.expanded("Years of Experience")
              }}
              componentProps = {{label: "Years of Experience"}}
            >
              { EXPERIENCE_DROPDOWN_DATA
                .map(item => <RadioButton key={item.id} value={item.title} label={item.title}  style={{marginBottom: 12}} />) }
            </Field>

            <Field
              name="degree" component={ExpandableField(RadioButtonGroup)}
              validate={required}
              expander= {{
                title: "Required Degree",
                preview: formValues.degree,
                onToggleExpand: this.onToggleExpand,
                expanded: this.expanded("Required Degree")
              }}
            >
              { DEGREES_DROPDOWN_DATA
                  .map(item => <RadioButton key={item.id} value={item.title} label={item.title}  style={{marginBottom: 12}} />) }
            </Field>

            <Field
              name="industryParent"
              component={ExpandableField(RadioButtonGroup)}
              validate={required}
              expander={{
                title: "Working Areas",
                preview: formValues.industryParent,
                onToggleExpand: this.onToggleExpand,
                expanded: this.expanded("Working Areas")
              }}
            >
              { FIELD_OF_EXPERTISE_DROPDOWN_DATA
                .map(item => <RadioButton key={item.id} value={item.title} label={item.title} style={{marginBottom: 12}}  />) }
            </Field>

              <Field
                name="industry" validate={required}
                component={ExpandableField(MultiInput)}
                expander={{
                title: "Specialty",
                className: industryParent ? "" : 'disabled',
                preview: formValues.industry && formValues.industry.join(', '),
                  onToggleExpand: this.onToggleExpand,
                  expanded: this.expanded('Specialty')
                }}
                componentProps={{
                  label: "Specialty",
                  values: industryParent && industryParentObj(industryParent).map((item) => item.title),
                  initialValues: { input: { value: [] } }
                }}
              />

            <div>
              <h5>Description</h5>
              <Field
                name="description"
                component={Editor}
                validate={required}
              >
                <label
                  htmlFor="description"
                  className="desc">
                  Please enter the Requirements and Responsibilities for the role.
                </label>
            </Field>
            </div>
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
}}

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
