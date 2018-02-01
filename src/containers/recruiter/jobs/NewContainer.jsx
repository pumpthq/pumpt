import React, {Component} from 'react';
import {connect} from 'react-redux';
import {dispatchProp} from 'components/helpers'

import JobForm, {industryOut} from 'components/jobs/JobForm'
import VerticalScroller from 'components/VerticalScroller'

import {createJob} from 'actions/companyJobs'

@connect(undefined,dispatchProp)
class NewContainer extends Component {

    render() {
        const { dispatch } = this.props
        return (
            <VerticalScroller>
                <JobForm onSubmit={values=> dispatch(createJob(industryOut(values)))}/>
            </VerticalScroller>
        );
    }

}

const propTypes = {};
const defaultProps = {};

NewContainer.propTypes = propTypes;
NewContainer.defaultProps = defaultProps;

module.exports = NewContainer;
