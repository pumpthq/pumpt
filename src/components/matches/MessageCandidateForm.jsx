import React from 'react';
import {connect} from 'react-redux'
import {Field, formValueSelector, reduxForm} from 'redux-form'
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o';
import {updateCandidate} from 'actions/candidateMatches'

let MessageCandidateForm = props => {

	const { bodyValue, subjectValue, trigger, recruiter, handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = props
	const submitDisabled = invalid || submitting

	const submit = (values) => {
		
		return dispatch(updateCandidate(values))
			.catch(err => {
					throw new SubmissionError({
							_error: 'Error!' 
					})
			})
	}

	return (
		<div>
		<form action="mailto:no@email.com" onSubmit={handleSubmit}>

			<div class="fa-icon"><FaEnvelopeO />
			<br />
			<h4>Connect with Your Candidate</h4>
			<br />
			<br />
			</div>
			<div>
				<span class="email-label">To:</span>
				<span class="email-field">{ `${trigger.candidate.brief.firstName} ${trigger.candidate.brief.lastName}` }</span><br />
				<br />

				<span class="email-label">From:</span>
				<span class="email-field no-margin">{ `${recruiter.fullName}` }</span> at <span class="email-field">{ `${trigger.company.brief.name}` }</span><br />
				<br />

				<div class="row">
					<div class="col-md-2 margin-top-15">
						<span class="email-label">Subject:</span>
					</div>
					<div class="col-md-10">
						<Field name='subject' component="input" class="mdl-textfield__input textfield__input email-field" />
					</div>
				</div>
				<br />
				<br />

				<span class="email-label">Message:</span>
				<Field name='body' component="textarea" class="text-area text-area-large"  />
			</div>


				<button
					type="submit"
					disabled={submitDisabled}
					className="center mdl-button buttone button_type_colored button_size_m candidate-submit"
						>
					{submitting ? <i/> : <i/>} Approve and Email
				</button>


		</form>
		</div>
	)
}

//Define Form
//
//
const formattedEmailBody = 

MessageCandidateForm = reduxForm({
	form: 'messageCandidateForm',
	enableReinitialize : true,
	initialValues: {
		subject: 'Job Opportunity via Pumpt',
		body: 'Hi,\n\nYou were highly matched to a job we posted on Pumpt. I’d like to connect with you soon to discuss this position.\n\nPlease let me know when you’re available to speak.\n\nThank you.',
	}
})(MessageCandidateForm)


// Decorate with connect to read form values
const selector = formValueSelector('messageCandidateForm')
MessageCandidateForm = connect(state => {
  const subjectValue = selector(state, 'subject')
  const bodyValue = selector(state, 'body')

  return {
		subjectValue,
		bodyValue
  }
})(MessageCandidateForm)


//Export Form
export default MessageCandidateForm
