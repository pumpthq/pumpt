import _ from 'lodash';
import {
    MATCHES_FETCH_SUCCEEDED,
    BOOKMARK_POST_SUCCEEDED,

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

    switch (type) {
        case MATCHES_FETCH_SUCCEEDED :
            const all = []
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
                else if(card.status.bookmarked) bookmarked.push(card)
                else if(!card.status.approved) notInterested.push(card)
                else all.push(card)
            })

            return {
                ...state,
                all,
                bookmarked,
                notInterested
            }

        case BOOKMARK_POST_SUCCEEDED: // then move newly bookmarked matching to bookmark collection in state
            const all = _.clone(state.all)

            const matchings = _.remove(all, matching => matching.id == payload.data._id)
            const bookmarked = state.bookmarked.concat(matchings)

            return { ...state, all, bookmarked }

        case SET_DEFAULT_STATE :
            return defaultState;

        default :
            return state;
    }
}
