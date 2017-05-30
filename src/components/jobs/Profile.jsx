import React, {Component, PropTypes} from 'react'

import { connect } from 'react-redux'

import { postBookmark, postReject, postApprove, hideFullDescription } from '../../actions/candidateMatches'

import ButtonApply from 'components/parts/buttonApply'
import ButtonLink from 'components/parts/buttonLink'

import { ApproveOpen, Decline } from 'components/icons'

import { tintedBackground } from 'components/helpers'

import { browserHistory } from 'react-router'

const propTypes = {
//     name: PropTypes.string,
//     logo: PropTypes.string,
//     title: PropTypes.string,
//     location: PropTypes.string,
//     match: PropTypes.number,
//     salary: PropTypes.string,
//     experience: PropTypes.string,
//     employment: PropTypes.string,
//     degree: PropTypes.string,
//     background: PropTypes.string,
//     text: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.array
//     ]),
//     children: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.element,
//         PropTypes.array
//     ]),
//     additionElements: PropTypes.oneOfType([
//         PropTypes.element,
//         PropTypes.string,
//         PropTypes.array
//     ]),
//     onClick: PropTypes.func,
//     onClickForLink: PropTypes.func,
//     onClickClose: PropTypes.func,
//     bookmark: PropTypes.bool,
//     addToBookmark: PropTypes.func,
//     removeOfBookmark: PropTypes.func
};

const defaultProps = {
    // name: 'Name',
    company: {
        name: '{companyName}',
        logo: 'https://placeholdit.imgix.net/~text?txtsize=9&txt=50x50&w=50&h=50',
        background: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150',
    },
    title: '{title}',
    state: '{location}',
    // match: 20,
    // salary: 'Salary',
    // experience: 'Experience',
    // employment: 'Employment',
    // degree: '',
    // background: '//wallpaper.sc/en/ipad/wp-content/uploads/2014/10/ipad-2048x2048-thumbnail_01022-256x256.jpg',
    backgroundTint: [50,50,50,.75],
    // text: '',
    // children: '',
    // additionElements: '',
    // onClick: e=>{},
    // onClickForLink: e=>{},
    // onClickClose: e=>{},
    // bookmark: false,
    // addToBookmark: PropTypes.func,
    // removeOfBookmark: PropTypes.func,
    status: {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addToBookmark: () => {
        dispatch(postBookmark(ownProps._id))
    },
    postReject: () => {
        dispatch(postReject(ownProps._id))
    },
    postApprove: () => {
        dispatch(postApprove(ownProps._id))
    },
  }
}


@connect(undefined, mapDispatchToProps)
export default class Profile extends Component {

    renderMatchInformation() {
        const { company, title, state, salary, experience, employment, backgroundTint, degree } = this.props
        const { name, logo, background } = company
        return (
            <div className="summary-head" style={ tintedBackground(background,...backgroundTint) }>
                <div className="summary-head__title mdl-card__title">
                    <div className="summary-head__title-item">
                        <div className="summary-head__title-column">
                            <img className="image image_round image_size_xxl image_type_company-logo" src={logo}/>
                            <div className="summary-head__title-block">
                                <h2 className="mdl-card__title-text heading heading_color_invert heading_type_two">
                                    {name}
                                </h2>
                                <span
                                    className="mdl-card__subtitle-text summary-head__subtitle-text text text_color_invert">
                                    {title}<br/>
                                    {state}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="summary-head__title-item">
                        <div className="summary-head__title-column">
                            <span className="text text_color_invert summary-head__label">Salary </span>
                            <span className="text text_color_invert text_size_s summary-head__summary">{salary}</span>
                        </div>
                        <div className="summary-head__title-column">
                            <span className="text text_color_invert summary-head__label">Industry Experience </span>
                            <span className="text text_color_invert text_size_s summary-head__summary">{experience}</span>
                        </div>
                        <div className="summary-head__title-column">
                            <span className="text text_color_invert summary-head__label">Employment </span>
                            <span className="text text_color_invert text_size_s summary-head__summary">{employment}</span>
                        </div>
                        <div className="summary-head__title-column">
                            <span className="text text_color_invert summary-head__label">Degree </span>
                            <span className="text text_color_invert text_size_s summary-head__summary">{degree}</span>
                        </div>
                    </div>
                </div>
                {/* <div className="mdl-card__media summary-head__media">
                    <img className="summary-head__media-inner" src={background}/>
                </div> */}
            </div>
        )
    }

    renderLongContent() {
        const { description } = this.props
        return (
            <div className="card__middle-block">
                <span className="text  summary-head__label">Description</span>

                {description}
            </div>
        );
    }

    renderResponsibilities() {
        const { responsibilities } = this.props
        return (
            <div className="card__middle-block">
                <span className="text  summary-head__label">Responsibilities</span>

                {/* { responsibilities } */}
                { responsibilities && responsibilities.map( (item, key) => {
                    return (
                        <p key={key} className="mdl-card__supporting-text card__supporting-text">{item}</p>
                    );

                    })
                }
            </div>
        );
    }

    renderRequirements() {
        const { requirements } = this.props
        return (
            <div className="card__middle-block">
                <span className="text  summary-head__label">Requirements</span>

                {/* { requirements } */}
                { requirements && requirements.map( (item, key) => {
                    return (
                        <p key={key} className="mdl-card__supporting-text card__supporting-text">{item}</p>
                    );

                    })
                }
            </div>
        );
    }

    render() {
        const { children } = this.props
        return (
                    <div>
                        <div className="mdl-card card card_state_open card_state_scroll">
                            <a class="button_type_close" onClick={browserHistory.goBack}>×</a>

                            {this.renderMatchInformation()}
                            {this.renderLongContent()}
                            {this.renderResponsibilities()}

                            {this.renderRequirements()}

                            {children}
                        </div>
                    </div>
        )
    }
}

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;
