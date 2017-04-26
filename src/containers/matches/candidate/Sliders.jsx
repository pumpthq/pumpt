import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MatchesSliderPrototype from './MatchesSliderPrototype';

@connect( state => ({ matches: state.candidateMatches.all }) )
export class AllMatchesSlider extends MatchesSliderPrototype {}

@connect( state => ({ matches: state.candidateMatches.bookmarked }) )
export class BookmarkedMatchesSlider extends MatchesSliderPrototype {}

@connect( state => ({ matches: state.candidateMatches.notInterested }) )
export class NotInterestedMatchesSlider extends MatchesSliderPrototype {}
