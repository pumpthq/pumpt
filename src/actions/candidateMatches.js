import {
    ALL_FETCH_REQUESTED,
    ALL_FETCH_SUCCEEDED,
    ALL_FETCH_FAILED,

    BOOKMARKED_FETCH_REQUESTED,
    BOOKMARKED_FETCH_SUCCEEDED,
    BOOKMARKED_FETCH_FAILED,

    NOT_INTERESTED_FETCH_REQUESTED,
    NOT_INTERESTED_FETCH_SUCCEEDED,
    NOT_INTERESTED_FETCH_FAILED,

    ROUTE_TO_ALL,
    ROUTE_TO_BOOKMARKED,
    ROUTE_TO_NOT_INTERESTED,

    SET_DEFAULT_STATE,
} from './../constants/candidateMatches';
import { API } from '../constants/actionTypes'
export const fetchAll = () => ({
    type : API,
    payload : {
        url : '/matches',
        success: fetchAllSucceeded,
        error: fetchAllFailed
    }
})

export const fetchAllSucceeded = ({ matches }) => ({
    type : ALL_FETCH_SUCCEEDED,
    payload : {
        matches
    }
})

export const fetchAllFailed = ({ statusCode }) => ({
    type : ALL_FETCH_FAILED,
    payload : {
        statusCode
    }
})

export const fetchBookmarked = () => ({
    type : API,
    payload: {
        url: '/matches'
        success: fetchBookmarkedSucceeded,
        error: fetchBookmarkedFailed
    }
})

export const fetchBookmarkedSucceeded = ({ matches }) => ({
    type : BOOKMARKED_FETCH_SUCCEEDED,
    payload : {
        matches
    }
})

export const fetchBookmarkedFailed = ({ statusCode }) => ({
    type : BOOKMARKED_FETCH_FAILED,
    payload : {
        statusCode
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

export const fetchVacancies = () => ({
    type: API,
    payload : {
        url : '/matches',
        success: fetchAllSucceeded,
        error: fetchAllFailed
    }
});
