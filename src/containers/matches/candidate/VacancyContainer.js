import { connect } from 'react-redux'
import React, { Component } from 'react'
import VacancyProfile from '../../../components/matches/Profile'
import { find } from 'lodash'
import { dispatchProp } from 'components/helpers'
import { fetchVacancy } from 'actions/candidateMatches'

import CompanySummary from 'components/company/Summary'

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
                    <VacancyProfile {...this.props.vacancy} />
                    <CompanySummary id={this.props.vacancy.company} />
                </div>
            </div>
        )
    }
}
