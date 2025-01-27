import React, { PropTypes } from 'react';

import PencilIcon from 'components/icons/pencil';
import { displayIndustries } from 'components/helpers';

import HeadingProgress from 'containers/application/candidate/headingProgress';
import { updateCandidate } from 'actions/candidateMatches';

const CandidateSummary = ({
  candidate: {
    firstName,
    lastName,
    location,
    interestWorkingArea,
    recentWorkingAreas,
    recentJob,
    recentAnnualIncome,
    recentAreaExperience },
  authorization: { email },
  onEdit,
  headingProgress
}) => (
  <div>

    <div className="summary-head row">
      <div className="col-12 py-5">
        <h2>
          {firstName} {lastName}
        </h2>
        <span>{email}</span>
        <br />
        <span>{location.slice(0,location.lastIndexOf(','))}</span>
        <br />
        <a className="link link__edit" onClick={onEdit}>
          Edit
        </a>
      </div>
    </div>

    {headingProgress
        ? <div className="pt-5"><HeadingProgress/></div>
        : ''
    }

    <div className="row summary-body card-inner">
      <div className="col-12 pt-5">
        <dl>
          <dt>Total Compensation</dt>
          <dd>{recentAnnualIncome}</dd>
          <dt>Years of Experience </dt>
          <dd>{recentAreaExperience}</dd>
          <dt>Current Job Title </dt>
          <dd>{recentJob}</dd>
          <dt>Working Areas</dt>
          <dd>{displayIndustries(recentWorkingAreas)}</dd>
          <dt>Industry</dt>
          <dd>{interestWorkingArea && Array.isArray(interestWorkingArea) ?
                interestWorkingArea.join(', ') : interestWorkingArea}
              </dd>
        </dl>
      </div>
    </div>
  </div>
);

CandidateSummary.propTypes = {
  candidate: PropTypes.object,
  authorization: PropTypes.object,
  onEdit: PropTypes.func,
};

export default CandidateSummary;
