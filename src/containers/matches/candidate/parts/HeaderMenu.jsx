import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Mailto from 'react-mailto';
import {HeaderDropDownItem, HeaderDropDownMenu, HeaderFull,} from './../../../../components/main/header';
import {ROUTE_CANDIDATE_MATCHES_ALL,} from './../../../../constants/routes';
import {logOut} from './../../../../actions/authorization';

import {apiImage} from 'components/helpers'

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
                        key="matches"
                        activeClassName="navigation__link navigation__link_active"
                        className="navigation__link"
                    >
                        Matches
                    </Link>,
                    <Link
                        to={"/candidate/matches/edit"}
                        key="profile"
                        className="navigation__link"
                        activeClassName="navigation__link navigation__link_active"
                    >
                        Profile
                    </Link>,
                ]}
                addition={
                    <HeaderDropDownMenu
                        userName={`${candidate.firstName} ${candidate.lastName}`}
                        userAvatar={apiImage(candidate.avatar)}
                        linkTo={"/candidate/matches/edit"}
                    >
                      <HeaderDropDownItem to={'/candidate/matches/settings'}>
                        Settings
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
