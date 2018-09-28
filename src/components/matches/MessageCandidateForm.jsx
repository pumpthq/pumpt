import React from 'react';
import {connect} from 'react-redux'
import {Field, formValueSelector, reduxForm} from 'redux-form'
import {updateCandidate} from 'actions/candidateMatches'

let MessageCandidateForm = props => {

	const { bodyValue, subjectValue, trigger, recruiter, handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = props
	const submitDisabled = invalid || submitting

	return (
		<div className="message-candidate container">
			<h4 className="text-center">Connect with Your Candidate</h4>
		<form onSubmit={handleSubmit}>
      <div>
        <div className="row email-header">
          <span class="email-label">To: &nbsp;</span>
          <span class="email-field">{ `${trigger.candidate.brief.firstName} ${trigger.candidate.brief.lastName}` }</span>
        </div>
        <div className="row email-header">
          <span class="email-label">From: &nbsp;</span>
          <span class="email-field no-margin">{ `${recruiter.fullName} at ${trigger.company.brief.name}` }</span>
        </div>
        <div className="row email-header">
          <label htmlFor="subject" class="email-label subject">Subject: &nbsp;</label>
          <Field name='subject' component="input" class="email-field subject" />
        </div>
				<br />
        <div className="row email-body">
          <Field name='body' component="textarea"  />
        </div>
			</div>
      <div className="d-flex justify-content-center">
				<button
					type="submit"
					disabled={submitDisabled}
					className="center mdl-button buttone button_type_colored button_size_m candidate-submit"
						>
					{submitting ? <i/> : <i/>} Approve and Send
				</button>
      </div>
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
