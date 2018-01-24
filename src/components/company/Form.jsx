import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { MenuItem } from 'material-ui'

import MultiInput from 'components/main/form/MultiInput';
import { renderTextField, renderSelectField } from 'components/form/helpers';

import {
    COMPANY_EMPLOYEES_DATA,
    COMPANY_TYPE_DATA,
} from 'constants/companyOnboarding';

//Validations
import {year} from 'components/main/form/validations';
import {normalizeYear} from 'components/main/form/normalizations';
import './form.less'


//Form
let CompanySummaryForm = props =>  {
	const {
		handleSubmit,
		submitting,
		invalid,
    onCancel,
	} = props

	const submitDisabled = invalid || submitting
		return (

			<form onSubmit={handleSubmit} class="company-edit-form"> 
				<div class="row">
					<div class="col-md-6 col-md-offset-3">
						<Field
							name="name"
							component={renderTextField}
							label="Company Name"
						/>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
            <Field name="employeesAmount"
              component={renderSelectField} label="Number of Employees"
              class="mdl-textfield__input textfield__input textfield__light">
              { COMPANY_EMPLOYEES_DATA.map(item => <MenuItem key={item.id} value={item.title} primaryText={item.title} /> ) }
						</Field>
					</div>
					<div class="col-md-4">
            <label htmlFor="type">Company Type</label>
            <Field 
              name="type"
              component={MultiInput}
              values={COMPANY_TYPE_DATA[0].items.map((item) => (item.title))}
              label="Company Type"
              class="mdl-textfield__input textfield__input textfield__light" />
					</div>
					<div class="col-md-4">
						<Field
							name="foundDate"
							component={renderTextField}
							label="Year Founded"
							validate={year}
							normalize={normalizeYear}
						/>
					</div>
			</div>

				<div className="candidate-buttons">
					<button type="submit" disabled={submitDisabled} className="mdl-button button button_type_colored button_size_m">
							Save
					</button>
					<button type="button" disabled={submitting} onClick={onCancel} className="mdl-button button button_type_colored button_size_m">
							Cancel
					</button>
				</div>
			</form>
		)
	}

//Define Form
CompanySummaryForm = reduxForm({
	form: 'companySummaryForm',
	enableReinitialize : true,
})(CompanySummaryForm)

//Export Form
export default CompanySummaryForm
