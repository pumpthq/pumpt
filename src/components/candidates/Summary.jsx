import React, {PropTypes} from 'react';

import PencilIcon from 'components/icons/pencil';
import {displayIndustries} from 'components/helpers';

const CandidateSummary = ({
  candidate: {
    firstName,
    lastName,
    interestWorkingArea,
    recentWorkingAreas,
    recentJob,
    recentAnnualIncome,
    recentAreaExperience },
  authorization: { email },
  onEdit,
}) => (
  <div className="summary-head">
    <div className="summary-head__title mdl-card__title">
      <div className="summary-head__title-item summary-head__title-item_type_alignment">
        <div className="summary-head__title-column">
          <div className="summary-head__title-block">
            <h2 className="mdl-card__title-text heading heading_type_two">
              <span className="ellipsis-text">
                {firstName} {lastName}
              </span>
              <a
                className="link" onClick={onEdit}
                style={{
                  visibility: 'visible',
                  opacity: 1,
                }}
              >
                <PencilIcon />
                &nbsp;Edit
              </a>
            </h2>
            <br />
            <span className="text ellipsis-text">{email}</span>

          </div>
        </div>
      </div>
      <div className="summary-head__title-item summary-head__title-item_type_alignment">
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
    </div>
  </div>
);

CandidateSummary.propTypes = {
  candidate: PropTypes.object,
  authorization: PropTypes.object,
  onEdit: PropTypes.func,
};

export default CandidateSummary;
