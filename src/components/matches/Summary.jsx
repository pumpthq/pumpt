import React, {Component, PropTypes} from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router'
import { postBookmark, postReject, postApprove, viewVacancy } from '../../actions/candidateMatches'

import { BookmarkOpen, BookmarkFill, Decline, ApproveOpen, ApproveFill } from 'components/icons'
import { tintedBackground } from 'components/helpers'

import './card.less'


const propTypes = {};

const defaultProps = {
    company: {
        brief: {
            name: '{name}',
            logo: 'https://placeholdit.imgix.net/~text?txtsize=9&txt=50x50&w=50&h=50',
            background: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150',
        }
    },
    vacancy: {
        brief: {
            title: '{title}',
            state: '{state}',
            salary: '{salary}',
            experience: '{experience}',
            employment: '{employment}',
            description: '{description}',
        }
    },
    status: {
        bookmarked: false,
        approved: false,
    },
    score: '{score}',
    backgroundTint: [50,50,50,.75],
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
    viewVacancy: () => {
      dispatch(viewVacancy(ownProps._company, ownProps._vacancy))
    }

  }
}

@connect(undefined, mapDispatchToProps)
export default class Summary extends Component {

    componentWillMount() {}

    renderMatchInformation() {
        const { score, company, vacancy, backgroundTint } = this.props
        return (
            <div className="summary-head" style={ tintedBackground(company.brief.background,...backgroundTint) } >
                <div className="summary-head__title mdl-card__title">
                    <div className="summary-head__title-item">
                        <div className="summary-head__title-column">
                            <img className="image image_round image_size_xxl image_type_company-logo" src={company.brief.logo}/>
                            <div className="summary-head__title-block">
                                <h2 className="mdl-card__title-text heading heading_color_invert heading_type_two">
                                    {company.brief.name}
                                </h2>
                                <span className="mdl-card__subtitle-text summary-head__subtitle-text text text_color_invert">
                                    {vacancy.brief.title}<br/>
                                    {vacancy.brief.state}
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
                            <span  className="text text_color_invert text_size_s summary-head__summary">{vacancy.brief.experience}</span>
                        </div>
                        <div className="summary-head__title-column">
                            <span  className="text text_color_invert summary-head__label">Employment </span>
                            <span  className="text text_color_invert text_size_s summary-head__summary">{vacancy.brief.employment}</span>
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
        const { vacancy } = this.props
        return (
            <div className="card__middle-block">
                <p className="mdl-card__supporting-text card__supporting-text">{vacancy.brief.description}</p>
            </div>
        );
    }
    renderBookmarks() {
        const { candidate: { status }, addToBookmark } = this.props;

        if (status.bookmarked === null && status.approved === null) {
            return (
                <a onClick={addToBookmark} className="button button_type_icons col-xs-12">
                    <BookmarkOpen /> BOOKMARK
                </a>
            )
        }
    }
    renderApproveReject() {
        const { candidate: { status }, postReject, postApprove } = this.props;

        if (status.approved === null) {
            return (
                <div>
                    <a onClick={postApprove} className="mdl_button button col-xs-12">
                        <ApproveOpen /> APPROVE</a>
                    <a onClick={postReject} className="mdl_button button col-xs-12">
                        <Decline /> REJECT</a>
                </div>
            );
        }
    }
    render() {
        const { viewVacancy, _vacancy, _company } = this.props;
        return (
            <div className="slider__item">
                <div className="mdl-card card">
                    {this.renderMatchInformation()}
                    {this.renderShortContent()}
                    <form className="card__actions-wrapper">
                        <div className="mdl-card__actions card__actions">
                            {/* <div className="mdl-layout-spacer" /> */}
                            <div>
                                <Link className="link" to={`candidate/matches/company/${_company}/vacancy/${_vacancy}`}>
                                    View Full Description
                                </Link>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Summary.propTypes = propTypes;
Summary.defaultProps = defaultProps;
