import React, {Component, PropTypes} from 'react'

import ButtonApply from './buttonApply'
import ButtonLink from './buttonLink'

import Bookmark from '../icons/bookmark'
import BookmarkFill from '../icons/BookmarkFill'
import OkIcon from '../icons/ok'
import DeclineIcon from '../icons/Decline'

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
    logo: '',
    title: 'Title',
    location: 'location',
    match: 20,
    salary: 'Salary',
    experience: 'Experience',
    employment: 'Employment',
    degree: '',
    background: '',
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

export default class CardOpen extends Component {

    renderMatchInformation() {
        const { name, logo, title, location, match, salary, experience, employment, background, degree } = this.props
        return (
            <div className="summary-head">
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
                <div className="mdl-card__media summary-head__media">
                    <img className="summary-head__media-inner" src={background}/>
                </div>
            </div>
        )
    }

    renderBookmarks() {
        const { bookmark, addToBookmark, removeOfBookmark } = this.props

        if(bookmark) {
            return (
                <a onClick={removeOfBookmark} className="button button_type_icons">
                    <BookmarkFill/>
                </a>
            )
        } else {
            return (
                <a onClick={addToBookmark} className="button button_type_icons">
                    <Bookmark/>
                </a>
            )
        }
    }

    render() {
        const { children, additionElements, onClickClose } = this.props
        return (
            <div className="slider__item slider__item_active">
                <a class="button button_type_close" onClick={onClickClose}>×</a>
                <div className="scroll-container">
                    <div className="scroll-container__inner">
                        <div className="mdl-card card card_state_open card_state_scroll">
                            {this.renderMatchInformation()}
                            <div className="card__middle-block">
                                <div className="row">
                                    <div className="col-lg-9">
                                        {children}
                                    </div>
                                </div>
                            </div>
                            <form className="card__actions-wrapper">

                                <div className="mdl-card__actions card__actions">
                                    <ButtonApply icon={<OkIcon className="icon_inline invisible-tablet"/>}>
                                        Apply
                                    </ButtonApply>
                                    <ButtonLink icon={<DeclineIcon className="icon_inline invisible-tablet"/>}>
                                        Not interested
                                    </ButtonLink>
                                    <div className="mdl-layout-spacer"/>
                                    {this.renderBookmarks()}
                                </div>
                            </form>
                        </div>
                        {additionElements}
                    </div>
                </div>

            </div>
        )
    }
}

CardOpen.propTypes = propTypes;
CardOpen.defaultProps = defaultProps;