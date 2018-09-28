import {deprecated} from 'core-decorators'
import {
    APPROVE_POST_SUCCEEDED,
    CLOSE_DESCRIPTION_STEP,
    CLOSE_JOB_SUCCEEDED,
    CLOSE_RESPONSIBILITIES_STEP,
    CLOSE_SKILLS_AND_REQUIREMENTS_STEP,
    CREATE_JOB_FAILED,
    CREATE_JOB_SUCCEEDED,
    DELETE_JOB_SUCCEEDED,
    FETCH_CANDIDATE_SUCCEEDED,
    FETCH_COMPANY_FAILED,
    FETCH_COMPANY_SUCCEEDED,
    FETCH_JOBS_FAILED,
    FETCH_JOBS_SUCCEEDED,
    FETCH_MATCHES_SUCCEEDED,
    FETCH_RECRUITER_FAILED,
    FETCH_RECRUITER_SUCCEEDED,
    OPEN_APPROVE_AND_EMAIL,
    OPEN_JOB_SUCCEEDED,
    REJECT_POST_SUCCEEDED,
    RESTORE_POST_SUCCEEDED,
    SAVE_DESCRIPTION_DATA,
    SAVE_RESPONSIBILITIES_DATA,
    SAVE_SKILLS_AND_REQUIREMENTS_DATA,
    SAVE_SUMMARY_DATA,
    SAVE_SUMMARY_DATA_FAILED,
    SAVE_SUMMARY_DATA_SUCCEEDED,
    SHOW_DESCRIPTION_STEP,
    SHOW_RESPONSIBILITIES_STEP,
    SHOW_SKILLS_AND_REQUIREMENTS_STEP,
    UPDATE_COMPANY_SUCCEEDED,
    UPDATE_JOB_FAILED,
    UPDATE_JOB_SUCCEEDED,
    UPDATE_RECRUITER_SUCCEEDED,
} from './../constants/companyJobs';
import {API} from '../constants/actionTypes'
import {API_COMPANY_ROOT, API_RECRUITER_ROOT, API_VACANCY_ROOT,} from './../constants/api';


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


export const updateCompany = (data)  => {
    return {
      type: API,
      payload:{
          method: 'PUT',
          url: `${API_COMPANY_ROOT}/current`,
          data,
          success: updateCompanySucceeded(data),
      }
    }
};

export const updateCompanySucceeded = (data) => company => {
    return {
      type: UPDATE_COMPANY_SUCCEEDED,
      payload: {
          data,
          company,
      }
    }
};

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


export const updateRecruiter = (data)  => {
    return {
      type: API,
      payload:{
          method: 'PUT',
          url: `${API_RECRUITER_ROOT}/current`,
          data,
          success: updateRecruiterSucceeded(data),
      }
    }
};

export const updateRecruiterSucceeded = (data) => recruiter => {
    return {
      type: UPDATE_RECRUITER_SUCCEEDED,
      payload: {
          data,
          recruiter,
      }
    }
};

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

export const fetchMatches = (id) => ({
    type : API,
    payload : {
        url : `/matches/vacancy/${id}`,
        success: fetchMatchesSucceeded,
    }
})

export const fetchMatchesSucceeded = matches => ({
    type : FETCH_MATCHES_SUCCEEDED,
    payload : {
        matches
    }
})

export const fetchCandidate = (id) => ({
    type : API,
    payload : {
        url : `/candidates/${id}`,
        success: fetchCandidateSucceeded,
    }
})

export const fetchCandidateSucceeded = candidate => ({
    type : FETCH_CANDIDATE_SUCCEEDED,
    payload : {
        candidate
    }
})


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


export const postReject = (matchingId) => ({
    type : API,
    payload : {
        url : `/matches/reject/${matchingId}`,
        success: postRejectSucceeded(matchingId),
    }
})

export const postRejectSucceeded = id => data => ({
    type: REJECT_POST_SUCCEEDED,
    payload: { id }
})

export const openApprove = (id) => ({
    type: OPEN_APPROVE_AND_EMAIL,
    payload: { id }
})

export const postApprove = (matchingId, email) => ({
    type : API,
    payload : {
        url : `/matches/approve/${matchingId}`,
        data: {email},
        success: postApproveSucceeded(matchingId),
    }
})

export const postApproveSucceeded = id => data => ({
    type: APPROVE_POST_SUCCEEDED,
    payload: { id }
})


export const postRestore = (matchingId) => ({
    type : API,
    payload : {
        url : `/matches/restore/${matchingId}`,
        success: postRestoreSucceeded(matchingId),
    }
})

export const postRestoreSucceeded = id => data => ({
    type: RESTORE_POST_SUCCEEDED,
    payload: { id }
})
