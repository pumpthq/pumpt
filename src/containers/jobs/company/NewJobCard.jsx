import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CardOpen from '../../../components/jobs/cardOpen';
import SummaryHead from './new/summaryHead';
import MiddleBlock from './new/middleBlock';

import {
    closeOpenedNewJobCard
} from './../../../actions/companyJobs';

const propTypes = {
    dispatch : PropTypes
};
const defaultProps = {};

class NewJobCard extends Component {

    render() {
        const { dispatch } = this.props;

        return (
            <CardOpen
                summaryHead={<SummaryHead />}
                middleBlock={<MiddleBlock />}
                onClick={() => {
                    dispatch(closeOpenedNewJobCard());
                }}
            />
        );
    }

}

NewJobCard.propTypes = propTypes;
NewJobCard.defaultProps = defaultProps;

export default connect()(NewJobCard);
