import React, {Component} from 'react';
import {connect} from 'react-redux';

import {changePassword} from '../actions/authorization'
import ChangePassForm from 'components/changePass/Form';
import VerticalScroller from 'components/VerticalScroller'

import ChangePassSuccessDialog from 'components/changePass/SuccessDialog'
import {browserHistory} from 'react-router'

const mapStateToProps = (state) => {
    return {lastChangePass: state.authorization.lastChangePass}
}
@connect(mapStateToProps)
export default class ChangePassword extends Component {
    render() {
        const {dispatch} = this.props

        return (
            <VerticalScroller>
                <ChangePassForm {...this.props}
                    onSubmit={values=> {dispatch(changePassword(values)) } } />;


                <ChangePassSuccessDialog trigger={this.props.lastChangePass} onClose={browserHistory.goBack}/>
            </VerticalScroller>
        )
    }
}
