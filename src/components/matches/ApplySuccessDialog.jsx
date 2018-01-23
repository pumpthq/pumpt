import React, { Component, PropTypes } from 'react';
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

export default class ApplySuccessDialog extends Component {
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
        this.props.onClose();
    };

    render() {
        const actions = [
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={this.handleClose}
          />
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
                        Your Application was successfully sent. You will be contacted by the the hiring manager if they’re interested in your Application.
                    </div>
                </Dialog>
        );
    }
}
