import axios from 'axios';
import co from 'co';
import {
    API_URL,
} from './constants/api';

import SESSION from './constants/session';
import {
    INDUSTRY_DROPDOWN_DATA,
    FIELD_OF_EXPERTISE_DROPDOWN_DATA,
    JOB_TITLE_DROPDOWN_DATA,
    ANNUAL_INCOME_DROPDOWN_DATA,
    COMPANY_SIZE_DROPDOWN_DATA,
    EXPERIENCE_DROPDOWN_DATA,
    VALUE_ASSESSMENTS_DROPDOWN_DATA
} from './constants/candidateOnboarding';
import {
    COMPANY_EMPLOYEES_DATA,
    COMPANY_TYPE_DATA,
} from './constants/companyOnboarding';
import {
    EMPLOYEMENTS_DROPDOWN_DATA,
    DEGREES_DROPDOWN_DATA,
} from './constants/companyJobs';

export const getAppData = () =>
     Promise.all([
         co(function* () {
             const response = yield axios.get(`${API_URL}/enums/all`);
             const data = response.data;

             data.CURRENT_UNDUSTRIES_DROPDOWN_DATA.forEach((element) => INDUSTRY_DROPDOWN_DATA.push(element));
             data.CURRENT_EXPERIENCE_DROPDOWN_DATA.forEach((element) => FIELD_OF_EXPERTISE_DROPDOWN_DATA.push(element));
             data.CURRENT_JOBS_DROPDOWN_DATA.forEach((element) => JOB_TITLE_DROPDOWN_DATA.push(element));
             data.ANNUAL_INCOME_DROPDOWN_DATA.forEach((element) => ANNUAL_INCOME_DROPDOWN_DATA.push(element));
             data.COMPANY_SIZE_DROPDOWN_DATA.forEach((element) => COMPANY_SIZE_DROPDOWN_DATA.push(element));
             data.VALUE_ASSESSMENTS_DROPDOWN_DATA.forEach((element) => VALUE_ASSESSMENTS_DROPDOWN_DATA.push(element));
             data.EXPERIENCE_DROPDOWN_DATA.forEach((element) => EXPERIENCE_DROPDOWN_DATA.push(element));

             data.EMPLOYEES_AMOUNTS_DROPDOWN_DATA.forEach((element) => COMPANY_EMPLOYEES_DATA.push(element));
             data.CURRENT_UNDUSTRIES_DROPDOWN_DATA.forEach((element) => COMPANY_TYPE_DATA.push(element));
             data.EMPLOYEMENTS_DROPDOWN_DATA.forEach((element) => EMPLOYEMENTS_DROPDOWN_DATA.push(element));
             data.DEGREES_DROPDOWN_DATA.forEach((element) => DEGREES_DROPDOWN_DATA.push(element));

            //  const session = yield axios.get(`${API_URL}/users/current`);
            //  SESSION.push(session.data);

            console.log('ON START: ', SESSION);

             return data;
         }),
     ])
;
