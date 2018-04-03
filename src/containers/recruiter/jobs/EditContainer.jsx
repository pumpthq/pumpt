import React, {Component} from 'react';
import {connect} from 'react-redux';
import {find} from 'lodash'
import {updateJob} from 'actions/companyJobs'

import JobForm, {preSubmit, industryIn} from 'components/jobs/JobForm'
import VerticalScroller from 'components/VerticalScroller'

const propTypes = {};
const defaultProps = {};

function mapStateToProps(state, ownProps) {
    return { job: find(state.companyJobs.jobs, job => job._id == ownProps.id)}
}

@connect(mapStateToProps)
class EditContainer extends Component {

    handleSubmit = (values) => {
      const { dispatch, id } = this.props
      return preSubmit(values)
      .then(result => (
        dispatch(updateJob(id, result))
      ))
    }

    render() {
        const { dispatch, job, id } = this.props
        return (
            <VerticalScroller>
              <JobForm
                initialValues={industryIn(job)} 
                onSubmit={this.handleSubmit}/>
            </VerticalScroller>
        );
    }

}

EditContainer.propTypes = propTypes;
EditContainer.defaultProps = defaultProps;

module.exports = EditContainer;
