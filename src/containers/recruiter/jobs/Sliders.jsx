import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CardSlider from 'components/CardSlider';
import Card from 'components/jobs/card';
import ClosedCard from 'components/jobs/closedCard';
import CreateJobCard from 'components/jobs/createJobCard';

@connect( state => (
    {
        items: state.companyJobs.jobs.filter(job=>job.status=='opened'),
        component: Card
    }
))
export class OpenJobsSlider extends CardSlider {}

@connect( state => (
    {
        items: state.companyJobs.jobs.filter(job=>job.status=='closed'),
        component: ClosedCard
    }
))

export class ClosedJobsSlider extends CardSlider {}

@connect( state => (
    {
        items: state.companyJobs.jobs.filter(job=>job.status=='draft'),
        component: DraftsCard
    }
))

export class DraftJobsSlider extends CardSlider {
    render() {
        return {
            <div>
                {super.render()}
                <CreateJobCard />
            </div>
        }
    }
}
