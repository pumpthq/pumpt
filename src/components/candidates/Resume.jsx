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
          <dd>Please upload your resume and/or enter your experience &amp; education below.
             <br /><em>Please note, you’ll be matched to more jobs by both uploading your resume and adding your experience/education below.</em>
            <Uploader label="Resume"
              onSuccessAction={(data) => (
                updateCandidate({resumeId: data.id, resumeName: data.name})
              )}
            />
          </dd>
  </div>
);

export default CandidateResume;
