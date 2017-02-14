import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import JobsSliderPrototype from './JobsSliderPrototype';
import { Carousel } from './../../../components/matches';
import DraftsCard from './../../../components/jobs/draftsCard';
import NewJobCard from './NewJobCard';
import ShortID from 'shortid';

@connect(
    function mapStateToProps(state) {
        const { drafts } = state.companyJobs;

        return {
            jobs: drafts,
        };
    }
)
export default class NewJobSlider extends JobsSliderPrototype {

    componentWillMount() {
        this.jobCardId = ShortID.generate();
    }

    render() {
        const { jobs } = this.props;

        return (
            <Carousel openCard={jobs.length}>
                {jobs.map((job) => (
                    <DraftsCard key={job.id} {...job} />
                ))}
                <NewJobCard key={this.jobCardId} />
            </Carousel>
        );
    }

};
