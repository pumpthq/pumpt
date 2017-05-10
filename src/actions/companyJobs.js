import { deprecated } from 'core-decorators'
import {
    // FETCH_JOBS_REQUESTED,
    FETCH_JOBS_SUCCEEDED,
    FETCH_JOBS_FAILED,

    FETCH_COMPANY_SUCCEEDED,
    FETCH_COMPANY_FAILED,

    FETCH_RECRUITER_SUCCEEDED,
    FETCH_RECRUITER_FAILED,

    // OPEN_FETCH_REQUESTED,
    // OPEN_FETCH_SUCCEEDED,
    // OPEN_FETCH_FAILED,
    //
    // DRAFTS_FETCH_REQUESTED,
    // DRAFTS_FETCH_SUCCEEDED,
    // DRAFTS_FETCH_FAILED,
    //
    // CLOSED_FETCH_REQUESTED,
    // CLOSED_FETCH_SUCCEEDED,
    // CLOSED_FETCH_FAILED,

    ROUTE_TO_OPEN,
    ROUTE_TO_DRAFTS,
    ROUTE_TO_CLOSED,

    // SHOW_DESCRIPTION_STEP,
    // SAVE_DESCRIPTION_DATA,
    // CLOSE_DESCRIPTION_STEP,
    //
    // SHOW_RESPONSIBILITIES_STEP,
    // SAVE_RESPONSIBILITIES_DATA,
    // CLOSE_RESPONSIBILITIES_STEP,
    //
    // SHOW_SKILLS_AND_REQUIREMENTS_STEP,
    // SAVE_SKILLS_AND_REQUIREMENTS_DATA,
    // CLOSE_SKILLS_AND_REQUIREMENTS_STEP,

    // SAVE_SUMMARY_DATA,
    // SAVE_SUMMARY_DATA_SUCCEEDED,
    // SAVE_SUMMARY_DATA_FAILED,

    OPEN_JOB_SUCCEEDED,
    CLOSE_JOB_SUCCEEDED,
    DELETE_JOB_SUCCEEDED,

    // START_MATCHING,
    // SET_DEFAULT_STATE,
    // SET_DEFAULT_NEW_JOB_STATE,
    //
    // CLOSE_OPENED_NEW_JOB_CARD,

    CREATE_JOB_SUCCEEDED,
    CREATE_JOB_FAILED,

    UPDATE_JOB_SUCCEEDED,
    UPDATE_JOB_FAILED,


} from './../constants/companyJobs';
import { API } from '../constants/actionTypes'
import {
    // API_URL,
    // API_ALL_JOBS,
    // API_OPEN_JOBS,
    // API_DRAFT_JOBS,
    // API_CLOSED_JOBS,
    API_VACANCY_ROOT,
    API_RECRUITER_ROOT,
    API_COMPANY_ROOT,
} from './../constants/api';


// export const getAllJobs = () => {
//     return {
//     type:API,
//     payload:{
//         method: 'GET',
//         url: API_ALL_JOBS,
//     }
//   }
// };

export const updateJob = (id, data)  => {
    return {
      type: API,
      payload:{
          method: 'PUT',
          url: `${API_VACANCY_ROOT}/${id}`,
          data,
          success: updateJobSucceeded(id, data),
      }
    }
};

export const updateJobSucceeded = (id, data) => job => {
    return {
      type: UPDATE_JOB_SUCCEEDED,
      payload: {
          id,
          data,
          job,
      }
    }
};

export const updateJobFailed = err => {
    return {
      type: UPDATE_JOB_FAILED,
      payload: {
          err
      }
    }
};


export const createJob = (data) => {
    return {
    type:API, payload:{
        method: 'POST',
        url: API_VACANCY_ROOT,
        data,
        success: createJobSucceeded,
        failed: createJobFailed
    }
  }
};


export const createJobSucceeded = job => {
    return {
      type: CREATE_JOB_SUCCEEDED,
      payload: {
          job
      }
    }
};

export const createJobFailed = err => {
    return {
      type: CREATE_JOB_FAILED,
      payload: {
          err
      }
    }
};


export const fetchJobs = () => {
    return {
        type : API,
        payload:{
            method: 'GET',
            url: API_VACANCY_ROOT,
            success: fetchJobsSucceeded,
            error: fetchJobsFailed,
        }
    }
};

export const fetchJobsSucceeded = jobs => ({
    type : FETCH_JOBS_SUCCEEDED,
    payload: {
        jobs
    }
})

export const fetchJobsFailed = () => ({
    type : FETCH_JOBS_FAILED
})


export const fetchCompany = () => {
    return {
        type : API,
        payload:{
            method: 'GET',
            url: `${API_COMPANY_ROOT}/current`,
            success: fetchCompanySucceeded,
            error: fetchCompanyFailed,
        }
    }
};

export const fetchCompanySucceeded = company => ({
    type : FETCH_COMPANY_SUCCEEDED,
    payload: {
        company
    }
})

export const fetchCompanyFailed = () => ({
    type : FETCH_COMPANY_FAILED
})


export const fetchRecruiter = () => {
    return {
        type : API,
        payload:{
            method: 'GET',
            url: `${API_RECRUITER_ROOT}/current`,
            success: fetchRecruiterSucceeded,
            error: fetchRecruiterFailed,
        }
    }
};

export const fetchRecruiterSucceeded = recruiter => ({
    type : FETCH_RECRUITER_SUCCEEDED,
    payload: {
        recruiter
    }
})

