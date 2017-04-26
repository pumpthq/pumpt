import {
    MATCHES_FETCH_SUCCEEDED,

    ROUTE_TO_ALL,
    ROUTE_TO_BOOKMARKED,
    ROUTE_TO_NOT_INTERESTED,

    BOOKMARK_POST_SUCCEEDED,
    REJECT_POST_SUCCEEDED,

    SET_DEFAULT_STATE,
} from './../constants/candidateMatches';
import { API } from '../constants/actionTypes'
import { fetchFailed } from './apiError'

export const fetchMatches = () => ({
    type : API,
    payload : {
        url : '/matches/candidate',
        success: fetchMatchesSucceeded,
        error: fetchFailed
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
        error: fetchFailed
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
        error: fetchFailed
    }
})

export const postRejectSucceeded = id => data => ({
    type: REJECT_POST_SUCCEEDED,
    payload: { id }
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
