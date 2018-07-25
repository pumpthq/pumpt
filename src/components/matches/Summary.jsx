import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {postApprove, postBookmark, postReject} from '../../actions/candidateMatches'

import {ApproveFill, ApproveOpen, BookmarkOpen, Decline} from 'components/icons'
import {apiImage, tintedBackground} from 'components/helpers'


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
      education: '{education}',
    }
  },
  score: '{score}',
  backgroundTint: [50,50,50,.75],
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
export default class Summary extends Component {

  componentWillMount() {}

  renderMatchInformation() {
    const { score, company, vacancy, backgroundTint } = this.props
    return (
      <div className="summary-head row py-3">
        <div className="col-12 pb-2"><h2>{company.brief.name}</h2></div>
        <div className="col-3">
          <img className="image image_round image_size_xl image_type_company-logo" src={apiImage(company.brief.logo)}/>
        </div>
        <div className="col-9 text-left">
          <h2 className="job_title font-weight-normal mb-1">{vacancy.brief.title}</h2>
          {vacancy.brief.location ? vacancy.brief.location.slice(0,vacancy.brief.location.lastIndexOf(',')) : ""}
        </div>
        {/*
              {vacancy.brief.state}
              {vacancy.brief.experience}
              {vacancy.brief.employment}
              */}
            </div>
    )
  }

  renderShortContent() {
    const { vacancy } = this.props
    return (
      <div className="card__middle-block py-4">
        <dl>
          <dt>Working Areas</dt>
          <dd>
            {vacancy.brief.industries.map(function(industry,i) {
              return <span key="{i}" className="divided_pipe">{industry.value}</span>
            })}
          </dd>
          <dt>Years of Experience</dt>
          <dd>{vacancy.brief.experience}</dd>
          <dt>Employment Type</dt>
          <dd>{vacancy.brief.employment}</dd>
          <dt>Educational Degree</dt>
          <dd>{vacancy.brief.degree}</dd>
        </dl>
      </div>
    );
  }
  renderBookmarks() {
    const { candidate: { status }, addToBookmark } = this.props;

    if (status === "new") {
      return (
        <a onClick={addToBookmark} className="button button_type_icons col-xs-12">
          <BookmarkOpen /> BOOKMARK
        </a>
      )
    }
  }
  renderApproveReject() {
    const { candidate: { status }, postReject, postApprove } = this.props;

    if (status === "new" || status === "bookmarked") {
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
    const { _vacancy, _company, _id } = this.props;
    return (
      <div className="slider__item">
        <div className="mdl-card card">
          {this.renderMatchInformation()}
          {this.renderShortContent()}
          <Link className="link m-auto" to={`candidate/matches/match/${_id}/company/${_company}/vacancy/${_vacancy}`}>
            <button className="button_type_colored button_size_l m-auto">
              View Full Description
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Summary.propTypes = propTypes;
Summary.defaultProps = defaultProps;
