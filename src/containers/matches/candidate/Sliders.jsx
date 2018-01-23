import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CardSlider from 'components/CardSlider';
import MatchSummary from 'components/matches/Summary';
import './style.less';

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
            <h3>Welcome To Pumpt’s Matching Section!</h3>
            <div className="message">You’ll be notified via email as soon as you’ve been matched to jobs.</div>
        </div>
    )
}

const BookmarkedPlaceholder = (props) => {
    return (
        <div className="welcome-to-matches-popup">
            <h3>You Want to Save Your Job Matches?<br></br>Use The Bookmark Feature.</h3>
            <div className="message">
						You’ll be able to save all job matches you’re interested in by bookmarking them.
						</div>
        </div>
    )
}

const NotInterestedPlaceholder = (props) => {
    return (
        <div className="welcome-to-matches-popup">
            <h3>We Save All Your Rejected Job Matches</h3>
            <div className="message">
						And if you ever change your mind, all your rejected matches will be saved in here.
						</div>
        </div>
    )
}
