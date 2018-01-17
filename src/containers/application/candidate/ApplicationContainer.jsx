import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Wrapper from 'components/main/wrapper'
import { HeaderMini } from 'components/main/header'
import ScrollContainer from 'components/main/scrollContainer'
import HeadingProgress from 'containers/application/candidate/headingProgress';
import CandidateSummaryForm from 'components/candidates/Form';
import CandidateSummary from 'components/candidates/Summary';
import CandidateApplicationForm from 'components/candidates/Application';
import SummaryHead from './summaryHead';
// import EntryBlock from './EntryBlock'
import logoImage from 'img/sprites-svg/logo.svg'
import { updateCandidate } from 'actions/candidateMatches'
// import { STARTUP_COMPLETED_STEPS } from './../../../constants/applicationCandidate';
import Panel from 'components/main/panel';
import StepProgress from 'components/application/stepProgress';
import Footer from 'components/main/footer/footer';
import ApplicationSuccessDialog from 'components/application/ApplicationSuccessDialog'
import Button from 'components/main/button'
import { finishApplication } from 'actions/authorization'

import {apiImage} from 'components/helpers'

function mapStateToProps(state, ownProps) {
    return { candidate: state.candidateMatches.candidate, authorization: state.authorization,  }
}


import { submit } from 'redux-form'

const recentWorkingAreasToParent = (values) => {
  values.recentWorkingArea = values.recentWorkingAreas.map( a => (a.value));
  values.recentWorkingAreaParent = values.recentWorkingAreas.length > 0 ? values.recentWorkingAreas[0].parent : undefined;

  return values;
}
const recentWorkingAreaFormat = (values) => {
  values.recentWorkingAreas = values.recentWorkingArea.map(a => ({parent: values.recentWorkingAreaParent, value: a}));

  delete values.recentWorkingArea;
  delete values.recentWorkingAreaParent;
  return values;
}

@connect(mapStateToProps)
export default class ApplicationContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
					editSummary: false}
    }

    editSummary = (val) => {
        this.setState({editSummary:val})
    }

    openDialog = () => {
        this.setState({lastApproved:(new Date)})
    }

		componentDidMount() {
		}

    handleFinished = () => {

			//WIP: This workaround died with the changes to the new redux form and app-wide changes
        //🔧 use 'ref' prop to find and submit the application form (handled by redux-form) and dispatch finishApplication action
        //this.refs.applicationForm.submit();
        this.props.dispatch(finishApplication());
				this.openDialog();
    }


    render() {
        const { candidate, dispatch, jobTitleData, authorization } = this.props

        return (
            <Wrapper id='onboarding-candidate'>
                <div class='container'>
                    <div class='row row-padding-bigger'>
                        <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <HeaderMini
                                class="header_small"
                                profilePhoto={apiImage(candidate.avatar)}
                                logo={logoImage}
                                name={`${candidate.firstName} ${candidate.lastName}`}
                                progress={candidate.fillProgress}
                            />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="mdl-card col-xs-12">
                        <HeadingProgress/>
                    </div>

                    <div className="mdl-card col-xs-12">

												{this.state.editSummary ?
													<CandidateSummaryForm
														initialValues={recentWorkingAreasToParent(candidate)}
                            onSubmit={values=> {dispatch(updateCandidate(recentWorkingAreaFormat(values))); this.editSummary(false)}}
														onCancel={()=>this.editSummary(false)}
                                                        />

														:

														<CandidateSummary {...this.props} onEdit={()=>this.editSummary(true)}/>
												}
												<CandidateApplicationForm
														ref="applicationForm"
														initialValues={candidate}
													/>

														<div className="text-center">
    													<Button
    														type='submit'
    														typeColored
    														buttonSize='l'
    														onClick={this.handleFinished}
    													>
    													 Done
    													</Button>
															<ApplicationSuccessDialog trigger={authorization.lastFinished} />
    												</div>
														<span>
															<br></br>
															<br></br>
														</span>
												</div>
                </div>
                <Footer />

            </Wrapper>
        )
    }
}

// ApplicationContainer.defaultProps = {
//     candidate: {
//         avatar: '{avatar}',
//         firstName: '{firstName}',
//         lastName: '{lastName}'
//     }
// }
