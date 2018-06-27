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
    <div className="summary-head">
      <div className="summary-head__title">
        <h2 className="mdl-card__title-text heading">
          <span className="ellipsis-text">
            {firstName} {lastName}
          </span>
        </h2>
        <br />
        <span className="text ellipsis-text">{email}</span>
        <br />
        <span className="text ellipsis-text">{location}</span>
        <a
          className="link link__edit" onClick={onEdit}
          style={{
            visibility: 'visible',
            opacity: 1,
          }}
        >
          Edit
        </a>
      </div>
    </div>
    <div className="row">
      <div className="summary-head__title-column">
        <span className="text summary-head__label">Annual Income</span>
        <span className="text text_size_s summary-head__summary">{recentAnnualIncome}</span>
      </div>
      <div className="summary-head__title-column">
        <span class="text summary-head__label">Industry Experience </span>
        <span class="text text_size_s summary-head__summary">{recentAreaExperience}</span>
      </div>
      <div className="summary-head__title-column">
        <span className="text summary-head__label">Job Title </span>
        <span className="text text_size_s summary-head__summary">{recentJob}</span>
      </div>
      <div className="summary-head__title-column">
        <span className="text summary-head__label">Working Areas</span>
        <span className="text text_size_s summary-head__summary">
          {displayIndustries(recentWorkingAreas)}
        </span>
      </div>
      <div className="summary-head__title-column">
        <span className="text summary-head__label">Industry</span>
        <span className="text text_size_s summary-head__summary">
          {interestWorkingArea && Array.isArray(interestWorkingArea) ?
              interestWorkingArea.join(', ') : interestWorkingArea}
            </span>
          </div>
        </div>
        <div className="summary-head__title">
          <Uploader label="Resume"
            onSuccessAction={(data) => (
              updateCandidate({resumeId: data.id, resumeName: data.name})
            )}
          />
        </div>
      </div>
);

CandidateSummary.propTypes = {
  candidate: PropTypes.object,
  authorization: PropTypes.object,
  onEdit: PropTypes.func,
};

export default CandidateSummary;
