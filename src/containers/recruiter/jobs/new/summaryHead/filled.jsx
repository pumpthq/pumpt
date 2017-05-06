import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
    jobTitle: PropTypes.string,
    location: PropTypes.string,
    salary: PropTypes.string,
    experience: PropTypes.string,
    employment: PropTypes.string,
    degree: PropTypes.string,
    industry: PropTypes.string,
};

const defaultProps = {
    jobTitle: ' Media Manager Assistant ',
    location: 'New York, NY',
    salary: '$50-100K',
    experience: '2-5 years',
    employment: 'Full-time',
    degree: 'Bachelor\'s',
};

@connect(
    (state) => {
        const {
            jobTitle,
            location,
            salary,
            experience,
            employment,
            degree,
            industry,
        } = state.companyJobs.newJob;
        return {
            jobTitle,
            location,
            salary,
            experience,
            employment,
            degree,
            industry,
        };
    }
)
class SummaryHeadFilled extends Component {
    render() {
        const {
            jobTitle,
            location,
            salary,
            experience,
            employment,
            degree,
            industry,
        } = this.props;
        return (
            <div className="summary-head__title mdl-card__title">
                <div className="row">
                    <div className="col-lg-10">
                        <div className="summary-head__title-item">
                            <div className="summary-head__title-column">
                                <h2 className="mdl-card__title-text heading heading_color_invert heading_type_two">
                                    {jobTitle}
                                </h2>
                                <span className="mdl-card__subtitle-text summary-head__subtitle-text text text_color_invert">
                                    {location}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 text-right">
                        <span className="text text_color_invert text_size_xxs text_opacity_30 text_helper text_helper_s">
                            {/*Saved 12 s ago*/}
                        </span>
                    </div>
                </div>
                <div className="summary-head__title-item summary-head__title-item_type_vertical summary-head__title-item_size_m">

                    <div className="summary-head__title-column">
                        <span className="text text_color_invert summary-head__label">
                            Focus
                        </span>
                        <span className="text text_color_invert text_size_s summary-head__summary">
                            {industry.value}
                        </span>
                    </div>

                    <div className="summary-head__title-column">
                        <span className="text text_color_invert summary-head__label">
                            Salary
                        </span>
                        <span className="text text_color_invert text_size_s summary-head__summary">
                            {salary.value}
                        </span>
                    </div>

                    <div className="summary-head__title-column">
                        <span className="text text_color_invert summary-head__label">
                            Experience
                        </span>
                        <span className="text text_color_invert text_size_s summary-head__summary">
                            {experience.value}
                        </span>
                    </div>

                    <div className="summary-head__title-column">
                        <span className="text text_color_invert summary-head__label">
                            Employment
                        </span>
                        <span className="text text_color_invert text_size_s summary-head__summary">
                            {employment.value}
                        </span>
                    </div>

                    <div className="summary-head__title-column">
                        <span className="text text_color_invert summary-head__label">
                            Degree
                        </span>
                        <span className="text text_color_invert text_size_s summary-head__summary">
                            {degree.value}
                        </span>
                    </div>
                </div>
            </div>
        );
    };
}

SummaryHeadFilled.propTypes = propTypes;

SummaryHeadFilled.defaultProps = defaultProps;

export default SummaryHeadFilled;
