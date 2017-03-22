import React, { Component, PropTypes } from 'react';
import BigArrowIcon from './../../components/icons/big-arrow';
import SmallArrowIcon from './../../components/icons/small-arrow';
import { connect } from 'react-redux';

import SESSION from '../../constants/session';

const propTypes = {
    isNotApproved: PropTypes.bool,
    isFilled: PropTypes.bool,
};

const defaultProps = {
    isNotApproved: true,
    isFilled: false,
};

@connect(
    (state) => {
        const { isNotApproved } = state.authorization;
        return {
            isNotApproved,
        };
    }
)
export default class StepProgress extends Component {

    render() {
        const isApproved = SESSION[0].user && SESSION[0].user.isApproved;
        const { isNotApproved, isFilled } = this.props
        const isWaitingForApproval = !isApproved ? 'active' : 'filled';


        const isCompleted = isApproved && !isFilled ?
            'active' :
            isApproved && isFilled ? 'filled' : false

        return (
            <ul class="list list_type_steps">
                <li class={'list__item list__item_filled'}>
                    Completed application
                </li>
                <li class={'list__item list__item_filled'}>
                    <BigArrowIcon />
                    <SmallArrowIcon />
                </li>

                <li
                    class={`list__item list__item_${isWaitingForApproval}`}
                >
                    Waiting for approval
                </li>
                <li class={`list__item list__item_${isWaitingForApproval}`}>
                    <BigArrowIcon />
                    <SmallArrowIcon />
                </li>

                <li
                    class={`list__item ${isCompleted ? `list__item_${isCompleted}` : ''}`}
                >
                    Fill in profile
                </li>
            </ul>
        );
    }
}

StepProgress.propTypes = propTypes;
StepProgress.defaultProps = defaultProps;
