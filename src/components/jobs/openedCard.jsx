import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { closeJob } from './../../actions/companyJobs';
import { Link } from 'react-router'

import { apiImage, displayIndustries } from 'components/helpers'

const propTypes = {
    title: PropTypes.string,
    state: PropTypes.string,
    salary: PropTypes.string,
    experience: PropTypes.string,
    employment: PropTypes.string,
    degree: PropTypes.string,
    industries: PropTypes.array,
    _id: PropTypes.string,
};

const defaultProps = {
    _id: '{_id}',
    title: '{title}',
    salary: '{salary}',
    state: '{state}',
    experience: '{experience}',
    employment: '{employment}',
    degree: '{degree}',
    industries: '{industries}',
    candidates: {
        briefs: []
    },
		matches: []
};

@connect(
    (dispatch) => ({ dispatch })
)
class Card extends Component {
    render() {
        const {
            title,
            location,
            salary,
            experience,
            employment,
            degree,
            industries,
            candidates,
            dispatch,
						matches,
            _id,
        } = this.props;
        return (
            <div className="slider__item slider__item_content_middle">
                <div className="mdl-card card card_size_s">
                    <div className="summary-head summary-head_rad-top" style={{ backgroundColor: '#4f68ac' }}>
                        <div className="summary-head__title mdl-card__title">
                            <div className="summary-head__title-item">
                                <div className="summary-head__title-column">
                                    <div className="summary-head__title-block">
                                        <h2 className="mdl-card__title-text heading heading_color_invert heading_type_two">
                                            {title}
                                        </h2>
                                        <span className="mdl-card__subtitle-text summary-head__subtitle-text text text_color_invert text_size_xs">
                                            {location ? location : ""}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-head__title-item summary-head__title-item_type_vertical ">
                                <div className="summary-head__title-column ">
                                    <span className="text text_color_invert summary-head__label">Focus
                                    </span>
                                    <span className="text text_color_invert text_size_s summary-head__summary">{industries && Array.isArray(industries) ? industries[0].parent : ''}</span>
                                </div>
                                <div className="summary-head__title-column ">
                                    <span className="text text_color_invert summary-head__label">Salary
                                    </span>
                                    <span className="text text_color_invert text_size_s summary-head__summary">{salary}</span>
                                </div>
                                <div className="summary-head__title-column ">
                                    <span className="text text_color_invert summary-head__label">Experience
                                    </span>
                                    <span className="text text_color_invert text_size_s summary-head__summary">{experience}</span>
                                </div>
                                <div className="summary-head__title-column ">
                                    <span className="text text_color_invert summary-head__label">Employment
                                    </span>
                                    <span className="text text_color_invert text_size_s summary-head__summary">{employment}</span>
                                </div>
                                <div className="summary-head__title-column ">
                                    <span className="text text_color_invert summary-head__label">Degree
                                    </span>
                                    <span className="text text_color_invert text_size_s summary-head__summary">{degree}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card__middle-block">
                        <div className="row">
                            <div className="col-xs-6 no-right-gutter">
                                <Link className="link" to={`recruiter/jobs/${_id}/candidates`}>
                                    View Matches
                                </Link>
                            </div>
                            <div className="col-xs-6">
                                <div className="text-right">
                                    {candidates.briefs.map(candidate =>
                                        <img className="image image_size_m image_round" src={apiImage(candidate.avatar)} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <form className="card__actions-wrapper">
                        <div className="mdl-card__actions mdl-card--border card__actions">
                            <Link className="link link_type_spaced" to={`recruiter/jobs/${_id}/show`}>
                                View Job
                            </Link>
														|
                            <Link to={`/recruiter/jobs/${_id}/edit`} className="link link_type_spaced">
                                Edit Job
                            </Link>

                            <div className="mdl-layout-spacer" />
                            <button
                                className="link link_type_additional"
                                onClick={(event) => {
                                    event.preventDefault();
                                    dispatch(closeJob(_id));
                                }}
                            >
                            Close Job
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
