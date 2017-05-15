import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import SummaryHead from 'containers/recruiter/jobs/new/summaryHead'
import MiddleBlock from 'containers/recruiter/jobs/new/middleBlock'
import JobForm from 'components/jobs/JobForm'
const propTypes = {};

const defaultProps = {};

class NewCard extends Component {

    render() {
        return (
            <div className="slider__item slider__item_active">
                <a
                    href=""
                    className="button button_type_close"
                    onClick={(event) => {
                        event.preventDefault()
                        browserHistory.goBack();
                    }}
                >×</a>
                <div className="scroll-container">
                    <div className="scroll-container__inner">
                        <div className="mdl-card card card_state_open card_state_scroll card_state_open-mini">
                            <JobForm />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

NewCard.propTypes = propTypes;
NewCard.defaultProps = defaultProps;

export default NewCard;
