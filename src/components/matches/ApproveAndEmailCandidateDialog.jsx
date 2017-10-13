import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import  Dialog from 'material-ui/Dialog'
import { postApprove } from 'actions/companyJobs'
import  MessageCandidateForm from 'components/matches/MessageCandidateForm'

const propTypes = {};

function mapStateToProps(state, ownProps) {
	return { }
}

@connect(mapStateToProps)
export default class ApproveAndEmailCandidateDialog extends Component {

    state = {
        open: false,
				messageText: "",
    };

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
        const {dispatch, trigger, recruiter} = this.props
				const mailToLink = `mailto:${trigger ? trigger.candidate.brief.user.email : 'no@email.com'}?subject=${values.subject}&body=${encodeURIComponent('Hi,\n\nYou were highly matched to a job we posted on Pumpt. I’d like to connect with you soon to discuss this position.\n\nPlease let me know when you’re available to speak.\n\nThank you.')}&bcc=info@pumpthq.com`

				window.location.href = mailToLink

        dispatch(postApprove(trigger._id))

        // ⚠️ window.open and window.location.href do not work as expected with react-router
        //const mailToLink = "mailto:"+email+'&subject='+values.subject+'&body='+values.body
        //window.open(mailToLink, '_blank');
        //window.location.href = mailToLink

        this.handleClose();
    }

    render() {
        return (
                <Dialog
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
										autoScrollBodyContent={true}
                >
                    <div>
											<MessageCandidateForm
												{...this.props}
												onSubmit={this.handleSubmit}
											/>
                    </div>
                </Dialog>
        );
    }
}
