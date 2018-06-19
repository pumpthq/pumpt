import React from 'react';
import {Field, formValueSelector, reduxForm, SubmissionError} from 'redux-form'
import {connect} from 'react-redux'
import {renderField} from 'components/form/helpers';

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
					label="Your Position"
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
