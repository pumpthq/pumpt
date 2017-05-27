import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import SubmitButton from './SubmitButton.jsx';
import CancelLink from './CancelLink.jsx';
import PassInput from './PassInput.jsx';
import Title from './Title.jsx';
import ScrollContainer from 'components/main/scrollContainer'
import { validateChangePassword } from 'utils';

import { browserHistory } from 'react-router'

@reduxForm({
    form: 'changePassword',
    fields: ['oldPassword', 'newPassword', 'confirmPass'],
    validate: validateChangePassword,
})

export default class ChangePassForm extends Component {
    static propTypes = {
        fields: PropTypes.object,
        invalid: PropTypes.bool,
        submitting: PropTypes.bool,
    }

    render() {
        const {
            fields: { oldPassword, newPassword, confirmPass },
            handleSubmit,
            invalid,
            submitting,
        } = this.props;

        const { touched, error } = oldPassword;
        // oldPassword.error = apiError ? apiError : touched ? error : '';

        const isDisabled = invalid || submitting;

        return (
                <div className='mdl-card col-xs-12'>
                    <button
                        style={buttonStyle}
                        className="button button_type_close"
                        onClick={browserHistory.goBack}
                    >
                        ×
                    </button>
                    <div>
                        <Title />
                        <form className="form form_padding-size_xs" onSubmit={handleSubmit}>
                            <PassInput
                                label="Current"
                                password={oldPassword}
                                type="password"
                            />
                            <PassInput password={newPassword} label="New" type="password" />
                            <PassInput password={confirmPass} label="Confirm" type="password" />
                            <div className="form__actions">
                                <SubmitButton isDisabled={isDisabled} />
                                <CancelLink handleClose={browserHistory.goBack} />
                            </div>
                        </form>
                    </div>
                </div>
        );
    }
}
