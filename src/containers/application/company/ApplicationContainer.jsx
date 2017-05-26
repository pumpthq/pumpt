import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Wrapper from 'components/main/wrapper'
import { HeaderMini } from 'components/main/header'
import ScrollContainer from 'components/main/scrollContainer'
import HeadingProgress from 'containers/application/headingProgress';

import RecruiterForm from 'components/recruiters/Form';
import RecruiterSummary from 'components/recruiters/Summary';
import CompanyForm from 'components/company/Form';
import CompanySummary from 'components/company/Summary';
import CompanyApplicationForm from 'components/company/Application';

import logoImage from 'img/sprites-svg/logo.svg'
import { updateRecruiter, updateCompany } from 'actions/applicationCompany'
import Panel from 'components/main/panel';
import StepProgress from 'components/application/stepProgress';
import Footer from 'components/main/footer/footer';

function mapStateToProps(state, ownProps) {
    return { recruiter: state.companyJobs.recruiter, company: state.companyJobs.company, authorization: state.authorization }
}

@connect(mapStateToProps)
export default class ApplicationContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { editRecruiterSummary: false, editCompanySummary: false }
        console.log(props)
    }

    editRecruiterSummary = (val) => {
        this.setState({editRecruiterSummary:val})
    }

    editCompanySummary = (val) => {
        this.setState({editCompanySummary:val})
    }

    render() {
        const { recruiter, company, dispatch } = this.props

        return (
            <Wrapper id='onboarding-recruiter'>
                <div class='container'>
                    <div class='row row-padding-bigger'>
                        <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <HeaderMini
                                class="header_small"
                                profilePhoto={recruiter.avatar}
                                logo={logoImage}
                                name={`${recruiter.firstName} ${recruiter.lastName}`}
                                progress={recruiter.fillProgress}
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
                                                initialValues={company}
                                                onSubmit={values=> {dispatch(updateCompany(values)) } }/>
                                        </Panel>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </ScrollContainer>
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
