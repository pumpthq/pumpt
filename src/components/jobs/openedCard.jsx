import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {closeJob} from './../../actions/companyJobs';
import {Link} from 'react-router'
import BasicDialog from 'components/main/popup/BasicDialog'
import Truncate from 'react-truncate';
import FlatButton from 'material-ui/FlatButton';

import {apiImage} from 'components/helpers'

const propTypes = {
    title: PropTypes.string,
    state: PropTypes.string,
    salary: PropTypes.string,
    experience: PropTypes.string,
    employment: PropTypes.string,
    degree: PropTypes.string,
    industries: PropTypes.array,
    _id: PropTypes.string,
};

const defaultProps = {
    _id: '{_id}',
    title: '{title}',
    salary: '{salary}',
    state: '{state}',
    experience: '{experience}',
    employment: '{employment}',
    degree: '{degree}',
    industries: '{industries}',
    candidates: {
        briefs: []
    },
		matches: []
};

const SummaryEntry = ({children}) => (
<span className="text text_color_invert text_size_s summary-head__summary">
  <Truncate lines={1}>
    {children}
  </Truncate>
</span>
)

@connect(
  (dispatch) => ({ dispatch })
)
class Card extends Component {
constructor(props) {
  super(props);
  this.state = {triggerDialog: false};
}

handleClose = (event) => {
  event.preventDefault();
  this.setState(({triggerDialog}) => ({triggerDialog: !triggerDialog}));
}

  render() {
    const {
          company,
          title,
          location,
          salary,
          experience,
          employment,
          degree,
          industries,
          candidates,
          dispatch,
          matches,
          _id,
    } = this.props;
    return (
      <div className="slider__item slider__item_content_middle">
        <div className="mdl-card card card_size_s">
          <div className="summary-head row py-3">
            {company && company.brief && company.brief.logo ?
                <div className="col-3">
                  <img className="image image_round image_size_xl image_type_company-logo" src={apiImage(company.brief.logo)}/>
                </div>
                : ''}
                <div className={`col-${company && company.brief && company.brief.logo ? 9 : 12} text-left`}>
                  <h2 className="job_title">{title || 'Untitled'}</h2>
                  <small>{location ? location.slice(0,location.lastIndexOf(',')) : 'Location not specified'}</small>
                </div>
              </div>
              <div className="card__middle-block pt-2">
                <dl className="row small">
                  <dt className="col-6">Working Areas</dt>
                  <dd className="col-6 pb-3">
                    {industries && Array.isArray(industries) ? industries[0].parent : ''}
              </dd>
              <dt className="col-6">Total Compensation</dt>
              <dd className="col-6 pb-3">{salary}</dd>
              <dt className="col-6">Years Experience</dt>
              <dd className="col-6 pb-3">{experience}</dd>
              <dt className="col-6">Employment Type</dt>
              <dd className="col-6 pb-3">{ Array.isArray(employment) ? employment.join(', ') : 'Any' }</dd>
              <dt className="col-6">Educational Degree</dt>
              <dd className="col-6 pb-3">{degree}</dd>
            </dl>
            <Link className="link row" to={`recruiter/jobs/${_id}/candidates`}>
              <button className="button_type_colored button_size_l m-auto">
                View Matches
              </button>
            </Link>
            <div className="row pt-4 small">
              <div className="col-12">
                <Link
                  className="link divided_pipe"
                  to={`recruiter/jobs/${_id}/show`}
                >
                  View Job
                </Link>
                <Link
                  to={`/recruiter/jobs/${_id}/edit`}
                  className="link divided_pipe"
                >
                  Edit Job
                </Link>
                <span
                  className="link divided_pipe"
                >
                  <button
                    className="link px-0"
                    onClick={this.handleClose}
                  >
                    Close Job
                  </button>
                </span>
                <BasicDialog
                  trigger={this.state.triggerDialog}
                  closeText={"Nevermind"}
                  onClose={() => {}}
                  mainAction={
                    <FlatButton
                      primary
                      onTouchTap={() => {
                        dispatch(closeJob(_id))
                      }}
                      label="Close Job"
                    />
                  }
                >
                  Are you sure you want to close the job?
                </BasicDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
