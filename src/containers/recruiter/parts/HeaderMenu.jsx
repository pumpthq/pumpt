import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Mailto from 'react-mailto';

import {HeaderDropDownItem, HeaderDropDownMenu, HeaderFull,} from './../../../components/main/header';
import {ROUTE_COMPANY_JOBS_NEW, ROUTE_COMPANY_JOBS_OPEN,} from './../../../constants/routes';
import {logOut} from './../../../actions/authorization';

import {apiImage} from 'components/helpers'

const mapStateToProps = state => {
    return {recruiter: state.companyJobs.recruiter, company: state.companyJobs.company}
}
@connect(mapStateToProps)
export default class RecruiterHeaderMenu extends Component {

    render() {
        const {
            recruiter,
            dispatch,
            company,
        } = this.props;
        return (
            <HeaderFull
                links={[
                    <Link
                        to={"/recruiter/edit"}
                        key="profile"
                        activeClassName="navigation__link navigation__link_active"
                        className="navigation__link"
                    >
                        Profile
                    </Link>,
                    <Link
                        to={ROUTE_COMPANY_JOBS_OPEN}
                        key="jobs"
                        className="navigation__link"
                        activeClassName="navigation__link navigation__link_active"
                    >
                        Jobs
                    </Link>,
                    <Link
                        to={ROUTE_COMPANY_JOBS_NEW}
                        key="new"
                        className="navigation__link"
                        activeClassName="navigation__link navigation__link_active"
                    >
                        New Job
                    </Link>,
                ]}
                addition={
                    <HeaderDropDownMenu
                        userName={`${recruiter.fullName} @ ${company.name}`}
                        userAvatar={apiImage(company.logo)}
                        linkTo={"/recruiter/edit"}
                    >
                        <HeaderDropDownItem to={'/recruiter/changePass'}>Change Password</HeaderDropDownItem>
                        <HeaderDropDownItem nolink >
												  <Mailto email="support@pumpthq.com" obfuscate={true} target="_blank">
														Help &amp; Support
													</Mailto>
												</HeaderDropDownItem>
                        <HeaderDropDownItem
                            onClick={() => {
                                dispatch(logOut());
                            }}
                        >
                            Log Out
                        </HeaderDropDownItem>
                    </HeaderDropDownMenu>
                }
            />
        );
    }
}
