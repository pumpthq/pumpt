import React, {Component, PropTypes} from 'react'
import Carousel from 'component/Carousel'

const CardSlider = props => {
    const Item = props.component;
    return (
        <Carousel>
            {props.items.map((item) => {
                return <Item key={item.id} {...item} />
            })}
            {props.append}
        </Carousel>
    )
}

CardSlider.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        logo: PropTypes.string,
        background: PropTypes.string
    })),
    component: PropTypes.element,
    append: PropTypes.node
};

CardSlider.defaultProps = {
    items: []
};

export default CardSlider
