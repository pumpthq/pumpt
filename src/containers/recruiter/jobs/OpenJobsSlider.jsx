import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import JobsSliderPrototype from './JobsSliderPrototype';
import { Carousel } from './../../../components/matches';
import Card from './../../../components/jobs/card';

@connect(
    function mapStateToProps(state) {
        const { open } = state.companyJobs

        return {
            jobs : open
        }
    }
)
class JobsExampleSlides extends JobsSliderPrototype {

    render() {
        const { jobs } = this.props;

        return (
            <Carousel>
                {jobs.map((job) => (
                    <Card key={job.id} {...job} />
                ))}
            </Carousel>
        );
    }

};

module.exports = JobsExampleSlides
