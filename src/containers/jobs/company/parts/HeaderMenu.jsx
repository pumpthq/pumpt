import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
    HeaderFull,
    HeaderDropDownMenu,
    HeaderDropDownItem,
} from './../../../../components/main/header';
import {
    ROUTE_COMPANY_MATCHES_ALL,
    ROUTE_COMPANY_JOBS_OPEN,
    ROUTE_COMPANY_JOBS_NEW,
    ROUTE_APPLICATION_COMPANY,
} from './../../../../constants/routes';
import { logOut } from './../../../../actions/authorization';

const propTypes = {
    dispatch: PropTypes.func,
    companyName: PropTypes.string,
    profilePhoto: PropTypes.string,
    progress: PropTypes.number,
    completed: PropTypes.number,
};
const defaultProps = {
    completed: 5,
};

@connect(
    (state, ownProps) => {
        const { companyName } = state.applicationCompany.summary;
        const {
            profilePhoto,
            progress,
        } = state.applicationCompany;

        const { completed } = ownProps;

        return {
            companyName,
            profilePhoto,
            progress: completed + progress.length,
            completed,
        };
    },
)
class JobsHeaderMenu extends Component {

    render() {
        const {
            companyName,
            profilePhoto,
            dispatch,
            progress,
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
                        userName={companyName}
                        userAvatar={profilePhoto}
                        progress={progress}
                        linkTo={ROUTE_APPLICATION_COMPANY}
                    >
                        <HeaderDropDownItem to={ROUTE_APPLICATION_COMPANY}>Profile</HeaderDropDownItem>
                        <HeaderDropDownItem>Change Password</HeaderDropDownItem>
                        <HeaderDropDownItem>Notification Settings</HeaderDropDownItem>
                        <HeaderDropDownItem>Blacklisted Companies</HeaderDropDownItem>
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

JobsHeaderMenu.propTypes = propTypes;
JobsHeaderMenu.defaultProps = defaultProps;

export default JobsHeaderMenu;
