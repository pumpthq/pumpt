import React, {Component, PropTypes} from 'react';
import './carousel.less'

import ArrowIcon from '../../components/icons/arrow'

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ]),
    openCard: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number
    ])//.isRequired()
};

const defaultProps = {
    className: '',
    children: '',
    openCard: false
};

export default class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sliderPosition: 0,
            itemPosition: 0,
            sliderWidth: 0,
            items: [],
            totalWidthItems: 0,
            itemsWidth: [],
            centerMode: false
        };

        this.onClickNextButton = this.onClickNextButton.bind(this);
        this.onClickPrevButton = this.onClickPrevButton.bind(this);
    }
    componentDidMount() {
        const { openCard } = this.props;
        let sliderBody = this.refs.sliderBody;
        const children = sliderBody.children;

        let sliderWidth = sliderBody.offsetWidth;
        let totalWidthItems = 0;
        let itemsWidth = [];
        let centerMode = false;

        for(let i = 0; i < children.length; i++) {
            totalWidthItems += children[i].offsetWidth;
            itemsWidth.push(children[i].offsetWidth);
        }
        if(openCard && openCard !== true) {
            centerMode = true;
        }

        this.setState({
            sliderWidth: sliderWidth,
            totalWidthItems: totalWidthItems,
            itemsWidth: itemsWidth,
            items: children,
            itemPosition: 0,
            centerMode: centerMode
        })
    }
    makeClasses() {
        const { className } = this.props
        let classes = ['slider', 'matches-carousel', className]

        return classes.join(' ')
    }
    onClickPrevButton() {
        let { sliderPosition, itemPosition, itemsWidth } = this.state;
        const { openCard } = this.props;

        let nextPosition = sliderPosition - itemsWidth[itemPosition !== 0 ? itemPosition - 1 : 0];

        if(openCard !== false) {
            return false;
        }

        if(nextPosition < 0) {
            this.setState({
                sliderPosition: 0,
                itemPosition: 0
            })
        } else {
            this.setState({
                sliderPosition: nextPosition,
                itemPosition: --itemPosition
            })
        }

    }
    onClickNextButton() {
        let { sliderPosition, sliderWidth, totalWidthItems, itemPosition, itemsWidth } = this.state;
        const { openCard } = this.props;

        let nextPosition = sliderPosition + itemsWidth[itemPosition];

        if(openCard !== false) {
            return false;
        }

        if(nextPosition > (totalWidthItems - sliderWidth)) {
            this.setState({
                sliderPosition: totalWidthItems -sliderWidth,
                itemPosition: (itemsWidth.length - 1)
            })
        } else {
            this.setState({
                sliderPosition: nextPosition,
                itemPosition: ++itemPosition
            })
        }


    }
    onCenterMode() {
        let { sliderWidth, itemsWidth } = this.state;
        const { openCard } = this.props;

        let leftPositionCard = 0;

        itemsWidth.forEach( (item, key) => {
            if (openCard > key) {
                leftPositionCard += item;
            }
        });

        let centerPosition = (leftPositionCard - (sliderWidth / 2)) + (itemsWidth[openCard] / 2);

        if(openCard === 0) {
            this.makeItemTinted(1);
        } else {
            this.makeItemTinted(openCard - 1);
            this.makeItemTinted(openCard + 1);
        }

        this.setState({
            centerMode: false,
            sliderPosition: centerPosition
        })

    }
    makeItemTinted(item) {
        let classes = ' slider__item_fade invisible-tablet';

        let { items } = this.state;

        let element = items[item];

        if(element !== undefined) element.className = element.className + classes;

    }
    createTranslateX(px) {
        return {
            transform: 'translateX(-' + px + 'px)'
        }
    }
    render() {

        const { children } = this.props
        let { sliderPosition, centerMode } = this.state;

        if(centerMode) {
            this.onCenterMode();
        }

        return (
            <div className={this.makeClasses()}>
                <div className="slider__items" ref="sliderBody" style={this.createTranslateX(sliderPosition)}>
                    {children}
                </div>
                <div className="slider__bottom-bar">
                    <button className="button button_type_slider button_pos_left" onClick={this.onClickPrevButton}>
                        <ArrowIcon className="icon-arrow_left"/>
                    </button>
                    <button className="button button_type_slider button_pos_right" onClick={this.onClickNextButton}>
                        <ArrowIcon className="icon-arrow_right"/>
                    </button>
                </div>
            </div>
        )
    }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Carousel
