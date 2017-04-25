import React, {Component, PropTypes} from 'react'
import CardClose from './cardClose'
import Carousel from './carouselMathes'

const CardCarousel = props => (
    <Carousel>
        {props.matches.map((job) => (
            <CardClose key={job.id} {...job} />
        ))}
    </Carousel>
)

export default CardCarousel
