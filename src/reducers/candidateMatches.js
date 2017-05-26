import _ from 'lodash';
import {

    UPDATE_CANDIDATE_SUCCEEDED,
    FETCH_CANDIDATE_SUCCEEDED,
    MATCHES_FETCH_SUCCEEDED,
    BOOKMARK_POST_SUCCEEDED,
    REJECT_POST_SUCCEEDED,
    APPROVE_POST_SUCCEEDED,

    ALL_TAB,
    BOOKMARKED_TAB,
    NOT_INTERESTED_TAB,

    SHOW_FULL_DESCRIPTION,
    HIDE_FULL_DESCRIPTION,

    SET_DEFAULT_STATE,
    FETCH_COMPANY_SUCCEEDED,
    FETCH_VACANCY_SUCCEEDED,
} from './../constants/candidateMatches';

const defaultState = {
    all: [],
    bookmarked: [],
    notInterested: [],
    approved: [],
    activeTab: ALL_TAB,
    companies: [],
    vacancies: [],
    candidate: {},
};

export default (state = defaultState, action) => {
    const { type, payload } = action;
    let all, bookmarked, notInterested, matchings, approved
    switch (type) {
        case FETCH_CANDIDATE_SUCCEEDED : {
            const { candidate } = payload
            return { ...state, candidate }
        }
        case UPDATE_CANDIDATE_SUCCEEDED : {
            const { candidate } = payload
            return { ...state, candidate }
        }
        case MATCHES_FETCH_SUCCEEDED :
              all = []
              , bookmarked = []
              , notInterested = []
              , approved = []

            payload.matches.forEach(match => {
                var card = match.vacancy
                // ⚠️ TODO: review specs how cards are filtered into matches-tabs
                if(card.status.approved !== null) {
                    if (!card.status.approved) notInterested.push(match)
                    else approved.push(card)
                }
                else if(card.status.bookmarked !== null && card.status.bookmarked) bookmarked.push(match)
                else all.push(match)
            })

            return {
                ...state,
                all,
                bookmarked,
                notInterested
            }

        case BOOKMARK_POST_SUCCEEDED: // then move newly bookmarked matching to bookmark collection in state
            all = _.clone(state.all)

            matchings = _.remove(all, matching => matching.id == payload.id)
            bookmarked = state.bookmarked.concat(matchings)

            matchings[0].status.bookmarked = true

            return { ...state, all, bookmarked }

        case REJECT_POST_SUCCEEDED: // then move newly rejected matching to notInterested collection in state
            all = _.clone(state.all)
            bookmarked = _.clone(state.bookmarked)

            matchings = _.remove(all, matching => matching.id == payload.id)

            if(matchings.length === 0) { //could not find matching in 'all', so it should be in 'bookmarked'
                matchings = _.remove(bookmarked, matching => matching.id == payload.id)
            }

            matchings[0].status.approved = false

            notInterested = state.notInterested.concat(matchings)

            return { ...state, all, bookmarked, notInterested }

        case APPROVE_POST_SUCCEEDED: // then move newly rejected matching to notInterested collection in state
            all = _.clone(state.all)
            bookmarked = _.clone(state.bookmarked)

            matchings = _.remove(all, matching => matching.id == payload.id)

            if(matchings.length === 0) { //could not find matching in 'all', so it should be in 'bookmarked'
                matchings = _.remove(bookmarked, matching => matching.id == payload.id)
            }

            matchings[0].status.approved = true

            approved = state.notInterested.concat(matchings)

            return { ...state, all, bookmarked, approved }

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
