import React, {Component} from 'react';
import {connect} from 'react-redux';
import {dispatchProp} from 'components/helpers'

import JobForm, {preSubmit} from 'components/jobs/JobForm'
import VerticalScroller from 'components/VerticalScroller'

import {createJob} from 'actions/companyJobs'

@connect(undefined,dispatchProp)
class NewContainer extends Component {

    handleSubmit = (values) => {
      const { dispatch } = this.props
      return preSubmit(values)
      .then(result => (
        dispatch(createJob(result))
      ))
    }
    render() {
        const { dispatch } = this.props
        return (
            <VerticalScroller>
                <JobForm onSubmit={this.handleSubmit}/>
            </VerticalScroller>
        );
    }

}

const propTypes = {};
const defaultProps = {};

NewContainer.propTypes = propTypes;
NewContainer.defaultProps = defaultProps;

module.exports = NewContainer;
