import React, { Component, PropTypes } from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class SmallArrowIcon extends Prototype {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <svg className={this.makeClasses('icon icon-small-arrow')}>
                <use xlinkHref='#small-arrow'>
                    <svg id="small-arrow" viewBox="0 0 61 26">
                        <path className="colored" d="M0 14v-2h60v2z" fill="#ebebeb"/>
                        <path className="colored-stroke" d="M48 1l12 12-12 12" fill="none" stroke="#ebebeb" strokeDasharray="0" strokeLinecap="round" strokeWidth="2"/>
                    </svg>
                </use>
            </svg>
        )
    }
}

SmallArrowIcon.propTypes = propTypes;
SmallArrowIcon.defaultProps = defaultProps;
