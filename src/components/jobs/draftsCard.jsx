import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { H2 } from './../main/heading';
import Button from './../main/button';
import {
    deleteJob,
    startMatching,
} from './../../actions/companyJobs';

const propTypes = {
    title: PropTypes.string,
    state: PropTypes.string,
    salary: PropTypes.string,
    experience: PropTypes.string,
    employment: PropTypes.string,
    degree: PropTypes.string,
    matches: PropTypes.string,
    _id: PropTypes.string,
    dispatch: PropTypes.func,
};

const defaultProps = {
    title: '',
    state: '',
    salary: '',
    experience: '',
    employment: '',
    degree: '',
};

@connect(
    (dispatch) => ({dispatch})
)
class DraftsCard extends Component {
    render() {
        const {
            title,
            state,
            salary,
            experience,
            employment,
            degree,
            _id,
            dispatch,
        } = this.props;
        return (
            <div className="slider__item slider__item_content_middle">
                <div className="mdl-card card card_size_s">
                    <div className="summary-head summary-head_rad-top" style={{ backgroundColor: '#4f68ac' }}>
                        <div className={`summary-head__title mdl-card__title ${title ? null : 'summary-head__title_transparency'}`}>
                            <div className="summary-head__title-item">
                                <div className="summary-head__title-column">
                                    <div className="summary-head__title-block">
                                        <H2 className="mdl-card__title-text heading heading_color_invert heading_type_two">
                                            {title || 'Untitled'}
                                        </H2>
                                        <span className="mdl-card__subtitle-text summary-head__subtitle-text text text_color_invert text_size_xs">
                                            {state || 'Location is not specified'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-head__title-item summary-head__title-item_type_vertical ">
                                <div className="summary-head__title-column ">
                                    <span className="text text_color_invert summary-head__label">Salary
                                    </span>
                                    <span className="text text_color_invert text_size_s summary-head__summary">
                                        {salary || 'Not specified'}
                                    </span>
                                </div>
                                <div className="summary-head__title-column ">
                                    <span className="text text_color_invert summary-head__label">Experience
                                    </span>
                                    <span className="text text_color_invert text_size_s summary-head__summary">
                                        {experience || 'Any'}
                                    </span>
                                </div>
                                <div className="summary-head__title-column ">
                                    <span className="text text_color_invert summary-head__label">Employment
                                    </span>
                                    <span className="text text_color_invert text_size_s summary-head__summary">
                                        {employment || 'Any'}
                                    </span>
                                </div>
                                <div className="summary-head__title-column ">
                                    <span className="text text_color_invert summary-head__label">Degree
                                    </span>
                                    <span className="text text_color_invert text_size_s summary-head__summary">
                                        {degree || 'Any'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card__middle-block text-center">
                        <Button
                            disabled={ title === undefined }
                            className="button_type_colored button_pos_center"
                            onClick={(event) => {
                                event.preventDefault();
                                dispatch(startMatching({ _id }));
                            }}
                        >
                            Start Matching
                        </Button>
                    </div>
                    <form className="card__actions-wrapper">
                        <div className="mdl-card__actions mdl-card--border card__actions">
                            <Link to={`/recruiter/jobs/${_id}/edit`} className="link">
                                Edit Description
                            </Link>

                            <div className="mdl-layout-spacer" />
                            <button
                                className="link link_type_additional"
                                onClick={(event) => {
                                    event.preventDefault();
                                    dispatch(deleteJob(_id));
                                }}
                            >
                                Delete Draft
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

DraftsCard.propTypes = propTypes;
DraftsCard.defaultProps = defaultProps;

export default DraftsCard;
