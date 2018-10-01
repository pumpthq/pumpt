import React, {Component} from 'react'
import {find} from 'lodash'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {fetchVacancy, postApprove, postBookmark, postReject} from '../../actions/candidateMatches'

import {ApproveFill, ApproveOpen, BookmarkOpen, Decline} from 'components/icons'
import {apiImage, tintedBackground} from 'components/helpers'


const propTypes = {};

const defaultProps = {
  company: {
    brief: {
      name: '{name}',
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
    dispatch,
  }
}

@connect((state, ownProps) => ({
  vacancy_full: state.candidateMatches.vacancies.find(v => v._id === ownProps._vacancy)
  }),
  mapDispatchToProps)
export default class Summary extends Component {

  componentWillMount() {
        const { dispatch, _vacancy, vacancy_full } = this.props;
        if(!vacancy_full) {
            dispatch(fetchVacancy(_vacancy))
        }
  }

  renderMatchInformation() {
    const { score, company, vacancy, vacancy_full, backgroundTint } = this.props
    return (
      <div className="summary-head row py-3">
        <div className="col-12 pb-2">
          <h2>{company.brief.name}</h2>
          <h3 className="job_status"> &nbsp; {vacancy_full && vacancy_full.status == "opened" ? " \t " : "Closed"}</h3>
      </div>
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

  render() {
    const { _vacancy, _company, _id, vacancy_full } = this.props;
    const disabled = !(vacancy_full && vacancy_full.status == "opened")
    const classes =  disabled ? "slider__item disabled" :  "slider__item" ;
    return (
      <div className={classes}>
        <div className="mdl-card card">
          {this.renderMatchInformation()}
          {this.renderShortContent()}
          <Link className="link m-auto" to={`/candidate/matches/match/${_id}/company/${_company}/vacancy/${_vacancy}`}>
            <button className={`${!disabled ? "button_type_colored" : "button_color_grey"} button_size_l m-auto`}>
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
