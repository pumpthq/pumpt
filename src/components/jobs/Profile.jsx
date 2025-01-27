import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postApprove, postBookmark, postReject} from '../../actions/candidateMatches'
import {apiImage, displayIndustries, tintedBackground} from 'components/helpers'
import {browserHistory} from 'react-router'

const buttonStyle = {
    cursor: 'pointer',
};

const defaultProps = {
    company: {
        name: '{companyName}',
    },
    title: '{title}',
    state: '{location}',
    backgroundTint: [50,50,50,.75],
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

  renderResponsibilities() {
    const { responsibilities } = this.props
    return responsibilities && responsibilities.length > 0 ? (
      <div>
        <dt>Responsibilities</dt>
        <dd>{ responsibilities.map( (item, key) => {
          return <p key={key}>{item}</p>
        })}</dd>
    </div>
    ) : '';
  }

  renderRequirements() {
    const { requirements } = this.props
    return requirements && requirements.length > 0 ? (
      <div>
        <dt>Requirements</dt>
        <dd>{ requirements && requirements.map( (item, key) => {
          return <p key={key}>{item}</p>
        })}</dd>
    </div>
    ) : '';
  }

  renderMatchInformation() {
    const { company, title, location, salary, industries, experience, employment, backgroundTint, degree } = this.props
    const { name, logo, background } = company
    return (
      <div className="summary-head row py-5">
        <div className="col-12">
          <h2>{name}</h2>
        </div>
        <div className="col-auto col-md-3">
          <img className="image image_round image_size_xxl image_type_company-logo m-0" src={apiImage(logo)}/>
        </div>
        <div class="col col-md-6 text-left text-md-center">
          <h2 className="font-weight-normal">{title}</h2>
          {location ? <span>{location.slice(0,location.lastIndexOf(','))}</span> : ''} </div>
      </div>
    )
  }

  renderLongContent() {
    const { description } = this.props
    const { company, title, location, salary, industries, experience, employment, backgroundTint, degree } = this.props
    return (
      <div className="row card-inner">
        <div className="col-12 py-5">
          <div class="mb-4">
            {this.props.children /* action buttons */}
          </div>
          <dl>
            <dt>Working Areas</dt>
            <dd>{displayIndustries(industries)}</dd>
            <dt>Years of Experience</dt>
            <dd>{experience}</dd>
            <dt>Employment Type</dt>
            <dd>{employment}</dd>
            <dt>Educational Degree</dt>
            <dd>{degree}</dd>
            <dt>Total Compensation</dt>
            <dd>{salary}</dd>
            <hr className="my-5" />
            <dt>Description</dt>
            <dd>
              <span className="show-paragraphs"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </dd>
            {this.renderResponsibilities()}
            {this.renderRequirements()}
            <div class="mt-5">
              {this.props.children /* action buttons */}
            </div>
            {company &&
                <div>
                  <hr className="my-5" />
                  <dt>Who we are</dt>
                  <dd>{company.description}</dd>
                  <dt>Headquarters</dt>
                  <dd>{company.headquartersLocation && company.headquartersLocation.slice(0,company.headquartersLocation.lastIndexOf(','))}</dd>
                  <dt>Company Type</dt>
                  <dd>
                    {company.type && company.type.map(function(atype,i) {
                      return <span key="{i}" className="divided_pipe">{atype}</span>
                    })}
                  </dd>
                  <dt>Company Size</dt>
                  <dd>{company.employeesAmount}</dd>
                  <dt>Website</dt>
                  <dd><a href={company.socialMedia && company.socialMedia.websiteUrl} target="_blank">{company.socialMedia && company.socialMedia.websiteUrl}</a></dd>
                  <dt>Founded</dt>
                  <dd>{company.foundDate}</dd>
                </div>
            }
          </dl>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="mdl-card card card_state_open card_state_scroll">
          <button style={buttonStyle} className="button button_type_close" onClick={browserHistory.goBack}>×</button>
          {this.renderMatchInformation()}
          {this.renderLongContent()}
        </div>
      </div>
    )
  }
}

Profile.defaultProps = defaultProps;
