import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import {H2} from './../main/heading';
import Button from './../main/button';
import {deleteJob, openJob} from './../../actions/companyJobs';
import BasicDialog from 'components/main/popup/BasicDialog'
import FlatButton from 'material-ui/FlatButton';

import {apiImage} from 'components/helpers'

const propTypes = {
    title: PropTypes.string,
    state: PropTypes.string,
    salary: PropTypes.string,
    experience: PropTypes.string,
    employment: PropTypes.string,
    degree: PropTypes.string,
    matches: PropTypes.string,
    _id: PropTypes.string,
    dispatch: PropTypes.func,
};

const defaultProps = {
    title: '',
    state: '',
    salary: '',
    experience: '',
    employment: '',
    degree: '',
};

@connect(
    (dispatch) => ({dispatch})
)
class DraftsCard extends Component {

  constructor(props) {
    super(props);
    this.state = {triggerDialog: false};
  }

  handleDelete = (event) => {
    event.preventDefault();
    this.setState(({triggerDialog}) => ({triggerDialog: !triggerDialog}));
  }
    render() {
      const {
            company,
            title,
            state,
            salary,
            experience,
            employment,
            degree,
            industries,
            _id,
            dispatch,
						location,
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
                  <h2 className="job_title">{title || 'Untitled'} [Draft]</h2>
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
                  <dd className="col-6 pb-3">{salary || 'Not specified'}</dd>
                  <dt className="col-6">Experience</dt>
                  <dd className="col-6 pb-3">{experience || 'Any'}</dd>
                  <dt className="col-6">Employment Type</dt>
                  <dd className="col-6 pb-3">{employment || 'Any'}</dd>
                  <dt className="col-6">Educational Degree</dt>
                  <dd className="col-6 pb-3">{degree || 'Any'}</dd>
                </dl>
                <Link className="link row" to={`recruiter/jobs/${_id}/candidates`}>
                  <button
                    className="button_type_colored button_size_l m-auto"
                    disabled={title === undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      dispatch(openJob(_id));
                    }}
                  >
                    Publish Job
                  </button>
                </Link>
                <div className="row pt-4 small">
                  <div className="col-12">
                    <Link
                      to={`/recruiter/jobs/${_id}/edit`}
                      className="link divided_pipe"
                    >
                      Edit Description
                    </Link>
                    <button
                      className="link divided_pipe"
                      onClick={this.handleDelete}
                    >
                      Delete Draft
                    </button>
                    <BasicDialog
                      trigger={this.state.triggerDialog}
                      closeText={"Nevermind"}
                      onClose={() => {}}
                      mainAction={
                        <FlatButton
                          primary
                          onTouchTap={() => {
                            dispatch(deleteJob(_id));
                          }}
                          label="Delete Draft"
                        />
                      }
                    >
                      Are you sure you want to delete the draft?
                    </BasicDialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

DraftsCard.propTypes = propTypes;
DraftsCard.defaultProps = defaultProps;

export default DraftsCard;
