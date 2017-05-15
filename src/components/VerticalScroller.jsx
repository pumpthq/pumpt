import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'

const VerticalScroller = (props) => {
    return (
        <div className="slider matches-carousel ">
            <div className="slider__items" style={ {transform: 'translateX(0px)'} }>
                <div className="slider__item slider__item_active">
                    <a class="button button_type_close" onClick={browserHistory.goBack}>×</a>
                    <div className="scroll-container">
                        <div className="scroll-container__inner">
                            { props.children }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerticalScroller
