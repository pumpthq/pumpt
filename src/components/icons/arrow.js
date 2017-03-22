import React, { Component, PropTypes } from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class BigArrowIcon extends Prototype {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <svg className={this.makeClasses('icon icon-arrow')}>
                <polygon points="17,8 3.7,8 9.4,1.4 7.9,0 7.9,0 0,9 7.9,18 9.4,16.6 3.6,10 17,10" style={{fill: 'white', fillRule: 'evenodd', clipRule: 'evenodd'}} />
            </svg>
        )
    }
}

BigArrowIcon.propTypes = propTypes;
BigArrowIcon.defaultProps = defaultProps;
