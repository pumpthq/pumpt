import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CardSlider from 'components/CardSlider';
import MatchSummary from 'components/matches/MatchSummary'

@connect( state => ({
    items: state.candidateMatches.all,
    component: MatchSummary
}) )
export class AllMatchesSlider extends CardSlider {}

@connect( state => ({
    items: state.candidateMatches.bookmarked,
    component: MatchSummary
}) )
export class BookmarkedMatchesSlider extends CardSlider {}

@connect( state => ({
    items: state.candidateMatches.notInterested,
    component: MatchSummary
}) )
export class NotInterestedMatchesSlider extends CardSlider {}
