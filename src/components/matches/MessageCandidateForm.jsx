import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o';
import { updateCandidate } from 'actions/candidateMatches'

//Generalized Redux Field
const renderField = ({
  input,
  label,
	value,
  type,
  meta: { asyncValidating, touched, error }
}) => (
  <div>
		<div class={asyncValidating ? 'async-validating' : 'class'}>
      <input class="mdl-textfield__input textfield__input" {...input} value={value} placeholder={label} type={type} />
      {touched && error && <span class="textfield__error">{error}</span>}
    </div>
  </div>
)

let MessageCandidateForm = props => {
		const { trigger, handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = props
		const submitDisabled = invalid || submitting

		const submit = (values) => {
			
				{/*<a href={`mailto:${trigger ? trigger.candidate.brief.user.email : 'no@email.com'}`} onClick={handleSubmit}>Approve and Email</a> */}
			return dispatch(updateCandidate(values))
				.catch(err => {
						throw new SubmissionError({
								_error: 'Error Occured While Trying to Save Your Profile' 
						})
				})
		}


		return (
			<div>
			<form onSubmit={handleSubmit}>

				<div class="fa-icon"><FaEnvelopeO />
				<br />
				<h4>Connect to Your Candidate</h4>
				</div>
				<div>
					To: {}<br />
					From: {}<br />
					Subject: <Field name='subject' component={renderField} value="Job Opportunity via Pumpt"/>
					Message: <Field name='body' component="textarea" class="text-area" label="Message" value={"Hi,\n\nYou were highly matched to a job we posted on Pumpt. I’d like to connect with you soon to discuss this position.\n\nPlease let me know when you’re available to speak.\n\nThank you."}/>
				</div>
				{/*<a href={`mailto:${trigger ? trigger.candidate.brief.user.email : 'no@email.com'}`} onClick={handleSubmit}>Approve and Email</a>*/} 

					<button type="submit" disabled={submitDisabled}
					className="center mdl-button button invisible-mobile button_type_colored button_size_m candidate-submit">
						{submitting ? <i/> : <i/>} Approve and Email
					</button>

			</form>
			</div>
		)
}

//Define Form
MessageCandidateForm = reduxForm({
	form: 'messageCandidateForm'
})(MessageCandidateForm)

//Export Form
export default MessageCandidateForm
