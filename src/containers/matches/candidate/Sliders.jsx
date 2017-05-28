import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CardSlider from 'components/CardSlider';
import MatchSummary from 'components/matches/Summary'
import './style.less'

@connect( state => ({
    items: state.candidateMatches.all,
    component: MatchSummary,
    placeholder: AllPlaceholder,
}) )
export class AllMatchesSlider extends CardSlider {}

@connect( state => ({
    items: state.candidateMatches.bookmarked,
    component: MatchSummary,
    placeholder: BookmarkedPlaceholder,
}) )
export class BookmarkedMatchesSlider extends CardSlider {}

@connect( state => ({
    items: state.candidateMatches.notInterested,
    component: MatchSummary,
    placeholder: NotInterestedPlaceholder,
}) )
export class NotInterestedMatchesSlider extends CardSlider {}


const AllPlaceholder = (props) => {
    return (
        <div className="welcome-to-matches-popup">
            <h3>Welcome to matches!</h3>
            <div className="message">Our proprietary technology smartly matches Candidates with Employers based on
                constructor professional backgrounds and goals, shared values, and culture fit – reducing the time
                and resources spent on typical job searches.</div>
        </div>
    )
}

const BookmarkedPlaceholder = (props) => {
    return (
        <div>
            YOU HAVE NO BOOKMARKED MATCHES
        </div>
    )
}

const NotInterestedPlaceholder = (props) => {
    return (
        <div>
            YOU HAVE NO REJECTED MATCHES
        </div>
    )
}
