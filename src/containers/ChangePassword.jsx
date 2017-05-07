import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

// import { changePasswordRequest, resetApiError } from '../actions';
// import { changePassword } from '../api';
import { changePassword } from '../actions/authorization'
// import { resetApiError } from '../actions/api'
import ChangePassPopup from '../components/changePass/ChangePassPopup.jsx';

import { validateChangePassword } from '../utils';

function mapStateToProps(state) {
    return { apiError: state.apiError.error };
}

@reduxForm({
    form: 'changePassword',
    fields: ['currentPass', 'newPass', 'confirmPass'],
    validate: validateChangePassword,
})
@connect(mapStateToProps, { /*changePassword, resetApiError */})
export default class ChangePassword extends Component {
    render() {
        return <ChangePassPopup {...this.props} />;
    }
}
