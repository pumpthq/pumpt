import React, {Component, PropTypes} from 'react'
import CardOpen from './cardOpen'
import CardClose from './cardClose'
import Carousel from './carouselMathes'

const CardCarousel = props => (
    <Carousel>
        {props.items.map((item) => {
            return <props.component key={item.id} {...item} />
        })}
    </Carousel>
)

export default CardCarousel
