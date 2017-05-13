import { connect } from 'react-redux'
import React, { Component } from 'react'
import VacancyCard from '../../../components/matches/vacancyCard'
import { find } from 'lodash'
import { dispatchProp } from 'components/helpers'
import { fetchVacancy } from 'actions/candidateMatches'

import CompanySummaryCard from 'components/company/SummaryCard'

function mapStateToProps(state, ownProps) {
    return {
        vacancy: find(state.candidateMatches.vacancies, card => card._id === ownProps.id),
    }
}
@connect(mapStateToProps, dispatchProp)
export default class VacancyContainer extends Component {
    componentWillMount() {
        const { dispatch, id, vacancy } = this.props;
        if(!vacancy) {
            dispatch(fetchVacancy(id))
        }
    render() {
        return (
            <div className="slider matches-carousel ">
                <div className="slider__items" style={ {transform: 'translateX(0px)'} }>
                    <VacancyCard {...this.props.vacancy} />
                    <CompanySummaryCard id={this.props.vacancy.company} />
                </div>
            </div>
        )
    }
}
