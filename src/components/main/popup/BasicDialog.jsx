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

export default class BasicDialog extends Component {
  state = {
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.trigger !== this.props.trigger) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary
        onTouchTap={this.handleClose}
      />,
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
          {this.props.children}
        </div>
      </Dialog>
    );
  }
}

BasicDialog.propTypes = {
  trigger: PropTypes.any,
  onClose: PropTypes.func,
  children: PropTypes.node,
};