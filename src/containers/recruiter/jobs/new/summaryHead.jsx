import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SummaryHeadActive from './summaryHead/active';
import SummaryHeadFilled from './summaryHead/filled';
import {
    SHOW_SUMMARY_HEAD_STANDARD,
    SHOW_SUMMARY_HEAD_EDIT,
} from './../../../../constants/companyJobs';

const propTypes = {
    head: PropTypes.string,
};

const defaultProps = {};

// @connect(
//     (state) => {
//         const { head } = state.companyJobs.newJob;
//         return { head };
//     }
// )
export default class SummaryHead extends Component {
    render() {
        const { filled } = this.props;
        //const active = head === SHOW_SUMMARY_HEAD_STANDARD;
        return (
            <div className={`summary-head summary-head_rad-top ${filled ? '' : 'summary-head_form_true'}`} style={{ backgroundColor: '#4f68ac' }}>
                {filled ? <SummaryHeadFilled {...this.props} /> : <SummaryHeadActive {...this.props} /> }
            </div>
        );
    }
}

SummaryHead.propTypes = propTypes;
SummaryHead.defaultProps = defaultProps;
