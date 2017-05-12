import React, {Component, PropTypes} from 'react'

import { connect } from 'react-redux'

import { postBookmark, postReject, postApprove, hideFullDescription } from '../../actions/candidateMatches'

import ButtonApply from './buttonApply'
import ButtonLink from './buttonLink'

import Bookmark from '../icons/bookmark'
import BookmarkFill from '../icons/BookmarkFill'
import OkIcon from '../icons/ok'
import DeclineIcon from '../icons/Decline'

import CompanyLinkCard from './cardGlassdor'

import { tintedBackground } from 'components/helpers'

import { browserHistory } from 'react-router'

const propTypes = {
    name: PropTypes.string,
    logo: PropTypes.string,
    title: PropTypes.string,
    location: PropTypes.string,
    match: PropTypes.number,
    salary: PropTypes.string,
    experience: PropTypes.string,
    employment: PropTypes.string,
    degree: PropTypes.string,
    background: PropTypes.string,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ]),
    additionElements: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.array
    ]),
    onClick: PropTypes.func,
    onClickForLink: PropTypes.func,
    onClickClose: PropTypes.func,
    bookmark: PropTypes.bool,
    addToBookmark: PropTypes.func,
    removeOfBookmark: PropTypes.func
};

const defaultProps = {
    name: 'Name',
    logo: '//superrepo.org/static/images/icons/original/xplugin.video.nytimes.png.pagespeed.ic.XOPQITkLio.png',
    title: 'Title',
    location: 'location',
    match: 20,
    salary: 'Salary',
    experience: 'Experience',
    employment: 'Employment',
    degree: '',
    background: '//wallpaper.sc/en/ipad/wp-content/uploads/2014/10/ipad-2048x2048-thumbnail_01022-256x256.jpg',
    backgroundTint: [50,50,50,.75],
    text: '',
    children: '',
    additionElements: '',
    onClick: e=>{},
    onClickForLink: e=>{},
    onClickClose: e=>{},
    bookmark: false,
    addToBookmark: PropTypes.func,
    removeOfBookmark: PropTypes.func
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addToBookmark: () => {
      dispatch(postBookmark(ownProps.id))
    },
    postReject: () => {
      dispatch(postReject(ownProps.id))
  },
    postApprove: () => {
      dispatch(postApprove(ownProps.id))
  },
    hideFullDescription: () => {
      dispatch(hideFullDescription(ownProps.id))
    }

  }
}


@connect(undefined, mapDispatchToProps)
export default class CardOpen extends Component {

    renderMatchInformation() {
        const { name, logo, title, location, match, salary, experience, employment, background, backgroundTint, degree } = this.props
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
                                    {location}
                                </span>
                            </div>
                        </div>
                        <div className="summary-head__title-column text-right">
                            <div
                                className="mdl-card__subtitle-text summary-head__subtitle-text text text_color_invert">
                                <span className="summary-head__subtitle-head">{match}%</span>
                                <span>match</span></div>
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
        const { text } = this.props
        return (
            <div className="card__middle-block">
                <span className="text  summary-head__label">Description</span>

                {text}
            </div>
        );
    }

    renderResponsibilities() {
        const { responsibilities } = this.props
        return (
            <div className="card__middle-block">
                <span className="text  summary-head__label">Responsibilities</span>

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

                { requirements && requirements.map( (item, key) => {
                    return (
                        <p key={key} className="mdl-card__supporting-text card__supporting-text">{item}</p>
                    );

                    })
                }
            </div>
        );
    }



    renderBookmarks() {
        const { status, addToBookmark } = this.props


        if (status.bookmarked === undefined && status.approved === undefined) {
            return (
                <a onClick={addToBookmark} className="button button_type_icons">
                    <Bookmark/>
                </a>
            )
        }
    }

    render() {
        const { children, additionElements, postReject, postApprove, hideFullDescription } = this.props
        return (

            <div className="slider__item slider__item_active">
                <a class="button button_type_close" onClick={browserHistory.goBack}>×</a>
                <div className="scroll-container">
                    <div className="scroll-container__inner">
                        <div className="mdl-card card card_state_open card_state_scroll">
                            {this.renderMatchInformation()}
                            {this.renderLongContent()}
                            {this.renderResponsibilities()}

                            {this.renderRequirements()}
                            <div className="card__middle-block">
                                <div className="row">
                                    <div className="col-lg-9">
                                        {children}
                                    </div>
                                </div>
                            </div>
                            <form className="card__actions-wrapper">

                                <div className="mdl-card__actions card__actions">
                                    <ButtonApply onClick={postApprove} icon={<OkIcon className="icon_inline invisible-tablet"/>}>
                                        Apply
                                    </ButtonApply>
                                    <ButtonLink onClick={postReject} icon={<DeclineIcon className="icon_inline invisible-tablet"/>}>
                                        Not interested
                                    </ButtonLink>
                                    <div className="mdl-layout-spacer"/>
                                    {this.renderBookmarks()}
                                </div>
                            </form>
                        </div>
                        {additionElements}


                        <CompanyLinkCard {...this.props}/>

                    </div>
                </div>

            </div>
        )
    }
}

CardOpen.propTypes = propTypes;
CardOpen.defaultProps = defaultProps;
