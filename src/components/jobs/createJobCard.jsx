import React, {Component} from 'react';
import {Link} from 'react-router';
import {ROUTE_COMPANY_JOBS_NEW} from './../../constants/routes';

export default class CreateJobCard extends Component {

    render() {
        return (
            <div className="slider__item slider__item_content_middle">
                <Link
                    to={ROUTE_COMPANY_JOBS_NEW}
                    className="mdl-card card card_size_s card_type_empty"
                >
                    <span className="text text_color_l-grey text_size_huge">
                        +
                    </span>
                    <span className="text text_color_l-grey text_size_m">
                        Create New Job
                    </span>
                </Link>
            </div>
        );
    }

};
