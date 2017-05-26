import { connect } from 'react-redux'
import React, { Component } from 'react'
import VacancyProfile from '../../../components/jobs/Profile'
import { find } from 'lodash'
import { dispatchProp } from 'components/helpers'
import { fetchVacancy, fetchCompany } from 'actions/candidateMatches'
import VerticalScroller from 'components/VerticalScroller'

import CompanySummary from 'components/company/shared/Summary'

const mapStateToProps = (state, ownProps) => {
    const vacancy = find(state.candidateMatches.vacancies, card => card._id === ownProps.id)
    const company = find(state.candidateMatches.companies, card => card._id === ownProps.cid)
    if(vacancy) vacancy.company = company
    return { vacancy, company }
}
@connect(mapStateToProps, dispatchProp)
export default class VacancyContainer extends Component {
    componentWillMount() {
        const { dispatch, id, cid, vacancy, company } = this.props;

        //⚠️ this hook is only called once when mounted, not updated!
        if(!vacancy) {
            dispatch(fetchVacancy(id))
        }

        if(!company) {
            dispatch(fetchCompany(cid))
        }
    }
    render() {
        return (
            <VerticalScroller>
                    <VacancyProfile {...this.props.vacancy} >
                        <CompanySummary {...this.props.company} />
                    </VacancyProfile>
            </VerticalScroller>
        )
    }
}
