import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

const propTypes = {};

const defaultProps = {};

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
        return (
            <div className="slider__item slider__item_active">
                <a
                    href=""
                    className="button button_type_close"
                    onClick={(event) => {
                        event.preventDefault()
                        browserHistory.back();
                    }}
                >×</a>
                <div className="scroll-container">
                    <div className="scroll-container__inner">
                        <div className="mdl-card card card_state_open card_state_scroll card_state_open-mini">
                            <SummaryHead />
                            <MiddleBlock />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

CardOpen.propTypes = propTypes;
CardOpen.defaultProps = defaultProps;

export default CardOpen;
