// import axios from 'axios';
// import ShortID from 'shortid';
import saveStep from './saveOnboardingStep';
import _ from 'lodash';
import {
    // OPEN_FETCH_SUCCEEDED,
    // DRAFTS_FETCH_SUCCEEDED,
    // CLOSED_FETCH_SUCCEEDED,

    OPEN_TAB,
    DRAFTS_TAB,
    CLOSED_TAB,

    FETCH_JOBS_SUCCEEDED,
    FETCH_JOBS_FAILED,

    FETCH_COMPANY_SUCCEEDED,
    FETCH_COMPANY_FAILED,

    FETCH_RECRUITER_SUCCEEDED,
    FETCH_RECRUITER_FAILED,

    FETCH_MATCHES_SUCCEEDED,
    FETCH_MATCHES_FAILED,

    FETCH_CANDIDATE_SUCCEEDED,
    FETCH_CANDIDATE_FAILED,


    CREATE_JOB_SUCCEEDED,
    CREATE_JOB_FAILED,

    UPDATE_JOB_SUCCEEDED,
    UPDATE_JOB_FAILED,

    CLOSE_JOB_SUCCEEDED,
    OPEN_JOB_SUCCEEDED,
    DELETE_JOB_SUCCEEDED,

    UPDATE_COMPANY_SUCCEEDED,
    UPDATE_COMPANY_FAILED,

    UPDATE_RECRUITER_SUCCEEDED,
    UPDATE_RECRUITER_FAILED,

    REJECT_POST_SUCCEEDED,
    APPROVE_POST_SUCCEEDED,


    OPEN_APPROVE_AND_EMAIL,
    //  DESCRIPTION_STEP,
    //  SHOW_DESCRIPTION_STEP,
    //  SAVE_DESCRIPTION_DATA,
    //  CLOSE_DESCRIPTION_STEP,
     //
    //  RESPONSIBILITIES_STEP,
    //  SHOW_RESPONSIBILITIES_STEP,
    //  SAVE_RESPONSIBILITIES_DATA,
    //  CLOSE_RESPONSIBILITIES_STEP,
     //
    //  SKILLS_AND_REQUIREMENTS_STEP,
    //  SHOW_SKILLS_AND_REQUIREMENTS_STEP,
    //  SAVE_SKILLS_AND_REQUIREMENTS_DATA,
    //  CLOSE_SKILLS_AND_REQUIREMENTS_STEP,
     //
    //  SAVE_SUMMARY_DATA,
    //  SHOW_SUMMARY_HEAD_STANDARD,
    //  SHOW_SUMMARY_HEAD_EDIT,
    //  SAVE_SUMMARY_DATA_SUCCEEDED,

     SET_DEFAULT_STATE,
    //  SET_DEFAULT_NEW_JOB_STATE,
} from './../constants/companyJobs';

import {
    APPLICATION_UPDATE_COMPANY_SUCCEEDED,
    APPLICATION_UPDATE_RECRUITER_SUCCEEDED,
} from './../constants/applicationCompany';

import {
    API_URL,
    API_CANDIDATE_ROOT
} from './../constants/api';

const defaultState = {
    jobs: [],
    matches: [],
    candidates: [],
    company: {
        name: '{name}',
        locationHeadquarters: {
            city: '{city}',
            state: '{state}'
        }
    },
    recruiter: {},
}
//     open: [{
//         id: ShortID.generate(),
//         jobTitle: 'Sales',
//         location: 'Uzhhorod',
//         salary: '5000$',
//         experience: '1 year',
//         employment: 'Full-time',
//         degree: 'Bachelors',
//         matches: '4',
//     }],
//     drafts: [{
//         id: ShortID.generate(),
//         jobTitle: 'Frontend',
//         location: 'Uzhhorod',
//         salary: '10000$',
//         experience: '2 Years',
//         employment: 'Any',
//         degree: 'Any',
//     }],
//     closed: [{
//         id: ShortID.generate(),
//         jobTitle: 'Sales',
//         location: 'Uzhhorod',
//         salary: '5000$',
//         experience: '1 year',
//         employment: 'Full-time',
//         degree: 'Bachelors',
//         matches: '4',
//     }],
//     activeTab: OPEN_TAB,
//     newJob: {
//         head: SHOW_SUMMARY_HEAD_EDIT,
//         step: null,
//         progress: [],
//         active: [],
//         summary: {},
//     },
// };

