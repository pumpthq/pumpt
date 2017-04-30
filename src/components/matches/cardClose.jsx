import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'

import { postBookmark, postReject, postApprove, showFullDescription } from '../../actions/candidateMatches'

import Bookmark from '../icons/bookmark'
import Decline from '../icons/Decline'
import Approve from '../icons/heart'

import BookmarkFill from '../icons/BookmarkFill'

import { tintedBackground } from './helper'

import './card.less'


const propTypes = {
    name: PropTypes.string,
    logo: PropTypes.string,
    title: PropTypes.string,
    location: PropTypes.string,
    match: PropTypes.number,
    salary: PropTypes.string,
    experience: PropTypes.string,
    employment: PropTypes.string,
    background: PropTypes.string,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    onClick: PropTypes.func,
    onClickForLink: PropTypes.func,
    bookmark: PropTypes.bool,
    addToBookmark: PropTypes.func,
    removeOfBookmark: PropTypes.func,
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
    background: '//wallpaper.sc/en/ipad/wp-content/uploads/2014/10/ipad-2048x2048-thumbnail_01022-256x256.jpg',
    backgroundTint: [50,50,50,.75],
    text: 'This will contain the job description',
    onClick: e=> {},
    onClickForLink: e=> {},
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
    showFullDescription: () => {
      dispatch(showFullDescription(ownProps.id))
    }

  }
}

@connect(undefined, mapDispatchToProps)
export default class cardClose extends Component {

    componentWillMount() {}

    renderMatchInformation() {
        const { name, logo, title, location, match, salary, experience, employment, background, backgroundTint } = this.props;
        return (
            <div className="summary-head" style={ tintedBackground(background,...backgroundTint) } >
                <div className="summary-head__title mdl-card__title">
                    <div className="summary-head__title-item">
                        <div className="summary-head__title-column">
                            <img className="image image_round image_size_xxl image_type_company-logo" src={logo}/>
                            <div className="summary-head__title-block">
                                <h2 className="mdl-card__title-text heading heading_color_invert heading_type_two">
                                    {name}
                                </h2>
                                <span className="mdl-card__subtitle-text summary-head__subtitle-text text text_color_invert">
                                    {title}<br/>
                                    {location}
                                </span>
                            </div>
                        </div>
                        {/* <div className="summary-head__title-column text-right">
                            <div

                                className="mdl-card__subtitle-text summary-head__subtitle-text text text_color_invert">
                                <span  className="summary-head__subtitle-head">{match}%</span>
                                <span >match</span></div>
                        </div> */}
                    </div>
                    <div className="summary-head__title-item">
                        {/* <div className="summary-head__title-column">
                            <span  className="text text_color_invert summary-head__label">Salary </span>
                            <span  className="text text_color_invert text_size_s summary-head__summary">{salary}</span>
                        </div> */}
                        <div className="summary-head__title-column">
                            <span  className="text text_color_invert summary-head__label">Industry Experience </span>
                            <span  className="text text_color_invert text_size_s summary-head__summary">{experience}</span>
                        </div>
                        <div className="summary-head__title-column">
                            <span  className="text text_color_invert summary-head__label">Employment </span>
                            <span  className="text text_color_invert text_size_s summary-head__summary">{employment}</span>
                        </div>
                    </div>
                </div>
                {/* <div className="mdl-card__media summary-head__media">
                    <img className="summary-head__media-inner" src={background}/>
                </div> */}
            </div>
        )
    }

    renderShortContent() {
        const { text } = this.props
        let content;

        if (typeof text === 'object') {
            content = text.map( (paragraph, key) => {
                return (
                    <p key={key} className="mdl-card__supporting-text card__supporting-text">{paragraph}</p>
                );
            });
        } else {
            content = <p className="mdl-card__supporting-text card__supporting-text">{text}</p>;
        }
        return (
            <div className="card__middle-block">
                {content}
            </div>
        );
    }
    renderBookmarks() {
        const { status, addToBookmark } = this.props;

        if (status.bookmarked === undefined && status.approved === undefined) {
            return (
                <a onClick={addToBookmark} className="button button_type_icons col-xs-12">
                    <Bookmark /> BOOKMARK
                </a>
            )
        }
    }
    renderApproveReject() {
        const { status, postReject, postApprove } = this.props;

        if (status.approved === undefined) {
            return (
                <div>
                    <a onClick={postApprove} className="mdl_button button col-xs-12">
                        <Approve /> APPROVE</a>
                    <a onClick={postReject} className="mdl_button button col-xs-12">
                        <Decline /> REJECT</a>
                </div>
            );
        }
    }
    render() {
        const { showFullDescription } = this.props;
        return (
            <div className="slider__item">
                <div className="mdl-card card">
                    {this.renderMatchInformation()}
                    {/* {this.renderShortContent()} */}
                    <form className="card__actions-wrapper">
                        <div className="mdl-card__actions card__actions">
                            {/* <div className="mdl-layout-spacer" /> */}
                            <div className="col-xs-6">
                                {this.renderApproveReject()}
                                {this.renderBookmarks()}
                            </div>
                            <div className="col-xs-6">
                                <a className="link" onClick={showFullDescription}>View Full Description</a>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

cardClose.propTypes = propTypes;
cardClose.defaultProps = defaultProps;
