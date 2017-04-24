import _ from 'lodash';
import ShortID from 'shortid';
import axios from 'axios';
import {
    MATCHES_FETCH_SUCCEEDED,
    BOOKMARKED_FETCH_SUCCEEDED,
    NOT_INTERESTED_FETCH_SUCCEEDED,

    BOOKMARK_POST_SUCCEEDED,

    ALL_TAB,
    BOOKMARKED_TAB,
    NOT_INTERESTED_TAB,

    SET_DEFAULT_STATE,
} from './../constants/candidateMatches';

const defaultText = [
    'Our Account Management team is comprised of highly motivated, experienced marketing professionals dedicated to providing our clients with the highest quality of service.',
    ' We are seeking a candidate who is career-minded, professional and responsible to manage digital and print media campaigns and partnerships with established clients.'
];
const demoCard = () => ({
    id: ShortID.generate(),
    name: "New York Times",
    logo: "",
    title: "Media Manager",
    location: "New York, NY",
    match: '97',
    salary: "$50–100K",
    experience: "5–10 years",
    employment: "Full-time",
    text :defaultText,
    background: ""
});

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

const getOnlyRequired = ({
    name,
    logo,
    title,
    location,
    match,
    salary,
    experience,
    employment,
    text,
    background
}) => ({
    name,
    logo,
    title,
    location,
    match,
    salary,
    experience,
    employment,
    text,
    background
});

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case MATCHES_FETCH_SUCCEEDED :
            const vacancies = payload.matches.map(matching => {
                let vacancy = matching._vacancy
                return {
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
            })
            return {
                all: vacancies,
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
            /*return {
                ...state,
                all: payload.matches
                    .map((job) => ({
                        id: job._id,
                        ...getOnlyRequired(job),
                    })),
                bookmarked: [],
                notInterested: [],
                activeTab: ALL_TAB,
            };*/
        case BOOKMARKED_FETCH_SUCCEEDED :
            return {
                ...state,
                all: [],
                bookmarked: payload.matches
                    .map((job) => ({
                        id: job._id,
                        ...getOnlyRequired(job),
                    })),
                notInterested: [],
                activeTab: BOOKMARKED_TAB,
            };
        case NOT_INTERESTED_FETCH_SUCCEEDED :
            return {
                ...state,
                all: [],
                bookmarked: [],
                notInterested: payload.matches
                    .map((job) => ({
                        id: job._id,
                        ...getOnlyRequired(job),
                    })),
                activeTab: NOT_INTERESTED_TAB,
            };
        case SET_DEFAULT_STATE :
            return defaultState;

        case BOOKMARK_POST_SUCCEEDED: // then move newly bookmarked matching to bookmark collection in state
            const all = _.clone(state.all)

            const matchings = _.remove(all, matching => matching.id == payload.data._id)
            const bookmarked = state.bookmarked.concat(matchings)

            return { ...state, all, bookmarked }

        default :
            return state;
    }
};

export const getCandidateMatches = (state) => {
    return state.candidateMatches;
};