// const getOnlyRequired = ({
//     title,
//     location,
//     salary,
//     experience,
//     employment,
//     degree,
//     matches,
//     industry,
//     industryParent, // TODO
// }) => ({
//     jobTitle: title,
//     location,
//     salary,
//     experience,
//     employment,
//     degree,
//     matches,
//     industry,
//     industryParent, // TODO
// });

export default (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_JOBS_SUCCEEDED : {
            const { jobs } = payload;
            return { ...state, jobs };
        }

        case FETCH_COMPANY_SUCCEEDED : {
            const { company } = payload;
            return { ...state, company };
        }

        case FETCH_RECRUITER_SUCCEEDED : {
            const { recruiter } = payload;
            return { ...state, recruiter };
        }

        case FETCH_MATCHES_SUCCEEDED : {
            const matches = _.uniqBy( payload.matches.concat(state.matches), '_id' )
            return { ...state, matches }
        }

        case FETCH_CANDIDATE_SUCCEEDED : {
            const candidates = _.uniqBy( [payload.candidate].concat(state.candidates), '_id' )
            return { ...state, candidates };
        }

        case UPDATE_COMPANY_SUCCEEDED : {
            const { company } = payload;
            return { ...state, company };
        }

        case UPDATE_RECRUITER_SUCCEEDED : {
            const { recruiter } = payload;
            return { ...state, recruiter };
        }

        case APPLICATION_UPDATE_COMPANY_SUCCEEDED : {
            const { company } = payload;
            return { ...state, company };
        }

        case APPLICATION_UPDATE_RECRUITER_SUCCEEDED : {
            const { recruiter } = payload;
            return { ...state, recruiter };
        }

        // case OPEN_FETCH_SUCCEEDED :
        //     return {
        //         ...state,
        //         open: payload.jobs.map((job) => ({
        //                 id: job._id,
        //                 ...getOnlyRequired(job),
        //         })),
        //         drafts: [],
        //         closed: [],
        //         activeTab: OPEN_TAB,
        //     };
        // case DRAFTS_FETCH_SUCCEEDED :
        //     return {
        //         ...state,
        //         open: [],
        //         drafts: payload.jobs
        //             .map((job) => ({
        //                 id: job._id,
        //                 ...getOnlyRequired(job),
        //             })),
        //         closed: [],
        //         activeTab: DRAFTS_TAB,
        //     };
        // case CLOSED_FETCH_SUCCEEDED :
        //     return {
        //         ...state,
        //         open: [],
        //         drafts: [],
        //         closed: payload.jobs
        //             .map((job) => ({
        //                 id: job._id,
        //                 ...getOnlyRequired(job),
        //             })),
        //         activeTab: CLOSED_TAB,
        //     };

        case CREATE_JOB_SUCCEEDED : {
            let jobs = _.clone(state.jobs)
            jobs.push(payload.job)
            return {
                ...state,
                jobs,
            }
        }

        case UPDATE_JOB_SUCCEEDED : {
            let jobs = _.clone(state.jobs)
            let i = _.findIndex(jobs, {_id : payload.id})
            jobs[i] = {...jobs[i], ...payload.data}
            return {
                ...state,
                jobs,
            }
        }

        case CREATE_JOB_FAILED : {
            //TODO send errors back for newjob form state for display
            return {
                ...state,
            }
        }

        case CLOSE_JOB_SUCCEEDED : {
            let jobs = _.clone(state.jobs)
            _.find(jobs, job => job._id == payload.id).status = 'closed'
            return {
                ...state,
                jobs,
            }
        }

        case OPEN_JOB_SUCCEEDED : {
            let jobs = _.clone(state.jobs)
            _.find(jobs, job => job._id == payload.id).status = 'opened'
            return {
                ...state,
                jobs,
            }
        }

        case DELETE_JOB_SUCCEEDED : {
            let jobs = _.clone(state.jobs)
            _.remove(jobs, {_id: payload.id})
            return {
                ...state,
                jobs,
            }
        }

        case REJECT_POST_SUCCEEDED: {// then move newly rejected matching to notInterested collection in state
            let matches = _.clone(state.matches)
            _.find(matches, o => o._id == payload.id).candidate.status = 'rejected'
            return {
                ...state,
                matches,
            }
        }

        case APPROVE_POST_SUCCEEDED: {// then move newly rejected matching to notInterested collection in state
            let matches = _.clone(state.matches)
            _.find(matches, o => o._id == payload.id).candidate.status = 'approved'
            return {
                ...state,
                matches,
                lastApproved: (new Date),
            }
        }

        case OPEN_APPROVE_AND_EMAIL: {
            const match = _.find(state.matches, o => o._id === payload.id);
						console.log("Calling reducer on trigger action...");
            return {
                ...state,
                lastOpenApproved: {...match}
            }
        }

            // TODO what is this???? O_o
        // case SHOW_SUMMARY_HEAD_STANDARD :
        // case SHOW_SUMMARY_HEAD_EDIT :
        //     return {
        //         ...state,
        //         newJob: {
        //             ...state.newJob,
        //             head: type,
        //         },
        //     };
        // case SAVE_SUMMARY_DATA :
        //     return {
        //         ...state,
        //         newJob: {
        //             ...state.newJob,
        //             ...payload,
        //         },
        //     };
        // case SAVE_SUMMARY_DATA_SUCCEEDED :
        //     return {
        //         ...state,
        //         newJob: {
        //             ...state.newJob,
        //             head: SHOW_SUMMARY_HEAD_STANDARD,
        //         },
        //     };

        // case SHOW_DESCRIPTION_STEP :
        //     return {
        //         ...state,
        //         newJob: {
        //             ...state.newJob,
        //             step: type,
        //             active: [DESCRIPTION_STEP],
        //         },
        //     };
        //
        // case SAVE_DESCRIPTION_DATA :
        //     if (!payload.description) {
        //         return {
        //             ...state,
        //             newJob: {
        //                 ...state.newJob,
        //                 description: null,
        //                 progress: state.newJob.progress
        //                     .filter((step) => step !== DESCRIPTION_STEP),
        //                 active: [],
        //             },
        //         };
        //     }
        //
        //     return {
        //         ...state,
        //         newJob: {
        //             ...state.newJob,
        //             ...saveStep({
        //                 state: state.newJob,
        //                 step: DESCRIPTION_STEP,
        //                 payload,
        //             }),
        //             active: [],
        //         },
        //     };
        //
        // case SHOW_RESPONSIBILITIES_STEP :
        //     return {
        //         ...state,
        //         newJob: {
        //             ...state.newJob,
        //             step: type,
        //             active: [RESPONSIBILITIES_STEP],
        //         },
        //     };
        //
        // case SAVE_RESPONSIBILITIES_DATA :
        //     if (!payload.responsibilities) {
        //         return {
        //             ...state,
        //             newJob: {
        //                 ...state.newJob,
        //                 responsibilities: null,
        //                 progress: state.newJob.progress
        //                     .filter((step) => step !== RESPONSIBILITIES_STEP),
        //                 active: [],
        //             },
        //         };
        //     }
        //
        //     return {
        //         ...state,
        //         newJob: {
        //             ...state.newJob,
        //             ...saveStep({
        //                 state: state.newJob,
        //                 step: RESPONSIBILITIES_STEP,
        //                 payload,
        //             }),
        //             active: [],
        //         },
        //     };
        //
        // case SHOW_SKILLS_AND_REQUIREMENTS_STEP :
        //     return {
        //         ...state,
        //         newJob: {
        //             ...state.newJob,
        //             step: type,
        //             active: [SKILLS_AND_REQUIREMENTS_STEP],
        //         },
        //     };
        //
        // case SAVE_SKILLS_AND_REQUIREMENTS_DATA :
        //     if (!payload.skillsAndRequirements) {
        //         return {
        //             ...state,
        //             newJob: {
        //                 ...state.newJob,
        //                 skillsAndRequirements: null,
        //                 progress: state.newJob.progress
        //                     .filter((step) => step !== SKILLS_AND_REQUIREMENTS_STEP),
        //                 active: [],
        //             },
        //         };
        //     }
        //
        //     return {
        //         ...state,
        //         newJob: {
        //             ...state.newJob,
        //             ...saveStep({
        //                 state: state.newJob,
        //                 step: SKILLS_AND_REQUIREMENTS_STEP,
        //                 payload,
        //             }),
        //             active: []
        //         },
        //     };
        //
        // case SET_DEFAULT_NEW_JOB_STATE :
        //     return {
        //         ...state,
        //         newJob: defaultState.newJob,
        //     };
        //
        // case SET_DEFAULT_STATE :
        //     return defaultState;
        //
        // case CLOSE_DESCRIPTION_STEP :
        // case CLOSE_RESPONSIBILITIES_STEP :
        // case CLOSE_SKILLS_AND_REQUIREMENTS_STEP :
        //     return {
        //         ...state,
        //         newJob: {
        //             ...state.newJob,
        //             step: null,
        //             active: [],
        //         },
        //     };
        default: {
             return {
                ...state
             };
        }

    }
};

// export const getCompanyJobs = (state) => {
//     return state.companyJobs;
// };
