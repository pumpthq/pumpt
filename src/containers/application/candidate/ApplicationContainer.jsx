import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Wrapper from 'components/main/wrapper'
import { HeaderMini } from 'components/main/header'
import ScrollContainer from 'components/main/scrollContainer'
import HeadingProgress from 'containers/application/candidate/headingProgress';
import CandidateForm from 'components/candidates/Form';
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


@connect(mapStateToProps)
export default class ApplicationContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { editSummary: false }
    }

    editSummary = (val) => {
        this.setState({editSummary:val})
    }

    openDialog = () => {
        this.setState({lastApproved:(new Date)})
    }

    handleFinished = () => {

        //🔧 use 'ref' prop to find and submit the application form (handled by redux-form) and dispatch finishApplication action
        this.refs.applicationForm.submit();
        this.props.dispatch(finishApplication());
    }


    render() {
        const { candidate, dispatch, authorization } = this.props

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
														<CandidateForm
																initialValues={candidate}
																onSubmit={values=> {dispatch(updateCandidate(values)); this.editSummary(false)}}
																onCancel={()=>this.editSummary(false)} />
														:
														<CandidateSummary {...this.props} onEdit={()=>this.editSummary(true)}/>
												}
												<CandidateApplicationForm
                                                        ref="applicationForm"
														initialValues={candidate}
														onSubmit={values=> {dispatch(updateCandidate(values)) } }/>

															{/* //WIP: putting the submit button here is causeing issue with the state not working (API complains) also wasn't able to combine this function with the
															//...finishApplication action */}

                                                {/* hide the "FINISH" button if already finished */}
												{!authorization.isFinished &&
                                                    <div className="text-center">
    													<Button
    														type='submit'
    														typeColored
    														buttonSize='l'
    														onClick={this.handleFinished}

    													>
    														All Set For Now?
    													</Button>

    												</div>
                                                }
												<span>
												<br></br>
												<br></br>
												</span>

                    </div>
                </div>
                <Footer />

                {/* ⚠️ temporary button to open dialog */}
                <button onClick={this.openDialog}>open application success dialog {JSON.stringify(this.state.lastApproved)}</button>

                <ApplicationSuccessDialog trigger={authorization.lastFinished} />

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