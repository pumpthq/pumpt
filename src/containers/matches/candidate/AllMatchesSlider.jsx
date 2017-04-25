import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MatchesSliderPrototype from './MatchesSliderPrototype';
import { Carousel } from './../../../components/matches';
import CardClose from './../../../components/matches/cardClose';

@connect(
    function mapStateToProps(state) {
        const { all } = state.candidateMatches

        return {
            matches : all
        }
    }
)
class AllMatchesSlider extends MatchesSliderPrototype {

    render() {
        const { matches } = this.props;

        return (
            <Carousel>
                {matches.map((job) => (
                    <CardClose key={job.id} {...job} />
                ))}
            </Carousel>
        );
    }

};

module.exports = AllMatchesSlider
