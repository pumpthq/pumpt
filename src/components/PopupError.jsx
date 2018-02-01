import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import WarningIcon from './icons/WarningIcon';

const propTypes = {
    text: PropTypes.string,
};
const defaultProps = {};

@connect(
    function mapStateToProps(state) {
        return {
            state
        }
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch
        }
    }
)
export default class PopupError extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { text } = this.props;

        return (
            <span class="notification notification_type_error">
                <WarningIcon />{`
                `}<span class="notification__text">{text}</span>
            </span>
        );
    }

}

PopupError.propTypes = propTypes;
PopupError.defaultProps = defaultProps;
