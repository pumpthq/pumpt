import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePassword } from '../actions/authorization'
import ChangePassForm from 'components/changePass/Form';
import VerticalScroller from 'components/VerticalScroller'

export default class ChangePassword extends Component {
    render() {
        const {dispatch} = this.props

        return (
            <VerticalScroller>
                <ChangePassForm {...this.props}
                    onSubmit={values=> {dispatch(changePassword(values)) } } />;

            </VerticalScroller>
        )
    }
}
