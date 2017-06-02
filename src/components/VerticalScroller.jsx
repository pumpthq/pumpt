import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'

const VerticalScroller = (props) => {
    return (
                    <div className="container scroll-container">
                        <div className="scroll-container__inner">
                            { props.children }
                        </div>
                    </div>
    )
}

export default VerticalScroller
