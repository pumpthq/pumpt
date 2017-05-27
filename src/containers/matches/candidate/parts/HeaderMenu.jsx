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

const mapStateToProps = state => {
    return {candidate: state.candidateMatches.candidate}
}
@connect(mapStateToProps)
export default class CandidateHeaderMenu extends Component {

    render() {
        const {
            candidate,
            dispatch,
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
                        to={"/candidate/matches/edit"}
                        className="navigation__link"
                        activeClassName="navigation__link navigation__link_active"
                    >
                        Profile
                    </Link>,
                ]}
                addition={
                    <HeaderDropDownMenu
                        userName={`${candidate.firstName} ${candidate.lastName}`}
                        userAvatar={candidate.avatar}
                        progress={candidate.fillProgress}
                        linkTo={"/candidate/matches/edit"}
                    >
                        <HeaderDropDownItem to={'/candidate/matches/changePass'}>Change Password</HeaderDropDownItem>
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
