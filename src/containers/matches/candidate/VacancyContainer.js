import { connect } from 'react-redux'
import React, { Component } from 'react'
import VacancyProfile from '../../../components/jobs/Profile'
import { find } from 'lodash'
import { dispatchProp } from 'components/helpers'
import { fetchVacancy, fetchCompany } from 'actions/candidateMatches'
import { postBookmark, postReject, postApprove } from 'actions/candidateMatches'
import { browserHistory } from 'react-router'
import ApplySuccessDialog from 'components/matches/ApplySuccessDialog'

import VerticalScroller from 'components/VerticalScroller'
import MatchCandidateActions from 'components/matches/CandidateActions'


import CompanySummary from 'components/company/shared/Summary'

const mapStateToProps = (state, ownProps) => {
    const match = find(state.candidateMatches.matches, o => o._id === ownProps.mid)
    const vacancy = find(state.candidateMatches.vacancies, card => card._id === ownProps.id)
    const company = find(state.candidateMatches.companies, card => card._id === ownProps.cid)
    const lastApproved = state.candidateMatches.lastApproved;

    if(vacancy) vacancy.company = company
    return { match, vacancy, company, lastApproved }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions : {
            addToBookmark: () => {
                dispatch(postBookmark(ownProps.mid))
            },
            postReject: () => {
                dispatch(postReject(ownProps.mid))
            },
            postApprove: () => {
                dispatch(postApprove(ownProps.mid))
            },
        },
        dispatch
    }
}
@connect(mapStateToProps, mapDispatchToProps)
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
                        <MatchCandidateActions {...this.props.match} {...this.props.actions}/>
                    </VacancyProfile>
                    <CompanySummary {...this.props.company} />


                    <ApplySuccessDialog trigger={this.props.lastApproved} onClose={browserHistory.goBack}/>
            </VerticalScroller>

        )
    }
}
