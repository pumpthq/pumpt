import React from 'react';
import {connect} from 'react-redux';
import CardSlider from 'components/CardSlider';
import Card from 'components/jobs/openedCard';
import ClosedCard from 'components/jobs/closedCard';
import CreateJobCard from 'components/jobs/createJobCard';
import DraftsCard from 'components/jobs/draftsCard';

const sortFunc = (v1, v2) => v1.createdAt < v2.createdAt ? +1 : -1;

@connect( state => (
    {
        items: state.companyJobs.jobs.filter(job=>job.status=='opened'),
        component: Card,
        sort: sortFunc
    }
))
export class OpenJobsSlider extends CardSlider {}

@connect( state => (
    {
        items: state.companyJobs.jobs.filter(job=>job.status=='closed'),
        component: ClosedCard,
        sort: sortFunc
    }
))

export class ClosedJobsSlider extends CardSlider {}

@connect( state => (
    {
        items: state.companyJobs.jobs.filter(job=>job.status=='draft'),
        component: DraftsCard,
        append: (<CreateJobCard />),
        sort: sortFunc
    }
))

export class DraftJobsSlider extends CardSlider {
}
