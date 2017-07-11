import React, { Component, PropTypes } from 'react'
import  Dialog from 'material-ui/Dialog'
import { postApprove } from 'actions/companyJobs'
import  MessageCandidateForm from 'components/matches/MessageCandidateForm'

export default class ApproveAndEmailCandidateDialog extends Component {
    state = {
        open: false,
				messageText: ""
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
        const {dispatch, trigger} = this.props

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
                >
                    <div>
											<MessageCandidateForm />
                    </div>
                </Dialog>
        );
    }
}
