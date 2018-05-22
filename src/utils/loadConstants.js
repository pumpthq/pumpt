import axios from 'axios';

import {API_URL} from '../constants/api';
import {COMPANY_EMPLOYEES_DATA, COMPANY_TYPE_DATA} from '../constants/companyOnboarding';
import {DEGREES_DROPDOWN_DATA, EMPLOYEMENTS_DROPDOWN_DATA} from '../constants/companyJobs';
import {
    ANNUAL_INCOME_DROPDOWN_DATA,
    EXPERIENCE_DROPDOWN_DATA,
    FIELD_OF_EXPERTISE_DROPDOWN_DATA,
    INDUSTRY_DROPDOWN_DATA,
    JOB_TITLE_DROPDOWN_DATA,
    VALUE_ASSESSMENTS_DROPDOWN_DATA,
  DEGREE_DROPDOWN_DATA
} from '../constants/candidateOnboarding';

export default () =>
     axios.get(`http://localhost:4000/${API_URL}/enums/all`)
        .then(response => {
            const data = response.data;

            data.VALUE_ASSESSMENTS_DROPDOWN_DATA.forEach(el => {
                VALUE_ASSESSMENTS_DROPDOWN_DATA.push(el);
            });
            data.CURRENT_EXPERIENCE_DROPDOWN_DATA.forEach(el => {
                FIELD_OF_EXPERTISE_DROPDOWN_DATA.push(el);
            });
            data.CURRENT_INDUSTRIES_DROPDOWN_DATA.forEach(el => {
                INDUSTRY_DROPDOWN_DATA.push(el);
            });
            data.EMPLOYEES_AMOUNTS_DROPDOWN_DATA.forEach(el => {
                COMPANY_EMPLOYEES_DATA.push(el);
            });
            data.ANNUAL_INCOME_DROPDOWN_DATA.forEach(el => {
                ANNUAL_INCOME_DROPDOWN_DATA.push(el);
            });
            data.COMPANY_SIZE_DROPDOWN_DATA.forEach(el => {
                COMPANY_SIZE_DROPDOWN_DATA.push(el);
            });
            data.EMPLOYEMENTS_DROPDOWN_DATA.forEach(el => {
                EMPLOYEMENTS_DROPDOWN_DATA.push(el);
            });
            data.CURRENT_INDUSTRIES_DROPDOWN_DATA.forEach(el => {
                COMPANY_TYPE_DATA.push(el);
            });
            data.CURRENT_JOBS_DROPDOWN_DATA.forEach(el => {
                JOB_TITLE_DROPDOWN_DATA.push(el);
            });
            data.EXPERIENCE_DROPDOWN_DATA.forEach(el => {
                EXPERIENCE_DROPDOWN_DATA.push(el);
            });
            data.DEGREES_DROPDOWN_DATA.forEach(el => {
                DEGREES_DROPDOWN_DATA.push(el);
            });
            data.DEGREES_DROPDOWN_DATA.forEach(el => {
                DEGREE_DROPDOWN_DATA.push(el);
            });
        })
        .catch(error => {
            console.log(error);
        });
