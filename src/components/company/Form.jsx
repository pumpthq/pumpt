import React, {Component, PropTypes} from 'react';
import { reduxForm, Field, SubmissionError, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { Location, EnumSelector, TextArea, TextInput } from 'components/form/inputs'

//Actions
import { updateCompany } from 'actions/applicationCompany'

import { browserHistory } from 'react-router'
import { find } from 'lodash'

import {
    COMPANY_EMPLOYEES_DATA,
    COMPANY_TYPE_DATA,
} from 'constants/companyOnboarding';


//Generalized Redux Field
export const renderField = ({
  input,
  label,
  type,
	className,
  meta: { asyncValidating, touched, error }
}) => (
  <div class={className}>
		<div class={asyncValidating ? 'async-validating' : 'class'}>
      <input class="mdl-textfield__input textfield__input" {...input} placeholder={label} type={type} />
      {touched && error && <span class="textfield__error">{error}</span>}
    </div>
  </div>
)

const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
    <div>
      <select {...input} class="margin-top-15 mdl-textfield__input textfield__input textfield__light">
				<option value="" class="disabled-text-option" disabled selected>{label}</option>
        {children}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
)

//Validations
import {year} from 'components/main/form/validations'
import {normalizeYear} from 'components/main/form/normalizations'


//Form
let CompanySummaryForm = props =>  {
	const {
		handleSubmit,
		submitting,
		error,
		invalid,
		valid,
		dispatch,
		names,
	 	values,
		industryValue,
        onCancel,
	} = props

	const submitDisabled = invalid || submitting

		return (

			<form onSubmit={handleSubmit} class="company-edit-form"> 
				<div class="row">
					<div class="col-md-6 col-md-offset-3">
						<Field
							name="name"
							type="text"
							component={renderField}
							label="Company Name"
						/>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<Field name="employeesAmount" component={renderSelectField} label="Number of Employees" class="mdl-textfield__input textfield__input textfield__light">
							{ COMPANY_EMPLOYEES_DATA.map((item) => {return <option value={item.title}>{item.title}</option>}) }
						</Field>
					</div>
					<div class="col-md-4">
						<Field name="type" component={renderSelectField} label="Company Type" class="mdl-textfield__input textfield__input textfield__light">
							{ COMPANY_TYPE_DATA[0].items.map((item) => {return <option value={item.title}>{item.title}</option>}) }
						</Field>
					</div>
					<div class="col-md-4">
						<Field
							name="foundDate"
							type="text"
							component={renderField}
							label="YearFounded"
							validate={year}
							normalize={normalizeYear}
						/>
					</div>
			</div>

				<div className="candidate-buttons">
					<button type="submit" disabled={submitDisabled} className="mdl-button button button_type_colored button_size_m">
							{submitting ? <i/> : <i/>} Save
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
	// onSubmit: submit /* use onSubmit prop passed to component instead */
})(CompanySummaryForm)

const selector = formValueSelector('companySummaryForm')

CompanySummaryForm = connect(state => {
})(CompanySummaryForm)


//Export Form
export default CompanySummaryForm
