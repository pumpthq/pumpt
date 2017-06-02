import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form'
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import { TextInput, TextArea } from 'components/form/inputs'
import { postApprove } from 'actions/companyJobs'

@reduxForm({
    form: 'approve-candidate',
    fields: ['subject','body'],
})
export default class ApproveAndEmailCandidateDialog extends Component {
    state = {
        open: false,
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

        const { fields: { subject, body}, trigger } = this.props

        return (
                <Dialog
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div>
                        Time to contact the candidate!
                        <div>
                            <TextInput field={subject} label="Subject" />
                            <TextArea field={body} label="Message" />
                        </div>
                        <a href={`mailto:${trigger ? trigger.candidate.brief.user.email : 'no@email.com'}?subject=${subject.value}&body=${body.value}`} onClick={this.handleSubmit}>Approve and Email</a>
                    </div>
                </Dialog>
        );
    }
}
