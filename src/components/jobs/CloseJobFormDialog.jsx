import React, {Component} from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import {closeJob} from './../../actions/companyJobs';
import MessageCandidateForm from 'components/matches/MessageCandidateForm'
import JobCloseForm from 'components/jobs/JobCloseForm'

const propTypes = {};

function mapStateToProps(state, ownProps) {
	return { }
}

@connect(mapStateToProps)
export default class CloseJobFormDialog extends Component {

    state = {
        open: false,
				//messageText: "",
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
    	const {dispatch, trigger, jobId, jobTitle} = this.props
    	dispatch(closeJob(jobId))
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
											<JobCloseForm
												{...this.props}
												onSubmit={this.handleSubmit}
												close={this.handleClose}
												title={this.props.jobTitle}
											/>
                    </div>
                </Dialog>
        );
    }
}
