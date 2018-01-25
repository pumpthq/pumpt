import _ from 'lodash';
import {
    APPROVE_POST_SUCCEEDED,
    BOOKMARK_POST_SUCCEEDED,
    FETCH_CANDIDATE_SUCCEEDED,
    FETCH_COMPANY_SUCCEEDED,
    FETCH_VACANCY_SUCCEEDED,
    MATCHES_FETCH_SUCCEEDED,
    REJECT_POST_SUCCEEDED,
    SET_DEFAULT_STATE,
    UPDATE_CANDIDATE_SUCCEEDED,
} from './../constants/candidateMatches';

const defaultState = {
    matches: [],
    companies: [],
    vacancies: [],
    candidate: {
        location: {
            city: '{city}',
            state: '{state}'
        }
    },
};

export default (state = defaultState, action) => {
    const { type, payload } = action;
    // let all, bookmarked, notInterested, matchings, approved
    switch (type) {
        case FETCH_CANDIDATE_SUCCEEDED : {
            const { candidate } = payload
            return { ...state, candidate }
        }
        case UPDATE_CANDIDATE_SUCCEEDED : {
            const { candidate } = payload
            return { ...state, candidate }
        }
        case MATCHES_FETCH_SUCCEEDED : {
            const { matches } = payload

            return {
                ...state,
                matches
            }
        }

        case BOOKMARK_POST_SUCCEEDED: {// then move newly bookmarked matching to bookmark collection in state
            let matches = _.clone(state.matches)
            _.find(matches, o => o._id == payload.id).vacancy.status = 'bookmarked'
            return {
                ...state,
                matches,
                lastBookmarked: (new Date),
            }
        }

        case REJECT_POST_SUCCEEDED: {// then move newly rejected matching to notInterested collection in state
            let matches = _.clone(state.matches)
            _.find(matches, o => o._id == payload.id).vacancy.status = 'rejected'
            return {
                ...state,
                matches,
                lastRejected: (new Date),
            }
        }

        case APPROVE_POST_SUCCEEDED: {// then move newly rejected matching to notInterested collection in state
            let matches = _.clone(state.matches)
            _.find(matches, o => o._id == payload.id).vacancy.status = 'approved'
            return {
                ...state,
                matches,
                lastApproved: (new Date),
            }
        }

        case FETCH_COMPANY_SUCCEEDED: {
            const { company } = payload;
            const companies = _.filter(state.companies, c => c._id != company._id);
            companies.push(company)
            return { ...state, companies }
        }

        case FETCH_VACANCY_SUCCEEDED: {
            const { vacancy } = payload;
            const vacancies = _.filter(state.vacancies, v => v._id != vacancy._id);
            vacancies.push(vacancy)
            return { ...state, vacancies }
        }

        case SET_DEFAULT_STATE :
            return defaultState;

        default :
            return state;
    }
}
