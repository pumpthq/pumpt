import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
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
@withRouter
export default class CandidateHeaderMenu extends Component {

    render() {
      console.log('All: ', this.props.router.isActive('/candidate/matches/all'));
        const {
            candidate,
            dispatch,
        } = this.props;
        return (
            <HeaderFull
                router={this.props.router}
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
                      <HeaderDropDownItem to={'/candidate/matches/changePass'}>
                        Change Password
                      </HeaderDropDownItem>
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
