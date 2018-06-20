import React, {Component} from 'react'
import {connect} from 'react-redux'
import Wrapper from 'components/main/wrapper'
import {HeaderMini} from 'components/main/header'
import HeadingProgress from 'containers/application/company/headingProgress';

import RecruiterForm from 'components/recruiters/Form';
import RecruiterSummary from 'components/recruiters/Summary';
import CompanyForm from 'components/company/Form';
import CompanySummary from 'components/company/Summary';
import CompanyApplicationForm from 'components/company/Application';

import logoImage from 'img/sprites-svg/logo.svg'
import {updateCompany, updateRecruiter} from 'actions/applicationCompany'
import Footer from 'components/main/footer/footer';
import Button from 'components/main/button'
import {finishApplication} from 'actions/authorization'

import ApplicationSuccessDialog from 'components/application/ApplicationSuccessDialog'

import {apiImage} from 'components/helpers'

function mapStateToProps(state, ownProps) {
    return { recruiter: state.companyJobs.recruiter, company: state.companyJobs.company, authorization: state.authorization }
}

@connect(mapStateToProps)
export default class ApplicationContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { editRecruiterSummary: false, editCompanySummary: false }
    }

    editRecruiterSummary = (val) => {
        this.setState({editRecruiterSummary:val})
    }

    editCompanySummary = (val) => {
        this.setState({editCompanySummary:val})
    }

    openDialog = () => {
        this.setState({lastApproved:(new Date)})
    }

    handleFinished = () => {
        this.props.dispatch(finishApplication());
				this.openDialog();
    }


    render() {
        const { recruiter, company, dispatch, authorization } = this.props

        return (
            <Wrapper id='onboarding-recruiter'>
                <div class='container'>
                    <div class='row row-padding-bigger'>
                        <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <HeaderMini
                                class="header_small"
                                profilePhoto={apiImage(recruiter.avatar)}
                                logo={logoImage}
                                name={`${recruiter.fullName}`}
                                progress={recruiter.fillProgress}
                            />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="mdl-card col-xs-12">
                        <HeadingProgress/>
                    </div>

                    <div className="mdl-card col-xs-12">
                                            {this.state.editRecruiterSummary ?
                                                <RecruiterForm
                                                    initialValues={recruiter}
                                                    onSubmit={values=> {dispatch(updateRecruiter(values)); this.editRecruiterSummary(false)}}
                                                    onCancel={()=>this.editRecruiterSummary(false)} />
                                                :
                                                <RecruiterSummary {...this.props} onEdit={()=>this.editRecruiterSummary(true)}/>
                                            }
                                            {this.state.editCompanySummary ?
                                                <CompanyForm
                                                    initialValues={company}
                                                    onSubmit={values=> {dispatch(updateCompany(values)); this.editCompanySummary(false)}}
                                                    onCancel={()=>this.editCompanySummary(false)} />
                                                :
                                                <CompanySummary {...this.props} onEdit={()=>this.editCompanySummary(true)}/>
                                            }

                                            <CompanyApplicationForm
                                                ref="companyApplicationForm"
                                                initialValues={company}
                                                onSubmit={values=> {dispatch(updateCompany(values)); this.handleFinished() } }/>

                                                
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
//     recruiter: {
//         avatar: '{avatar}',
//         firstName: '{firstName}',
//         lastName: '{lastName}'
//     },
// }
