import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import SESSION from '../constants/session';

import { resendTokenToEmail } from '../actions/session';

const LINK_STYLES = { color: '#0998ff', cursor: 'pointer' };

function mapStateToProps(state) {
    return state.applicationCandidate.summary.email
        ? { email: state.applicationCandidate.summary.email }
        : { email: state.applicationCompany.summary.email };
}

@connect(mapStateToProps, { resendTokenToEmail })
export default class ResendEmailText extends Component {
    static propTypes = {
        email: PropTypes.string,
        resendTokenToEmail: PropTypes.func,
    }

    handleClick = e => {
        e.preventDefault();

        this.props.resendTokenToEmail(this.props.email);

        alert('Token has been send to email');
    };

    renderResendLink = () => (
        <p className="text text_after_big-head text_size_xs">
            A link to your application has been sent by email.
            <span style={LINK_STYLES} onClick={this.handleClick}>
                {' Re-send '}
            </span>
        </p>
    );

    renderSuccessNotification = () => (
        <p className="text text_after_big-head text_size_xs">
            You have successfully confirmed registration.
        </p>
    );

    render() {
        console.log('SESSION: ', SESSION)
        return SESSION.length && SESSION[0].isConfirmed
            ? this.renderSuccessNotification()
            : this.renderResendLink();
    }
}
