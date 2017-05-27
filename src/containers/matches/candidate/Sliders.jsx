import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CardSlider from 'components/CardSlider';
import MatchSummary from 'components/matches/Summary'

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
        <div>
            YOU HAVE NO NEW MATCHES
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