export const fetchRecruiterFailed = () => ({
    type : FETCH_RECRUITER_FAILED
})

//
// export const fetchOpen = () => ({
//     type : OPEN_FETCH_REQUESTED
// })
//
// export const fetchOpenSucceeded = ({ jobs }) => ({
//     type : OPEN_FETCH_SUCCEEDED,
//     payload : {
//         jobs
//     }
// })
//
// export const fetchOpenFailed = ({ statusCode }) => ({
//     type : OPEN_FETCH_FAILED,
//     payload : {
//         statusCode
//     }
// })
//
// export const fetchDrafts = () => ({
//     type : DRAFTS_FETCH_REQUESTED
// })
//
// export const fetchDraftsSucceeded = ({ jobs }) => ({
//     type : DRAFTS_FETCH_SUCCEEDED,
//     payload : {
//         jobs
//     }
// })
//
// export const fetchDraftsFailed = ({ statusCode }) => ({
//     type : DRAFTS_FETCH_FAILED,
//     payload : {
//         statusCode
//     }
// })
//
// export const fetchClosed = () => ({
//     type : CLOSED_FETCH_REQUESTED
// })
//
// export const fetchClosedSucceeded = ({ jobs }) => ({
//     type : CLOSED_FETCH_SUCCEEDED,
//     payload : {
//         jobs
//     }
// })
//
// export const fetchClosedFailed = ({ statusCode }) => ({
//     type : CLOSED_FETCH_FAILED,
//     payload : {
//         statusCode
//     }
// })

// export const routeToOpen = () => ({
//     type : ROUTE_TO_OPEN
// })
//
// export const routeToDrafts = () => ({
//     type : ROUTE_TO_DRAFTS
// })
//
// export const routeToClosed = () => ({
//     type : ROUTE_TO_CLOSED
// })

export const showDescriptionStep = () => ({
    type : SHOW_DESCRIPTION_STEP
})

export const saveDescriptionData = ({ description }) => ({
    type : SAVE_DESCRIPTION_DATA,
    payload : {
        description
    }
})

export const cancelDescriptionStep = (payload = {}) => ({
    type : CLOSE_DESCRIPTION_STEP,
    payload : {}
})

export const showResponsibilitiesStep = () => ({
    type : SHOW_RESPONSIBILITIES_STEP
})

export const saveResponsibilitiesData = ({ responsibilities }) => ({
    type : SAVE_RESPONSIBILITIES_DATA,
    payload : {
        responsibilities
    }
})

export const cancelResponsibilitiesStep = (payload = {}) => ({
    type : CLOSE_RESPONSIBILITIES_STEP,
    payload : {}
})

export const showSkillsAndRequirementsStep = () => ({
    type : SHOW_SKILLS_AND_REQUIREMENTS_STEP
})

export const saveSkillsAndRequirementsData = ({ skillsAndRequirements }) => ({
    type : SAVE_SKILLS_AND_REQUIREMENTS_DATA,
    payload : {
        skillsAndRequirements
    }
})

export const cancelSkillsAndRequirementsStep = (payload = {}) => ({
    type : CLOSE_SKILLS_AND_REQUIREMENTS_STEP,
    payload : {}
})

export const saveSummaryData = ({
    jobTitle,
    location,
    salary,
    experience,
    employment,
    degree,
    industry,
}) => ({
    type: SAVE_SUMMARY_DATA,
    payload: {
        jobTitle,
        location,
        salary,
        experience,
        employment,
        degree,
        industry,
    },
});


export const saveSummaryDataSucceeded = ({}) => deprecated({
    type : SAVE_SUMMARY_DATA_SUCCEEDED,
    payload : {}
})

export const saveSummaryDataFailed = ({}) => deprecated({
    type : SAVE_SUMMARY_DATA_FAILED,
    payload : {}
})

export const closeJob = id => ({
    type: API,
    payload: {
        url: `${API_VACANCY_ROOT}/${id}`,
        method: 'PUT',
        data: { status: 'closed' },
        success: closeJobSucceeded(id)
    }
});


export const closeJobSucceeded = id => data => ({
    type: CLOSE_JOB_SUCCEEDED,
    payload: { id },
});


export const deleteJob = id => ({
    type: API,
    payload: {
        url: `${API_VACANCY_ROOT}/${id}`,
        method: 'DELETE',
        success: deleteJobSucceeded(id)
    }
});

export const deleteJobSucceeded = id => data => ({
    type: DELETE_JOB_SUCCEEDED,
    payload: { id },
});


export const openJob = id => ({
    type: API,
    payload: {
        url: `${API_VACANCY_ROOT}/${id}`,
        method: 'PUT',
        data: { status: 'opened' },
        success: openJobSucceeded(id)
    }
});


export const openJobSucceeded = id => data => ({
    type: OPEN_JOB_SUCCEEDED,
    payload: { id },
});


//
// export const startMatching = ({ id }) => ({
//     type: START_MATCHING,
//     payload: { id },
// });
//
// export const clearCompanyJobsState = () => ({
//     type: SET_DEFAULT_STATE,
// });
//
// export const clearNewJobState = () => ({
//     type: SET_DEFAULT_NEW_JOB_STATE,
// });
//
// export const closeOpenedNewJobCard = () => ({
//     type: CLOSE_OPENED_NEW_JOB_CARD
// })
