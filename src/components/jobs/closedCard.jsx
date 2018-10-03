import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

import {apiImage} from 'components/helpers'

const propTypes = {
    title: PropTypes.string,
    state: PropTypes.string,
    salary: PropTypes.string,
    experience: PropTypes.string,
    employment: PropTypes.string,
    degree: PropTypes.string,
    matches: PropTypes.string,
};

const defaultProps = {
    salary: '',
    experience: '',
    employment: '',
    degree: '',
    matches: '',
};

class ClosedCard extends Component {
    render() {
      const {
            company,
            _id,
            title,
            state,
            salary,
						location,
            experience,
            employment,
            degree,
            industries,
            matches,
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
									<div className="row">
										{location ?
											location.map(loc =>
												<div className="col-12 job_location">
													<small>{loc.match(/[^,]+,[^,]+/g)}</small>
												</div>
											)
											:
											<div className="col-12">
												<small>'Location not specified'</small>
											</div>
										}
									</div>
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
                  <dd className="col-6 pb-3">{ Array.isArray(employment) ? employment.join(', ') : 'Any' }</dd>
                  <dt className="col-6">Educational Degree</dt>
                  <dd className="col-6 pb-3">{degree || 'Any'}</dd>
                </dl>
                <Link className="link row" to={`recruiter/jobs/${_id}/show`}>
                  <button
                    className="button_type_colored button_size_l m-auto"
                  >
                  View Job Description
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
    }
}

ClosedCard.propTypes = propTypes;
ClosedCard.defaultProps = defaultProps;

export default ClosedCard;
