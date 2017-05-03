import { connect } from 'react-redux'
import React, { Component } from 'react'
import CardOpen from '../../../components/matches/cardOpen'
import { CardCarousel } from '../../../components/matches';
import { find } from 'lodash'


function mapStateToProps(state, ownProps) {
    return find(state.candidateMatches.all, card => card.id === ownProps.id)
}
@connect(mapStateToProps)
export default class VacancyContainer extends Component {
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
