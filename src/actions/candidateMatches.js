import {
    FETCH_CANDIDATE_SUCCEEDED,
    UPDATE_CANDIDATE_SUCCEEDED,

    MATCHES_FETCH_SUCCEEDED,

    ROUTE_TO_ALL,
    ROUTE_TO_BOOKMARKED,
    ROUTE_TO_NOT_INTERESTED,

    BOOKMARK_POST_SUCCEEDED,
    REJECT_POST_SUCCEEDED,
    APPROVE_POST_SUCCEEDED,

    SHOW_FULL_DESCRIPTION,
    HIDE_FULL_DESCRIPTION,

    SET_DEFAULT_STATE,

    FETCH_COMPANY_SUCCEEDED,
    VIEW_COMPANY,

    FETCH_VACANCY_SUCCEEDED,
    VIEW_VACANCY,

} from './../constants/candidateMatches';
import { API } from '../constants/actionTypes'

export const fetchCandidate = () => ({
    type : API,
    payload : {
        url : '/candidates/current',
        success: fetchCandidateSucceeded,
    }
})

export const fetchCandidateSucceeded = candidate => ({
    type : FETCH_CANDIDATE_SUCCEEDED,
    payload : {
        candidate
    }
})

export const updateCandidate = (data) => ({
    type : API,
    payload : {
        method: 'PUT',
        url : '/candidates/current',
        success: fetchCandidateSucceeded,
        data,
    }
})

export const updateCandidateSucceeded = candidate => ({
    type : UPDATE_CANDIDATE_SUCCEEDED,
    payload : {
        candidate
    }
})

export const fetchMatches = () => ({
    type : API,
    payload : {
        url : '/matches/candidate',
        success: fetchMatchesSucceeded,
    }
})

export const fetchMatchesSucceeded = data => ({
    type : MATCHES_FETCH_SUCCEEDED,
    payload : {
        matches: data
    }
})

export const postBookmark = (matchingId) => ({
    type : API,
    payload : {
        url : `/matches/bookmark/${matchingId}`,
        success: postBookmarkSucceeded(matchingId),
    }
})

export const postBookmarkSucceeded = id => data => ({
    type: BOOKMARK_POST_SUCCEEDED,
    payload: { id }
})

export const postReject = (matchingId) => ({
    type : API,
    payload : {
        url : `/matches/reject/${matchingId}`,
        success: postRejectSucceeded(matchingId),
    }
})

export const postRejectSucceeded = id => data => ({
    type: REJECT_POST_SUCCEEDED,
    payload: { id }
})

export const postApprove = (matchingId) => ({
    type : API,
    payload : {
        url : `/matches/approve/${matchingId}`,
        success: postApproveSucceeded(matchingId),
    }
})

export const postApproveSucceeded = id => data => ({
    type: APPROVE_POST_SUCCEEDED,
    payload: { id }
})

export const showFullDescription = (matchingId) => ({
    type : SHOW_FULL_DESCRIPTION,
    payload : {
        id : matchingId,
    }
})

export const hideFullDescription = (matchingId) => ({
    type : HIDE_FULL_DESCRIPTION,
    payload : {
        id : matchingId,
    }
})

export const routeToAll = () => ({
    type : ROUTE_TO_ALL
})

export const routeToBookmarked = () => ({
    type : ROUTE_TO_BOOKMARKED
})

export const routeToNotInterested = () => ({
    type : ROUTE_TO_NOT_INTERESTED
})

export const clearCandidateMatchesState = () => ({
    type: SET_DEFAULT_STATE,
});

export const fetchCompany = (id) => ({
    type : API,
    payload : {
        url : `/companies/${id}`,
        success: fetchCompanySucceeded(id),
    }
})

export const fetchCompanySucceeded = id => company => ({
    type : FETCH_COMPANY_SUCCEEDED,
    payload : {
        company
    }
})

export const viewCompany = id => ({
    type : VIEW_COMPANY,
    payload : {
        id
    }
})

export const fetchVacancy = (id) => ({
    type : API,
    payload : {
        url : `/vacancies/${id}`,
        success: fetchVacancySucceeded(id),
    }
})

export const fetchVacancySucceeded = id => vacancy => ({
    type : FETCH_VACANCY_SUCCEEDED,
    payload : {
        vacancy
    }
})

export const viewVacancy = (cid, id) => ({
    type : VIEW_VACANCY,
    payload : {
        cid, id
    }
})
