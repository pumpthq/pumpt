import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash'
import { updateJob } from 'actions/companyJobs'

import JobForm, { reshapeIndustry, reshapeIndustries } from 'components/jobs/JobForm'
import VerticalScroller from 'components/VerticalScroller'

const propTypes = {};
const defaultProps = {};

function mapStateToProps(state, ownProps) {
    return { job: find(state.companyJobs.jobs, job => job._id == ownProps.id)}
}

@connect(mapStateToProps)
class EditContainer extends Component {
    render() {
        const { dispatch, job, id } = this.props
        return (
            <VerticalScroller>
              <JobForm
                initialValues={industryIn(job)} 
                onSubmit={values=> dispatch(updateJob(id, industryOut(values)))}/>
            </VerticalScroller>
        );
    }

}

EditContainer.propTypes = propTypes;
EditContainer.defaultProps = defaultProps;

module.exports = EditContainer;
