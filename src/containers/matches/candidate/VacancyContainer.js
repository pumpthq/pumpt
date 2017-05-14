import { connect } from 'react-redux'
import React, { Component } from 'react'
import VacancyProfile from '../../../components/jobs/Profile'
import { find } from 'lodash'
import { dispatchProp } from 'components/helpers'
import { fetchVacancy } from 'actions/candidateMatches'

import CompanySummary from 'components/company/Summary'

const mapStateToProps = (state, ownProps) => {
    const vacancy = find(state.candidateMatches.vacancies, card => card._id === ownProps.id)
    const company = vacancy ? find(state.candidateMatches.companies, card => card._id === vacancy.company) : false
    vacancy.company = { name, logo, background } = company
    return { vacancy, company }
}
@connect(mapStateToProps, dispatchProp)
export default class VacancyContainer extends Component {
    componentWillMount() {
        const { dispatch, id, vacancy, company } = this.props;
        if(!vacancy) {
            dispatch(fetchVacancy(id))
        }else if(!company) {
            dispatch(fetchCompany(vacancy.company))
        }
    }
    render() {
        return (
            <div className="slider matches-carousel ">
                <div className="slider__items" style={ {transform: 'translateX(0px)'} }>
                    <VacancyProfile {...this.props.vacancy} />
                    <CompanySummary {...this.props.company} />
                </div>
            </div>
        )
    }
}
