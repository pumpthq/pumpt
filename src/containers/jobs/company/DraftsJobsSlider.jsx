import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import JobsSliderPrototype from './JobsSliderPrototype';
import { Carousel } from './../../../components/matches';
import DraftsCard from './../../../components/jobs/draftsCard';
import CreateJobCard from './../../../components/jobs/createJobCard';
import ShortID from 'shortid';

const propTypes = {};
const defaultProps = {};

@connect(
    function mapStateToProps(state) {
        const { drafts } = state.companyJobs

        return {
            jobs : drafts
        }
    }
)
class DraftsJobsSlider extends JobsSliderPrototype {

    componentWillMount() {
        this.jobCardId = ShortID.generate();
    }

    render() {
        const { jobs } = this.props;

        return (
            <Carousel>
                {jobs.map((job) => (
                    <DraftsCard key={job.id} {...job} />
                ))}
                <CreateJobCard key={this.jobCardId} />
            </Carousel>
        );
    }

}

DraftsJobsSlider.propTypes = propTypes;
DraftsJobsSlider.defaultProps = defaultProps;

export default DraftsJobsSlider;
