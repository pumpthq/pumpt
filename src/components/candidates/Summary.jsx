import React, { PropTypes } from 'react';

import PencilIcon from 'components/icons/pencil';
import Uploader from 'components/FileUploader';
import { displayIndustries } from 'components/helpers';

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
}) => (
  <div>

    <div className="summary-head row">
      <div className="col-12 py-5">
        <h2>
          {firstName} {lastName}
        </h2>
        <span>{email}</span>
        <br />
        <span>{location}</span>
        <br />
        <a className="link link__edit" onClick={onEdit}>
          Edit
        </a>
      </div>
    </div>

    <div className="row summary-body">
      <div className="col-12 pt-5">
        <dl>
          <dt>Annual Income</dt>
          <dd>{recentAnnualIncome}</dd>
          <dt>Industry Experience </dt>
          <dd>{recentAreaExperience}</dd>
          <dt>Job Title </dt>
          <dd>{recentJob}</dd>
          <dt>Working Areas</dt>
          <dd>{displayIndustries(recentWorkingAreas)}</dd>
          <dt>Industry</dt>
          <dd>{interestWorkingArea && Array.isArray(interestWorkingArea) ?
                interestWorkingArea.join(', ') : interestWorkingArea}
              </dd>
          <hr className="my-5" />
          <dt>Experience + Education</dt>
          <dd>Please upload your resume (PDF) or enter your Experience and Education.
            <Uploader label="Resume"
              onSuccessAction={(data) => (
                updateCandidate({resumeId: data.id, resumeName: data.name})
              )}
            />
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
