import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { CardCarousel } from 'components/CardCarousel';


const propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        logo: PropTypes.string,
        background: PropTypes.string
    }))
};
const defaultProps = {};

export default class CardSlider extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return <CardCarousel {...this.props} />
    }

}

CardSlider.propTypes = propTypes;
CardSlider.defaultProps = defaultProps;
