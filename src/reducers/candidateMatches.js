import _ from 'lodash';
import {
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
    newJob: {
        step: null,
        progress: [],
        active: [],
        summary: {},
    },
    companies: [],
    vacancies: [],
};

export default (state = defaultState, action) => {
    const { type, payload } = action;
    let all, bookmarked, notInterested, matchings, approved
    switch (type) {
        case MATCHES_FETCH_SUCCEEDED :
              all = []
              , bookmarked = []
              , notInterested = []
              , approved = []

            payload.matches.forEach(matching => {
                let vacancy = matching._vacancy

                let card = {
                    id: matching._id,
                    _id: matching._id,
                    _vacancy: vacancy._id,
                    _company: vacancy.company._id,
                    name: vacancy.company.name,
                    logo: vacancy.company.logo,
                    title: vacancy.title,
                    location: vacancy.company.locationHeadquarters.state,
                    match: matching.score,
                    salary: vacancy.salary,
                    experience: vacancy.experience,
                    employment: vacancy.employment,
                    degree: vacancy.degree,
                    text: vacancy.description,
                    responsibilities: vacancy.responsibilities || [],
                    requirements: vacancy.requirements || [],
                    background: vacancy.company.background,
                    quoteOrMotto: vacancy.company.quoteOrMotto,
                    status: matching.vacancy.status || {}
                }


                // ⚠️ TODO: review specs how cards are filtered into matches-tabs
                if(card.status.approved !== undefined) {
                    if (!card.status.approved) notInterested.push(card)
                    else approved.push(card)
                }
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

        case SHOW_FULL_DESCRIPTION:
            all = _.clone(state.all)
            bookmarked = _.clone(state.bookmarked)
            notInterested = _.clone(state.notInterested)
            all.forEach( (job) => {
                job.viewDetails = job.id === payload.id
            })
            bookmarked.forEach( (job) => {
                job.viewDetails = job.id === payload.id
            })
            notInterested.forEach( (job) => {
                job.viewDetails = job.id === payload.id
            })


            return {...state, all, bookmarked, notInterested };

        case HIDE_FULL_DESCRIPTION:
            const hide = job => job.viewDetails = false;
                all = _.clone(state.all)
                bookmarked = _.clone(state.bookmarked)
                notInterested = _.clone(state.notInterested)

                all.forEach(hide)
                bookmarked.forEach(hide)
                notInterested.forEach(hide)


                return {...state, all, bookmarked, notInterested };


        case SET_DEFAULT_STATE :
            return defaultState;

        default :
            return state;
    }
}
