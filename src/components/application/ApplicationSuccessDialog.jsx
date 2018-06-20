import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const bodyStyle = {
    width: '100%',
};
const contentStyle = {
    minWidth: '300px',
    width: '40%',
};
const buttonStyle = {
    cursor: 'pointer',
};

export default class ApplicationSuccessDialog extends Component {
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
    };

    render() {
        const actions = [
					<div>
					<FlatButton
						label="Continue"
						primary={true}
						onTouchTap={this.handleClose}
					/>
					</div>
        ];

        return (
                <Dialog
                    bodyStyle={bodyStyle}
                    contentStyle={contentStyle}
                    modal={false}
                    actions={actions}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div>
												<h3>Thank you for your application!</h3>
												<p>You’ll be notified via email when you’ve been accepted (or not) by Pumpt. In the meantime, you can log in anytime to add details to your application.</p>
                    </div>
                </Dialog>
        );
    }
}
