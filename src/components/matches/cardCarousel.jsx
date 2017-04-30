import React, {Component, PropTypes} from 'react'
import CardOpen from './cardOpen'
import CardClose from './cardClose'
import Carousel from './carouselMathes'

const CardCarousel = props => (
    <Carousel>
        {props.matches.map((job) => {
            return !job.viewDetails ?
                <CardClose key={job.id} {...job} />
            :
                <CardOpen key={job.id} {...job} />
            }
        )}
    </Carousel>
)

export default CardCarousel
