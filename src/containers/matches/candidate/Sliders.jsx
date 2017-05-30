import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CardSlider from 'components/CardSlider';
import MatchSummary from 'components/matches/Summary'
import './style.less'

@connect( state => ({
    items: state.candidateMatches.matches.filter(match=>match.vacancy.status=='new'),
    component: MatchSummary,
    placeholder: AllPlaceholder,
}) )
export class AllMatchesSlider extends CardSlider {}

@connect( state => ({
    items: state.candidateMatches.matches.filter(match=>match.vacancy.status=='bookmarked'),
    component: MatchSummary,
    placeholder: BookmarkedPlaceholder,
}) )
export class BookmarkedMatchesSlider extends CardSlider {}

@connect( state => ({
    items: state.candidateMatches.matches.filter(match=>match.vacancy.status=='rejected'),
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
        <div className="welcome-to-matches-popup">
            <h3>No Saved Jobs...Yet</h3>
            <div className="message">
						Bookmark any jobs you're intersted in and they will show up here.
						</div>
        </div>
    )
}

const NotInterestedPlaceholder = (props) => {
    return (
        <div className="welcome-to-matches-popup">
            <h3>Your Rejected Jobs</h3>
            <div className="message">
						We'll keep track of jobs you are not interested in. We use them to give you better matches in the future, and we'll also keep them here if you ever change your mind.
						</div>
        </div>
    )
}
