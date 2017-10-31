import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import { reduxForm, FieldArray, Field, SubmissionError, formValueSelector } from 'redux-form'

//Places Autocomplete Library
import { PlaceField } from 'components/main/form/PlaceField'

//Actions
import { createJob } from 'actions/companyJobs'

import { browserHistory } from 'react-router'
import {
    ANNUAL_INCOME_DROPDOWN_DATA,
    EXPERIENCE_DROPDOWN_DATA,
    FIELD_OF_EXPERTISE_DROPDOWN_DATA,
} from 'constants/candidateOnboarding';
import {
    DEGREES_DROPDOWN_DATA,
    EMPLOYEMENTS_DROPDOWN_DATA,
} from 'constants/companyJobs';
import { find } from 'lodash'

//Field-level Validations & Normalizations
import { url, date, required, hasText } from 'components/main/form/validations'
import { industryChild } from 'components/main/form/normalizations'

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
      {touched && error && <span class="textfield__error textfield__error_small">{error}</span>}
    </div>
  </div>
)

export const TextAreaField = ({input, label, meta: { asyncValidating, touched, error } }) => (
		<span>
      <textarea class="mdl-textfield__input textfield__input" {...input} placeholder={label} />
      {touched && error && <span class="textfield__error textfield__error_small">{error}</span>}
    </span>
)

const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
    <div>
      <select {...input} class="mdl-textfield__input textfield__input textfield__light">
				<option value="" class="disabled-text-option" disabled selected>{label}</option>
        {children}
      </select>
      {touched && error && <span class="textfield__error textfield__error_small">{error}</span>}
    </div>
)
const buttonStyle = {
    cursor: 'pointer',
};

let JobForm = props => {
	const {handleSubmit, submitting, touched, error, invalid, valid, dispatch, names, values, industryValue} = props

	const submit = (values, dispatch) => {
		return dispatch(createJob(values))
			.catch(err => {
					throw new SubmissionError({
							_error: 'Error Creating Job. Please Correct Any Errors Above and Try Again'
					})
			})
	}
	const industryParentObj = (parentValue) => {
		const output = find(FIELD_OF_EXPERTISE_DROPDOWN_DATA, o => o.title === parentValue)
		return output.items
	}

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
					<form onSubmit={handleSubmit} class="mdl-card card card_state_open card_state_scroll">
            <div className="recruter__newjob-card__form-top">
              <div>
                <label>Title</label>
                <div>
										<Field
											name="title"
											type="text"
											component={renderField}
											label="Enter Job Title"
											validate={required}/>
                </div>
              </div>
              <div>
                <label>Location</label>
                <div class="dark">
									<Field
										name="location"
										label="Location"
										component={PlaceField}
										validate={required}
									 />
								</div>
              </div>

								<Field name="salary" component={renderSelectField} validate={required} label="Income" class="mdl-textfield__input textfield__input textfield__light">
									{ ANNUAL_INCOME_DROPDOWN_DATA.map(item => <option key={item.id}  value={item.title}>{item.title}</option>) }
								</Field>

								<Field name="experience" component={renderSelectField} validate={required} label="Industry Experience" class="mdl-textfield__input textfield__input textfield__light">
									{ EXPERIENCE_DROPDOWN_DATA.map((item) => {return <option key={item.id}  value={item.title}>{item.title}</option>}) }
								</Field>

								<Field name="employment" component={renderSelectField} validate={required} label="Employment Type" class="mdl-textfield__input textfield__input textfield__light">
									{ EMPLOYEMENTS_DROPDOWN_DATA.map((item) => {return <option key={item.id}  value={item.title}>{item.title}</option>}) }
								</Field>

								<Field name="degree" component={renderSelectField} validate={required} label="Lowest Degree Needed" class="mdl-textfield__input textfield__input textfield__light">
									{ DEGREES_DROPDOWN_DATA.map((item) => {return <option key={item.id}  value={item.title}>{item.title}</option>}) }
								</Field>

								<Field name="industryParent" component={renderSelectField} validate={required} label="Field of Expertise" class="mdl-textfield__input textfield__input textfield__light">
									{ FIELD_OF_EXPERTISE_DROPDOWN_DATA.map((item) => {return <option key={item.id} value={item.title}>{item.title}</option>}) }
								</Field>

								{industryValue &&
									<Field name="industry" component={renderSelectField} validate={required} label="Specialty" class="mdl-textfield__input textfield__input textfield__light">
										{ industryParentObj(industryValue).map((item) => {return <option value={item.title}>{item.title}</option>})  }
									</Field>
								}
                <div>
                  <label>Description</label>
    										<Field
    											name="description"
    											type="text"
    											component={TextAreaField}
    											validate={required}/>
                </div>
            </div>

            <div className="recruter__newjob-card__form-bottom">


							<FieldArray name="responsibilities" label="Responsibilities" 	validate={hasText}	placeholder="Responsibility" component={renderLists} />
							<FieldArray name="requirements" 		label="Requirements" 		validate={hasText}	placeholder="Requirement" component={renderLists} />

							{error && <span class="textfield__error">{error}</span>}
								<br/>

							<div>
								<button type="submit"
								className="mdl-button button button_type_colored button_size_m candidate-submit"
                disabled={submitting}>
									{submitting ? <i/> : <i/>} Save Job
								</button>
							</div>

            </div>
          </form>
        </div>
      </div>
    )
}

const renderLists = ({ fields, label, validate, placeholder, meta: { error } }) => (
					<div>
            <button className="mdl-button new-job-add-button" type="button" onClick={() => {
							fields.push()
						}}><i/>
						{fields.length === 0 && 'Add'} {label}
						</button>

            {fields.map((child, index) =>
                <div key={index}>
										<Field name={child} component="textarea" validate={validate} class="text-area" placeholder={ `${placeholder}`+" #"+(index+1)+"..." }/>
                    <button type="button" className="remove-entry" onClick={() => {
											fields.remove(index)
                    }}><i>Remove</i>
                    </button>
                </div>
            )}

					{error && <li className="error">{error}</li>}
					{fields.length > 0 && <button className="add-entry mdl-button" type="button" onClick={() => {
							fields.push()
						}}>Add
					</button>}
        </div>

)


//Define Form
JobForm = reduxForm({
	form: 'jobForm',
	enableReinitialize : true
})(JobForm)

const selector = formValueSelector('jobForm')

JobForm = connect(state => {
	const industryValue = selector(state, 'industryParent')
		return {
			industryValue
		}
})(JobForm)

//Export Form
export default JobForm
