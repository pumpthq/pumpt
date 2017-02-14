import ShortID from 'shortid';
import {
    ALL_FETCH_SUCCEEDED,
    BOOKMARKED_FETCH_SUCCEEDED,
    NOT_INTERESTED_FETCH_SUCCEEDED,

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
    all: [demoCard(), demoCard(), demoCard(), demoCard(), demoCard()],
    bookmarked: [demoCard()],
    notInterested: [demoCard()],
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
        case ALL_FETCH_SUCCEEDED :
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://37.139.29.63:4000/api/matches', false);
            xhr.send(null);
            let vacancies = eval("(" + xhr.responseText + ")");
            let finalVacancies = [];
            vacancies.map((vacancy) => {

                let finalVacancy = {
                    id: vacancy._id,
                    name: vacancy.company.name,
                    logo: vacancy.company.logo,
                    title: vacancy.title,
                    location: vacancy.company.locationHeadquarters.state,
                    match: 80, // Math.floor(Math.random() * 21) + 70,
                    salary: vacancy.salary,
                    experience: vacancy.experience,
                    employment: vacancy.employment,
                    text: defaultText,
                    background: '',
                };
                finalVacancies.push(finalVacancy);
            });
            return {
                all: finalVacancies,
                bookmarked: [demoCard()],
                notInterested: [demoCard()],
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

        case 'FETCH_VACANCIES_FOR_CANDIDATE' : {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://37.139.29.63:4000/api/matches', false);
            xhr.send(null);
            let vacancies = eval("(" + xhr.responseText + ")");
            let finalVacancies = [];
            vacancies.map((vacancy) => {

                let finalVacancy = {
                    id: vacancy._id,
                    name: vacancy.company.name,
                    logo: 'https://myspace.com/common/images/user.png',
                    title: vacancy.title,
                    location: vacancy.company.locationHeadquarters.state,
                    match: 80, // Math.floor(Math.random() * 21) + 70,
                    salary: vacancy.salary,
                    experience: vacancy.experience,
                    employment: vacancy.employment,
                    text: defaultText,
                    background: '',
                };
                finalVacancies.push(finalVacancy);
            });
            return {
                all: finalVacancies,
                bookmarked: [demoCard()],
                notInterested: [demoCard()],
                activeTab: ALL_TAB,
                newJob: {
                    step: null,
                    progress: [],
                    active: [],
                    summary: {},
                },
            };
        }

        default :
            return state;
    }
};

export const getCandidateMatches = (state) => {
    return state.candidateMatches;
};
