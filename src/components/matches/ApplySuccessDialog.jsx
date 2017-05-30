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
        if(nextProps.lastApproved !== this.props.lastApproved) {
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
                    {/* <button
                        style={buttonStyle}
                        className="button button_type_close"
                        onClick={this.handleToggle}
                    >
                        ×
                    </button> */}
                    <div>
                        Your Application was successfully sent
                    </div>
                </Dialog>
        );
    }
}
