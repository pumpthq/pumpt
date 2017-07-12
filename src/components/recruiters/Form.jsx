import React, {Component, PropTypes} from 'react';
import { reduxForm, Field, SubmissionError, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { updateRecruiter } from 'actions/applicationCompany'

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

let RecruiterForm = props => {

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
			<form onSubmit={handleSubmit} className="recruiter-form">
				<Field
					name="fullName"
					type="text"
					component={renderField}
					label="Your Name"
				/>
				<Field
					name="position"
					type="text"
					component={renderField}
					label="Position"
				/>

				<div>
					<button type="submit" disabled={submitDisabled} className="mdl-button button button_type_colored button_size_m">
							{submitting ? <i/> : <i/>} Save
					</button>
					<button type="button" disabled={submitDisabled} onClick={onCancel} className="mdl-button button button_type_colored button_size_m">
							Cancel
					</button>
				</div>
			</form>
		)
  }

//Define Form
RecruiterForm = reduxForm({
	form: 'recruiterForm',
	enableReinitialize : true,
	// onSubmit: submit /* use onSubmit prop passed to component instead */
})(RecruiterForm)


RecruiterForm = connect(state => {
})(RecruiterForm)


//Export Form
export default RecruiterForm
