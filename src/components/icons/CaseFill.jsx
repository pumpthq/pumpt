import React, { Component, PropTypes } from 'react';
import IconPrototype from './prototype';

export default class CaseFillIcon extends IconPrototype {

    render() {
        return (
            <svg className={this.makeClasses('icon icon-case-fill')}>
                <use xlinkHref='#case-fill'>
                    <svg id='case-fill' viewBox="0 0 15 14.25">
                        <path class="colored-stroke" fill="none" stroke="#fff" strokeMiterlimit="50" d="M4 3.25v-2c0-.55.45-1 1-1h5c.55 0 1 .45 1 1v2" strokeDasharray="0"/>
                        <path class="colored" fill="#fff" d="M2 3.25h11c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2v-7c0-1.1.9-2 2-2z"/>
                    </svg>
                </use>
            </svg>
        )
    }

}
