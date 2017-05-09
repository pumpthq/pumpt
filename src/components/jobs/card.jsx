import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { closeJob } from './../../actions/companyJobs';

const propTypes = {
    title: PropTypes.string,
    state: PropTypes.string,
    salary: PropTypes.string,
    experience: PropTypes.string,
    employment: PropTypes.string,
    degree: PropTypes.string,
    matches: PropTypes.string,
    industry: PropTypes.string,
    id: PropTypes.string,
};

const defaultProps = {
    salary: '',
    experience: '',
    employment: '',
    degree: '',
    matches: '',
    industry: '',
};

@connect(
    (dispatch) => ({ dispatch })
)
class Card extends Component {
    render() {
        const {
            title,
            state,
            salary,
            experience,
            employment,
            degree,
            matches,
            industry,
            dispatch,
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
                                            {state}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-head__title-item summary-head__title-item_type_vertical ">
                                <div className="summary-head__title-column ">
                                    <span className="text text_color_invert summary-head__label">Focus
                                    </span>
                                    <span className="text text_color_invert text_size_s summary-head__summary">{industry}</span>
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
                            <div className="col-lg-5 no-right-gutter">
                                <a className="link link_size_s" href="">{matches} Matches</a>
                                <p className="text text_color_l-grey">67–98% match</p>
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
                            <a className="link" href="">View Job Description</a>
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
