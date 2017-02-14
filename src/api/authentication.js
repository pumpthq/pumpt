import axios from 'axios';

import {
    API_URL,
    API_CHANGE_PASSWORD,
} from '../constants/api';

const RESPONSE_TYPE = { responseType: 'json' };

export const changePassword = data =>
     axios
        .patch(`${API_URL}${API_CHANGE_PASSWORD}`, data, RESPONSE_TYPE)
        .then(response => response.data)
;
