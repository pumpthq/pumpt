import React, {Component, PropTypes} from 'react'
import CardOpen from './cardOpen'
import CardClose from './cardClose'
import Carousel from 'components/Carousel'

const CardCarousel = props => (
    <Carousel>
        {props.matches.map((job) => {
            return <CardClose key={job.id} {...job} />
        })}
    </Carousel>
)

export default CardCarousel
