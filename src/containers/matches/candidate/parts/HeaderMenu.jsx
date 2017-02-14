import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
    HeaderFull,
    HeaderDropDownMenu,
    HeaderDropDownItem,
} from './../../../../components/main/header';
import {
    ROUTE_CANDIDATE_MATCHES_ALL,
    ROUTE_CANDIDATE_MESSAGES,
    ROUTE_APPLICATION_CANDIDATE,
} from './../../../../constants/routes';
import { logOut } from './../../../../actions/authorization';

const propTypes = {
    dispatch: PropTypes.func,
    fullName: PropTypes.string,
    profilePhoto: PropTypes.string,
    progress: PropTypes.number,
    completed: PropTypes.number,
};
const defaultProps = {
    completed: 5,
};

@connect(
    (state, ownProps) => {
        const {
            firstName,
            lastName
        } = state.applicationCandidate.summary;
        const {
            profilePhoto,
            progress,
        } = state.applicationCandidate;
        const { completed } = ownProps;

        return {
            fullName : `${firstName} ${lastName}`,
            profilePhoto,
            progress: completed + progress.length,
            completed,
        };
    },
)
class MatchesHeaderMenu extends Component {

    render() {
        const {
            fullName,
            profilePhoto,
            dispatch,
            progress,
        } = this.props;
        return (
            <HeaderFull
                links={[
                    <Link
                        to={ROUTE_CANDIDATE_MATCHES_ALL}
                        activeClassName="navigation__link navigation__link_active"
                        className="navigation__link"
                    >
                        Matches
                    </Link>,
                    <Link
                        to={ROUTE_CANDIDATE_MESSAGES}
                        className="navigation__link"
                        activeClassName="navigation__link navigation__link_active"
                    >
                        Messages
                    </Link>,
                ]}
                addition={
                    <HeaderDropDownMenu
                        userName={fullName}
                        userAvatar={profilePhoto}
                        progress={progress}
                        linkTo={ROUTE_APPLICATION_CANDIDATE}
                    >
                        <HeaderDropDownItem>Profile</HeaderDropDownItem>
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

MatchesHeaderMenu.propTypes = propTypes;
MatchesHeaderMenu.defaultProps = defaultProps;

export default MatchesHeaderMenu;
