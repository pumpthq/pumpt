import React, { PropTypes } from 'react';
import Uploader from 'components/FileUploader';


import { updateCandidate } from 'actions/candidateMatches';

const CandidateResume = ({
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
 <hr className="my-5" />
          <dt>Experience + Education</dt>
          <dd>Please upload your resume (PDF) or enter your Experience and Education.
            <Uploader label="Resume"
              onSuccessAction={(data) => (
                updateCandidate({resumeId: data.id, resumeName: data.name})
              )}
            />
          </dd>
  </div>
);

export default CandidateResume;
