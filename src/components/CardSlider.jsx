import React, {Component, PropTypes} from 'react'
import Carousel from 'components/Carousel'

class CardSlider extends Component {
    render() {
        const Item = this.props.component;
        const Placeholder = this.props.placeholder;
      const items = this.props.sort ? this.props.items.sort(this.props.sort) : this.props.items;

        return (
            <Carousel>
                {items.map((item) =>
                    <Item key={item._id} {...item} />
                )}

                {this.props.placeholder && items.length === 0 &&
                    <Placeholder />
                }
                
                {this.props.append}
            </Carousel>
        )
    }
}

CardSlider.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        logo: PropTypes.string,
        background: PropTypes.string
    })),
  // we only really want elements in 'component' but react glitches this up
  // sometimes.
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    append: PropTypes.node
};

CardSlider.defaultProps = {
    items: []
};

export default CardSlider
