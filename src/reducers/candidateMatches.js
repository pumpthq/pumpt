import _ from 'lodash';
import {
    MATCHES_FETCH_SUCCEEDED,
    BOOKMARK_POST_SUCCEEDED,
    REJECT_POST_SUCCEEDED,

    ALL_TAB,
    BOOKMARKED_TAB,
    NOT_INTERESTED_TAB,

    SET_DEFAULT_STATE,
} from './../constants/candidateMatches';

const defaultState = {
    all: [],
    bookmarked: [],
    notInterested: [],
    activeTab: ALL_TAB,
    newJob: {
        step: null,
        progress: [],
        active: [],
        summary: {},
    },
};

export default (state = defaultState, action) => {
    const { type, payload } = action;
    let all, bookmarked, notInterested, matchings
    switch (type) {
        case MATCHES_FETCH_SUCCEEDED :
            all = []
              , bookmarked = []
              , notInterested = []

            payload.matches.forEach(matching => {
                let vacancy = matching._vacancy
                let card = {
                    id: matching._id,
                    name: vacancy.company.name,
                    logo: vacancy.company.logo,
                    title: vacancy.title,
                    location: vacancy.company.locationHeadquarters.state,
                    match: matching.score,
                    salary: vacancy.salary,
                    experience: vacancy.experience,
                    employment: vacancy.employment,
                    text: vacancy.description,
                    background: '',
                    status: matching.vacancy.status
                }

                // ⚠️ TODO: review specs how cards are filtered into matches-tabs
                if(card.status === undefined) all.push(card)
                else if(card.status.approved !== undefined && !card.status.approved) notInterested.push(card)
                else if(card.status.bookmarked !== undefined && card.status.bookmarked) bookmarked.push(card)
                else all.push(card)
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

            return { ...state, all, bookmarked }

        case REJECT_POST_SUCCEEDED: // then move newly rejected matching to notInterested collection in state
            all = _.clone(state.all)
            bookmarked = _.clone(state.bookmarked)

            matchings = _.remove(all, matching => matching.id == payload.id)

            if(matchings.length === 0) { //could not find matching in 'all', so it should be in 'bookmarked'
                matchings = _.remove(bookmarked, matching => matching.id == payload.id)
            }

            notInterested = state.notInterested.concat(matchings)

            return { ...state, all, bookmarked, notInterested }

        case SET_DEFAULT_STATE :
            return defaultState;

        default :
            return state;
    }
}
