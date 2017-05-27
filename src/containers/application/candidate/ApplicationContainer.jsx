import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Wrapper from 'components/main/wrapper'
import { HeaderMini } from 'components/main/header'
import ScrollContainer from 'components/main/scrollContainer'
import HeadingProgress from 'containers/application/headingProgress';
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

function mapStateToProps(state, ownProps) {
    return { candidate: state.candidateMatches.candidate, authorization: state.authorization }
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


    render() {
        const { candidate, dispatch } = this.props

        return (
            <Wrapper id='onboarding-candidate'>
                <div class='container'>
                    <div class='row row-padding-bigger'>
                        <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <HeaderMini
                                class="header_small"
                                profilePhoto={candidate.avatar}
                                logo={logoImage}
                                name={`${candidate.firstName} ${candidate.lastName}`}
                                progress={candidate.fillProgress}
                            />
                        </div>
                    </div>
                </div>
                <ScrollContainer>
                    <div class="content__wrapper">
                        <div class="content">
                            <div class="container">
                                <div class="row row-padding-bigger">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 column__wrapper">
                                        <Panel>
                                            <HeadingProgress/>
                                            {this.state.editSummary ?
                                                <CandidateForm
                                                    initialValues={candidate}
                                                    onSubmit={values=> {dispatch(updateCandidate(values)); this.editSummary(false)}}
                                                    onCancel={()=>this.editSummary(false)} />
                                                :
                                                <CandidateSummary {...this.props} onEdit={()=>this.editSummary(true)}/>
                                            }
                                            <CandidateApplicationForm
                                                initialValues={candidate}
                                                onSubmit={values=> {dispatch(updateCandidate(values)) } }/>
                                        </Panel>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </ScrollContainer>


                {/* ⚠️ temporary button to open dialog */}
                <button onClick={this.openDialog}>open application success dialog {JSON.stringify(this.state.lastApproved)}</button>

                <ApplicationSuccessDialog lastApproved={this.state.lastApproved} />

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
