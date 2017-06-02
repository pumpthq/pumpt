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
												<h3>Thank you for your application!</h3>
												<p>You’ll be notified via email when you’ve been accepted (or not) by Pumpt. In the meantime, you can log in anytime to add details to your application.</p>
                    </div>
                </Dialog>
        );
    }
}
