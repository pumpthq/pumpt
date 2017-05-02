import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import SubmitButton from './SubmitButton.jsx';
import CancelLink from './CancelLink.jsx';
import PassInput from './PassInput.jsx';
import Title from './Title.jsx';

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

export default class ChangePassPopup extends Component {
    static propTypes = {
        fields: PropTypes.object,
        invalid: PropTypes.bool,
        submitting: PropTypes.bool,
    }

    state = {
        isOpen: false,
    }

    handleToggle = e => {
        e && e.preventDefault();

        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { values: { currentPass, newPass } } = this.props;
        this.props.changePassword(currentPass, newPass);

        this.handleToggle();
    };

    render() {
        const {
            apiError,
            fields: { currentPass, newPass, confirmPass },
            invalid,
            submitting,
        } = this.props;

        const { touched, error } = currentPass;
        currentPass.error = apiError ? apiError : touched ? error : '';

        const isDisabled = invalid || submitting;

        return (
            <li className="list__item">
                <a className="text" onClick={this.handleToggle}>
                    Change Password
                </a>
                <Dialog
                    bodyStyle={bodyStyle}
                    contentStyle={contentStyle}
                    modal={false}
                    open={this.state.isOpen}
                    onRequestClose={this.handleToggle}
                >
                    <button
                        style={buttonStyle}
                        className="button button_type_close"
                        onClick={this.handleToggle}
                    >
                        ×
                    </button>
                    <div>
                        <Title />
                        <form className="form form_padding-size_xs" onSubmit={this.handleSubmit}>
                            <PassInput
                                apiError={apiError}
                                label="Current"
                                password={currentPass}
                                type="password"
                            />
                            <PassInput password={newPass} label="New" type="password" />
                            <PassInput password={confirmPass} label="Confirm" type="password" />
                            <div className="form__actions">
                                <SubmitButton isDisabled={isDisabled} />
                                <CancelLink handleClose={this.handleToggle} />
                            </div>
                        </form>
                    </div>
                </Dialog>
            </li>
        );
    }
}
