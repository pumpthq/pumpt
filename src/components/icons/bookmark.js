import React, { Component, PropTypes } from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class Bookmark extends Prototype {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <svg className={this.makeClasses('icon icon-bookmark')} width={18} height={21}>
                <path fill="#808080" stroke="gray" strokeWidth={2} d="M3 1h12c1.3 0 2 .6 2 2v15c0 1.8-1 2-2 1l-6-6-6 6c-1 1-2 .8-2-1V3c0-1.4.6-2 2-2z" />
            </svg>
        )
    }
}

Bookmark.propTypes = propTypes;
Bookmark.defaultProps = defaultProps;
