import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
    HeaderFull,
    HeaderDropDownMenu,
    HeaderDropDownItem,
} from './../../../components/main/header';
import {
    ROUTE_EDIT_COMPANY,
    ROUTE_COMPANY_MATCHES_ALL,
    ROUTE_COMPANY_JOBS_OPEN,
    ROUTE_COMPANY_JOBS_NEW,
    ROUTE_APPLICATION_COMPANY,
} from './../../../constants/routes';
import { logOut } from './../../../actions/authorization';

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
                        activeClassName="navigation__link navigation__link_active"
                        className="navigation__link"
                    >
                        Profile
                    </Link>,
                    <Link
                        to={ROUTE_COMPANY_JOBS_OPEN}
                        className="navigation__link"
                        activeClassName="navigation__link navigation__link_active"
                    >
                        Jobs
                    </Link>,
                    <Link
                        to={ROUTE_COMPANY_JOBS_NEW}
                        className="navigation__link"
                        activeClassName="navigation__link navigation__link_active"
                    >
                        New Job
                    </Link>,
                ]}
                addition={
                    <HeaderDropDownMenu
                        userName={`${recruiter.firstName} ${recruiter.lastName} @ ${company.name}`}
                        userAvatar={company.logo}
                        progress={company.fillProgress}
                        linkTo={"/recruiter/edit"}
                    >
                        {/* <HeaderDropDownItem to={ROUTE_EDIT_COMPANY}>Profile</HeaderDropDownItem> */}
                        <HeaderDropDownItem to={'/recruiter/changePass'}>Change Password</HeaderDropDownItem>
                        {/* <HeaderDropDownItem>Notification Settings</HeaderDropDownItem> */}
                        <HeaderDropDownItem>Help &amp; Support</HeaderDropDownItem>
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
