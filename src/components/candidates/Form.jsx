import React, {Component, PropTypes} from 'react';
import { reduxForm, Field, SubmissionError, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { Location, EnumSelector, TextArea, TextInput } from 'components/form/inputs'

//Actions
import { updateCandidate } from 'actions/candidateMatches'

import { browserHistory } from 'react-router'
import { find } from 'lodash'

import {
    INDUSTRY_DROPDOWN_DATA,
    FIELD_OF_EXPERTISE_DROPDOWN_DATA,
    JOB_TITLE_DROPDOWN_DATA,
    ANNUAL_INCOME_DROPDOWN_DATA,
    EXPERIENCE_DROPDOWN_DATA,
} from 'constants/candidateOnboarding';


//Special Normalizer for Data Fields
const lessThan = otherField => (value, previousValue, allValues) =>
  parseFloat(value) < parseFloat(allValues[otherField]) ? value : previousValue

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
      <select {...input} class="mdl-textfield__input textfield__input textfield__light">
				<option value="" class="disabled-text-option" disabled selected>{label}</option>
        {children}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
)


//Form
let CandidateSummaryForm = props =>  {
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

	const industryParentObj = (parentValue) => {
		const output = find(FIELD_OF_EXPERTISE_DROPDOWN_DATA, o => o.title === parentValue)
		return output.items
	}

		return (

			<form onSubmit={handleSubmit} class="candidate-edit-form"> 
				<div class="row">
					<div class="col-md-4">
						<Field
							name="firstName"
							type="text"
							component={renderField}
							label="First Name"
						/>
					</div>
					<div class="col-md-4">
						<Field
							name="lastName"
							type="text"
							component={renderField}
							label="Last Name"
						/>
					</div>
					<div class="col-md-12">
						<div class="row">
							<div class="col-md-4">
								<Field name="interestWorkingArea" component={renderSelectField} label="Industry" class="mdl-textfield__input textfield__input textfield__light">
									{ INDUSTRY_DROPDOWN_DATA[0].items.map((item) => {return <option value={item.title}>{item.title}</option>}) }
								</Field>
							</div>
							<div class="col-md-4">
								<Field name="recentWorkingAreaParent" component={renderSelectField} label="Recent Working Area" class="mdl-textfield__input textfield__input textfield__light">
									{ FIELD_OF_EXPERTISE_DROPDOWN_DATA.map((item) => {return <option key={item.id} value={item.title}>{item.title}</option>}) }
								</Field>
							</div>
							<div class="col-md-4">
								{industryValue && 
									<Field name="recentWorkingArea" component={renderSelectField} label="Specialty" class="mdl-textfield__input textfield__input textfield__light">
										{ industryParentObj(industryValue).map((item) => {return <option value={item.title}>{item.title}</option>})  }
									</Field>
								}
							</div>
							{industryValue ?
								<div class="col-md-4">
									<Field name="recentAnnualIncome" component={renderSelectField} label="Income" class="mdl-textfield__input textfield__input textfield__light">
										{ ANNUAL_INCOME_DROPDOWN_DATA.map(item => <option key={item.id}  value={item.title}>{item.title}</option>) }
									</Field>
								</div>
								:
								<div class="col-md-4 col-md-offset-4">
									<Field name="recentAnnualIncome" component={renderSelectField} label="Income" class="mdl-textfield__input textfield__input textfield__light">
										{ ANNUAL_INCOME_DROPDOWN_DATA.map(item => <option key={item.id}  value={item.title}>{item.title}</option>) }
									</Field>
								</div>
							}
							<div class="col-md-4">
								<Field name="recentJob" component={renderSelectField} label="Job Title" class="mdl-textfield__input textfield__input textfield__light">
									{ JOB_TITLE_DROPDOWN_DATA[0].items.map(item => <option key={item.id}  value={item.title}>{item.title}</option>) }
								</Field>
							</div>
							<div class="col-md-4">
								<Field name="recentAreaExperience" component={renderSelectField} label="Industry Experience" class="mdl-textfield__input textfield__input textfield__light">
									{ EXPERIENCE_DROPDOWN_DATA.map((item) => {return <option key={item.id}  value={item.title}>{item.title}</option>}) }
								</Field>
							</div>
						</div>
					</div>
			</div>

				{/*<EnumSelector field={recentWorkingAreaParent} label="Working Area" options={
											onBlur={this.updateIndustries} />*/}

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
CandidateSummaryForm = reduxForm({
	form: 'candidateSummaryForm',
	enableReinitialize : true,
	// onSubmit: submit /* use onSubmit prop passed to component instead */
})(CandidateSummaryForm)

const selector = formValueSelector('candidateSummaryForm')

CandidateSummaryForm = connect(state => {
	const industryValue = selector(state, 'recentWorkingAreaParent')
		return {
			industryValue
		}
})(CandidateSummaryForm)


//Export Form
export default CandidateSummaryForm
