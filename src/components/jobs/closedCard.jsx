import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router'
const propTypes = {
    title: PropTypes.string,
    state: PropTypes.string,
    salary: PropTypes.string,
    experience: PropTypes.string,
    employment: PropTypes.string,
    degree: PropTypes.string,
    matches: PropTypes.string,
};

const defaultProps = {
    salary: '',
    experience: '',
    employment: '',
    degree: '',
    matches: '',
};

class ClosedCard extends Component {
    render() {
        const {
            _id,
            title,
            state,
            salary,
            experience,
            employment,
            degree,
            matches,
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
                                            {state}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-head__title-item summary-head__title-item_type_vertical ">
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
                            <div className="col-lg-5 no-right-gutter">
                                <p className="link link_size_s">{matches} Matches</p>
                            </div>
                            <div className="col-lg-7">
                                <div className="image__hor-list text-right">
                                    <img className="image image_size_m image_round" src="" />
                                    <img className="image image_size_m image_round" src="" />
                                    <img className="image image_size_m image_round" src="" />
                                    <img className="image image_size_m image_round" src="" />
                                    <img className="image image_size_m image_round" src="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <form className="card__actions-wrapper">
                        <div className="mdl-card__actions mdl-card--border card__actions">
                            <Link className="link" to={`recruiter/jobs/${_id}/show`}>
                                View Job Description
                            </Link>

                            <div className="mdl-layout-spacer" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

ClosedCard.propTypes = propTypes;
ClosedCard.defaultProps = defaultProps;

export default ClosedCard;
