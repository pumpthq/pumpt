import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import {
    ROUTE_COMPANY_JOBS_DRAFTS,
} from './../../constants/routes';

const propTypes = {
    summaryHead: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.array,
        PropTypes.string,
    ]),
    middleBlock: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.array,
        PropTypes.string,
    ]),
    cardActions: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.array,
        PropTypes.string,
    ]),
    additionElements: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.array,
    ]),
    dispatch : PropTypes.func,
    onClick : PropTypes.func
};

const defaultProps = {
    summaryHead: '',
    middleBlock: '',
    cardActions: '',
    additionElements: '',
    onClick: () => {}
};

@connect(
    function mapStateToProps(state) {
        return {}
    },
    function mapDispatchToProps(dispatch) {
        return {
            dispatch
        }
    }
)
class CardOpen extends Component {

    render() {
        const {
            summaryHead,
            middleBlock,
            cardActions,
            additionElements,
            onClick
        } = this.props;

        return (
            <div className="slider__item slider__item_active">
                <a
                    href=""
                    className="button button_type_close"
                    onClick={(event) => {
                        event.preventDefault()
                        onClick();
                    }}
                >×</a>
                <div className="scroll-container">
                    <div className="scroll-container__inner">
                        <div className="mdl-card card card_state_open card_state_scroll card_state_open-mini">
                            {summaryHead}
                            {middleBlock}
                            {cardActions}
                        </div>
                        {additionElements}
                    </div>
                </div>

            </div>
        )
    }
}

CardOpen.propTypes = propTypes;
CardOpen.defaultProps = defaultProps;

export default CardOpen;
