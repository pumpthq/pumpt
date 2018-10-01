import React, {Component} from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import {postApprove} from 'actions/companyJobs'
import MessageCandidateForm from 'components/matches/MessageCandidateForm'

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
      dispatch(postApprove(trigger._id, values))

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
                    <div className="formwrap">
											<MessageCandidateForm
												{...this.props}
												onSubmit={this.handleSubmit}
											/>
                    </div>
                </Dialog>
        );
    }
}
