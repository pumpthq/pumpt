import Authorization from './authorization'
import CandidateOnboarding from './candidateOnboarding'
import CompanyOnboarding from './companyOnboarding'
import CandidateApplication from './candidateApplication'
import CompanyApplication from './companyApplication'
import ApplicationPhotoUploading from './applicationPhotoUploading'
import CompanyJobs from './companyJobs'
import CandidateMatches from './candidateMatches'

function *mySaga() {
    return yield [
        ...Authorization(),
        ...CandidateApplication(),
        ...CompanyApplication(),
        ...CandidateOnboarding(),
        ...CompanyOnboarding(),
        ...ApplicationPhotoUploading(),
        ...CompanyApplication(),
        ...CompanyJobs(),
        ...CandidateMatches()
    ]
}

export default mySaga
