import {
    MATCHES_FETCH_SUCCEEDED,
    BOOKMARKED_FETCH_SUCCEEDED,

    NOT_INTERESTED_FETCH_REQUESTED,
    NOT_INTERESTED_FETCH_SUCCEEDED,
    NOT_INTERESTED_FETCH_FAILED,

    ROUTE_TO_ALL,
    ROUTE_TO_BOOKMARKED,
    ROUTE_TO_NOT_INTERESTED,

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

export const fetchBookmarked = () => ({
    type : API,
    payload: {
        url: '/matches',
        success: fetchBookmarkedSucceeded,
        error: fetchFailed
    }
})

export const fetchBookmarkedSucceeded = data => ({
    type : BOOKMARKED_FETCH_SUCCEEDED,
    payload : {
        matches: data
    }
})

export const fetchNotInterested = () => ({
    type : NOT_INTERESTED_FETCH_REQUESTED
})

export const fetchNotInterestedSucceeded = ({ matches }) => ({
    type : NOT_INTERESTED_FETCH_SUCCEEDED,
    payload : {
        matches
    }
})

export const fetchNotInterestedFailed = ({ statusCode }) => ({
    type : NOT_INTERESTED_FETCH_FAILED,
    payload : {
        statusCode
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
