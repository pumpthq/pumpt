import React, { Component, PropTypes } from 'react';
import VacancyProfile from '../../../components/jobs/Profile'
import { find } from 'lodash'
import VerticalScroller from 'components/VerticalScroller'

const mapStateToProps = (state, ownProps) => {
    const vacancy = find(state.companyJobs.jobs, o => o._id === ownProps.id)
    const company = state.companyJobs.company
    if(vacancy) vacancy.company = company
    return { vacancy }
}
@connect(mapStateToProps)
export default class ShowContainer extends Component {
    render() {
        return (
            <VerticalScroller>
                    <VacancyProfile {...this.props.vacancy} >
                    </VacancyProfile>
            </VerticalScroller>
        )
    }
}
