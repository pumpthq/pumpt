import { AllMatchesSlider, BookmarkedMatchesSlider, NotInterestedMatchesSlider } from './candidate/Sliders'

module.exports = {
    path: 'candidate/matches',
    component: require('./candidate/MatchesContainer'),
    childRoutes: [
        { path: 'vacancy/:id', component: (props) => <VacancyFullDescription id={props.params.id} /> },
        { path: 'all', component: AllMatchesSlider },
        { path: 'bookmarked', component: BookmarkedMatchesSlider },
        { path: 'not-interested', component: NotInterestedMatchesSlider }
    ]
};


import { connect } from 'react-redux'
import React, { Component } from 'react'
import CardOpen from '../../components/matches/cardOpen'
import { CardCarousel } from './../../components/matches';
import { find } from 'lodash'


function mapStateToProps(state, ownProps) {
    return find(state.candidateMatches.all, card => card.id === ownProps.id)
}
@connect(mapStateToProps)
class VacancyFullDescription extends Component {
    render() {
        return (
            <div className="slider matches-carousel ">
                <div className="slider__items" style={ {transform: 'translateX(0px)'} }>
                    <CardOpen key={this.props.id} {...this.props} />
                </div>
            </div>
        )
    }
}
