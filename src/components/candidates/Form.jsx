import React from 'react';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import MultiInput from 'components/main/form/MultiInput';
import { renderSelectField, renderTextField } from 'components/form/helpers';
import { MenuItem } from 'material-ui';
// Actions
import { find } from 'lodash';
import {
  ANNUAL_INCOME_DROPDOWN_DATA,
  EXPERIENCE_DROPDOWN_DATA,
  FIELD_OF_EXPERTISE_DROPDOWN_DATA,
  INDUSTRY_DROPDOWN_DATA,
  JOB_TITLE_DROPDOWN_DATA,
} from 'constants/candidateOnboarding';

import './form.less';

// Form
let CandidateSummaryForm = props => {
  const {
    handleSubmit,
    submitting,
    invalid,
    industryValue,
    onCancel,
  } = props;

  const submitDisabled = invalid || submitting;

  const industryParentObj = (parentValue) => {
    const output = find(FIELD_OF_EXPERTISE_DROPDOWN_DATA, o => o.title === parentValue);
    return output.items;
  };

  return (

    <form onSubmit={handleSubmit} className="candidate-edit-form">
      <div className="row">
        <div className="col-md-3 col-md-offset-3">
          <Field
            name="firstName"
            component={renderTextField}
            label="First Name"
          />
        </div>
        <div className="col-md-3">
          <Field
            name="lastName"
            component={renderTextField}
            label="Last Name"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4">
              <Field
                name="recentAnnualIncome"
                component={renderSelectField} label="Income"
              >
                { ANNUAL_INCOME_DROPDOWN_DATA.map(item => <MenuItem key={item.id} value={item.title} primaryText={item.title} />) }
              </Field>
            </div>
            <div className="col-md-4">
              <Field
                name="recentAreaExperience"
                component={renderSelectField} label="Years of Experience"
              >
                { EXPERIENCE_DROPDOWN_DATA.map((item) => (<MenuItem key={item.id} value={item.title} primaryText={item.title} />)) }
              </Field>
            </div>
            <div className="col-md-4">
              <Field
                name="recentJob"
                component={renderSelectField} label="Job Title"
              >
                { JOB_TITLE_DROPDOWN_DATA[0].items.map(item => <MenuItem key={item.id} value={item.title} primaryText={item.title} />) }
              </Field>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label>Industry Experience</label>
              <Field
                name="interestWorkingArea"
                component={MultiInput}
                label="Industry Experience"
                values={INDUSTRY_DROPDOWN_DATA[0].items.map((item) => (item.title))}
              />
            </div>
            <div className="col-md-4">
              <label>Expertise</label>
              <Field
                name="recentWorkingAreaParent"
                component={renderSelectField}
                label="Field Of Expertise"
              >
                { FIELD_OF_EXPERTISE_DROPDOWN_DATA
                  .map((item) => <MenuItem key={item.id} value={item.title} primaryText={item.title} />)}
              </Field>
              {industryValue &&
                <div>
                  <Field
                    name="recentWorkingArea"
                    component={MultiInput}
                    label="Specialty"
                    values={industryParentObj(industryValue).map((item) => (item.title))}
                    class="mdl-textfield__input textfield__input textfield__light"
                  />
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <div className="candidate-buttons">
        <button
          type="submit" disabled={submitDisabled}
          className="mdl-button button button_type_colored button_size_m"
        >
          Save
        </button>
        <button
          type="button" disabled={submitting} onClick={onCancel}
          className="mdl-button button button_type_colored button_size_m"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

// Define Form
CandidateSummaryForm = reduxForm({
  form: 'candidateSummaryForm',
  enableReinitialize: true,
})(CandidateSummaryForm);

const selector = formValueSelector('candidateSummaryForm');

CandidateSummaryForm = connect(state => {
  const industryValue = selector(state, 'recentWorkingAreaParent');
  return {
    industryValue,
  };
})(CandidateSummaryForm);


// Export Form
export default CandidateSummaryForm;
