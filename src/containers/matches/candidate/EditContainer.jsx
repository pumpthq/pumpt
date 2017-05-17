import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash'
import { updateJob } from 'actions/companyJobs'

import JobForm from 'components/jobs/JobForm'
import VerticalScroller from 'components/VerticalScroller'

const propTypes = {};
const defaultProps = {};

function mapStateToProps(state, ownProps) {
    return { candidate: state.candidateMatches.candidate }
}

@connect(mapStateToProps)
class EditContainer extends Component {
    render() {
        const { dispatch, candidate } = this.props
        return (
            <VerticalScroller>
                {/* <CandidateForm initialValues={candidate} onSubmit={values=> dispatch(updateCandidate(id,values))}/> */}
            </VerticalScroller>
        );
    }

}

EditContainer.propTypes = propTypes;
EditContainer.defaultProps = defaultProps;

module.exports = EditContainer;
