import React, {Component} from 'react'
import { reduxForm, Field } from 'redux-form'

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { postApprove } from 'actions/companyJobs'

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

let ApproveAndEmailCandidateDialog = props => {

{/*export default class ApproveAndEmailCandidateDialog extends Component {

    componentWillReceiveProps(nextProps) {
        if(nextProps.trigger !== this.props.trigger) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
        if(this.props.onClose) this.props.onClose();
    };

    handleSubmit = (values) => {
        const {dispatch, trigger} = this.props

        dispatch(postApprove(trigger._id))

        // ⚠️ window.open and window.location.href do not work as expected with react-router
        //const mailToLink = "mailto:"+email+'&subject='+values.subject+'&body='+values.body
        //window.open(mailToLink, '_blank');
        //window.location.href = mailToLink

        this.handleClose();
    }

    render() {

        const { fields: { subject, body}, trigger, messageText="" } = this.props
*/}

		const { handleSubmit, submitting, error, invalid, valid, dispatch, names, values, trigger} = props

    const state = {
        open: false,
				messageText: ""
    }

    const handleOpen = () => {
        this.setState({open: true})
    }

    const handleClose = () => {
        this.setState({open: false})
        if(this.props.onClose) this.props.onClose()
    }

		const submit = (values, dispatch) => {
			dispatch(postApprove(trigger._id))
			this.handleClose()
		}


		return (
						<Dialog
								modal={false}
								open={handleOpen}
								onRequestClose={handleClose}
						>
								<div>
										Time to contact the candidate!
										<div>
												<Field name="subject" label="Subject" value="Job Opportunity via Pumpt"/>
												<Field name="body" component="textarea" class="text-area" label="Message"value={"Hi,\n\nYou were highly matched to a job we posted on Pumpt. I’d like to connect with you soon to discuss this position.\n\nPlease let me know when you’re available to speak.\n\nThank you."}/>
										</div>
										{/*	<a href={`mailto:${trigger ? trigger.candidate.brief.user.email : 'no@email.com'}?subject={`${subject.value}`}&body=${body.value}&bcc=$info@pumpthq.com`} onClick={this.handleSubmit}>Approve and Email</a> */}
								</div>
						</Dialog>
		)
}
ApproveAndEmailCandidateDialog = reduxForm({
	form: 'approveAndEmailCandidateDialogForm',
})(ApproveAndEmailCandidateDialog )

export default ApproveAndEmailCandidateDialog
