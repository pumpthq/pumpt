import React, { Component, PropTypes } from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class BuildingIcon extends Prototype {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <svg className={this.makeClasses('icon icon-building')}>
                <use xlinkHref='#building'>
                    <svg id="building" viewBox="0 0 37 34">
                        <path d="M33 32V13h2v-2H23V2.6l2.7-.7-.6-1.9L1 6.4l.5 1.9L4 7.7V32H0v2h37v-2h-4zm-12 0h-3v-7h-3v7H6V7.2l15-4V32zm10 0h-8V13h8v19z"/>
                        <path d="M15 18h3v4h-3zm0-7v4h3v-5zm-6 7h3v4H9zm0 7h3v4H9zm0-10h3v-3l-3 1z"/>
                    </svg>
                </use>
            </svg>
        )
    }
}

BuildingIcon.propTypes = propTypes;
BuildingIcon.defaultProps = defaultProps;
