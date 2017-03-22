import React, { Component, PropTypes } from 'react';
import IconPrototype from './prototype';

export default class CaseEmptyIcon extends IconPrototype {

    render() {
        return (
            <svg className={this.makeClasses('icon icon-case-fill')}>
                <use xlinkHref='#case-empty'>
                    <svg id='case-empty' viewBox="0 0 17 15.25">
                        <path class="colored-stroke" fill="none" stroke="#fff" strokeMiterlimit="50" d="M5 3.25v-2c0-.55.45-1 1-1h5c.55 0 1 .45 1 1v2" strokeDasharray="0"/>
                        <path class="colored-stroke" fill="none" stroke="#fff" strokeWidth="2" strokeMiterlimit="50" d="M3 4.25h11c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2z" strokeDasharray="0"/>
                    </svg>
                </use>
            </svg>
        )
    }

}
