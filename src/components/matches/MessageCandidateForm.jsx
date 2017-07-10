import React from 'react'
import { reduxForm, Field } from 'redux-form'

//Generalized Redux Field
const renderField = ({
  input,
  label,
  type,
  meta: { asyncValidating, touched, error }
}) => (
  <div>
		<div class={asyncValidating ? 'async-validating' : 'class'}>
      <input class="mdl-textfield__input textfield__input" {...input} placeholder={label} type={type} />
      {touched && error && <span class="textfield__error">{error}</span>}
    </div>
  </div>
)

let MessageCandidateForm = props => {
		const { handleSubmit, invalid, asyncValidating, submitting, error, valid, dispatch } = props


		return (
			<div>
			<form onSubmit={handleSubmit}>

				Time to contact the candidate!
				<div>
					<Field name='subject' label="Subject" value="Job Opportunity via Pumpt"/>
					<Field name='body' component="textarea" class="text-area" label="Message" value={"Hi,\n\nYou were highly matched to a job we posted on Pumpt. I’d like to connect with you soon to discuss this position.\n\nPlease let me know when you’re available to speak.\n\nThank you."}/>
				</div>
				{/*   <a href={`mailto:${trigger ? trigger.candidate.brief.user.email : 'no@email.com'}?subject=${subject.value}&body=${body.value}&bcc=$info@pumpthq.com`} onClick={this.handleSubmit}>Approve and Email</a> */}

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
