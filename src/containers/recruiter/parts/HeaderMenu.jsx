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

// const propTypes = {
//     dispatch: PropTypes.func,
//     companyName: PropTypes.string,
//     profilePhoto: PropTypes.string,
//     progress: PropTypes.number,
//     completed: PropTypes.number,
// };
const defaultProps = {
    recruiter: {},
    company: {},
    completed: 5,
};

// @connect(
//     (state, ownProps) => {
//         const { companyName } = state.applicationCompany.summary;
//         const {
//             profilePhoto,
//             progress,
//         } = state.applicationCompany;
//
//         const { completed } = ownProps;
//
//         return {
//             companyName,
//             profilePhoto,
//             progress: completed + progress.length,
//             completed,
//         };
//     },
// )
//
//
const mapStateToProps = state => ({...state.companyJobs})
const mapDispatchToProps = dispatch => ({dispatch})

@connect(mapStateToProps,mapDispatchToProps)
class JobsHeaderMenu extends Component {

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
                        to={ROUTE_COMPANY_MATCHES_ALL}
                        activeClassName="navigation__link navigation__link_active"
                        className="navigation__link"
                    >
                        Candidates
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
                        linkTo={ROUTE_APPLICATION_COMPANY}
                    >
                        <HeaderDropDownItem to={ROUTE_EDIT_COMPANY}>Profile</HeaderDropDownItem>
                        <HeaderDropDownItem>Change Password</HeaderDropDownItem>
                        <HeaderDropDownItem>Notification Settings</HeaderDropDownItem>
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

// JobsHeaderMenu.propTypes = propTypes;
JobsHeaderMenu.defaultProps = defaultProps;

export default JobsHeaderMenu;
