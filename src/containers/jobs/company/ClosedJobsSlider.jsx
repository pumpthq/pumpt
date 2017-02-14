import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import JobsSliderPrototype from './JobsSliderPrototype';
import { Carousel } from './../../../components/matches';
import ClosedCard from './../../../components/jobs/closedCard';

@connect(
    function mapStateToProps(state) {
        const { closed } = state.companyJobs

        return {
            jobs : closed
        }
    }
)
class ClosedJobsSlider extends JobsSliderPrototype {

    render() {
        const { jobs } = this.props;

        return (
            <Carousel>
                {jobs.map((job) => (
                    <ClosedCard key={job.id} {...job} />
                ))}
            </Carousel>
        );
    }

}

export default ClosedJobsSlider;
