import {connect} from 'react-redux'
import React, {Component} from 'react'
import VacancyProfile from '../../../components/jobs/Profile'
import {find} from 'lodash'
import {fetchCompany, fetchVacancy, postApprove, postBookmark, postReject} from 'actions/candidateMatches'
import {browserHistory} from 'react-router'
import BasicDialog from 'components/main/popup/BasicDialog'

import VerticalScroller from 'components/VerticalScroller'
import MatchCandidateActions from 'components/matches/CandidateActions'


// import CompanySummary from 'components/company/shared/Summary'

const mapStateToProps = (state, ownProps) => {
    const match = find(state.candidateMatches.matches, o => o._id === ownProps.mid)
    const vacancy = find(state.candidateMatches.vacancies, card => card._id === ownProps.id)
    const company = find(state.candidateMatches.companies, card => card._id === ownProps.cid)
    const lastApproved = state.candidateMatches.lastApproved;
    const lastRejected = state.candidateMatches.lastRejected;
    const lastBookmarked = state.candidateMatches.lastBookmarked;

    if(vacancy) vacancy.company = company
    return { match, vacancy, company, lastApproved, lastRejected, lastBookmarked }
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
            <div>
                    <VacancyProfile {...this.props.vacancy}>
                        <MatchCandidateActions {...this.props.match} {...this.props.actions} {...this.props.company} />
                    </VacancyProfile>

                    <BasicDialog trigger={this.props.lastRejected} onClose={browserHistory.goBack}>
                      This Job Posting has Been Rejected
                    </BasicDialog>
                    <BasicDialog trigger={this.props.lastApproved} onClose={browserHistory.goBack}>
                      Your Application was successfully sent. You will be contacted by the the hiring manager if they’re interested in your Application.
                    </BasicDialog>
                    <BasicDialog trigger={this.props.lastBookmarked} onClose={browserHistory.goBack}>
                      This job is now saved and can be found in your Bookmark folder.
                    </BasicDialog>

                </div>

        )
    }
}
