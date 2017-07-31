import React, { Component, PropTypes } from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class CaseIcon extends Prototype {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <svg className={this.makeClasses('icon pad-top-30 icon-case')}>
                <use xlinkHref='#case'>
                    <svg id='case'>
                        <g>
                            <path className="colored" d="M32,5h-6V3c0-0.9-0.5-1.7-1.2-2.2C24.1,0.3,23.1,0,22,0h-6c-1.1,0-2.1,0.3-2.8,0.8C12.5,1.3,12,2.1,12,3v2H6&#xA;&#x9;&#x9;c-3.3,0-6,2.7-6,6v13c0,3.3,2.7,6,6,6h26c3.3,0,6-2.7,6-6V11C38,7.7,35.3,5,32,5z M14,3c0-0.2,0.1-0.4,0.4-0.6&#xA;&#x9;&#x9;C14.7,2.2,15.2,2,16,2h6c0.8,0,1.3,0.2,1.6,0.4C23.9,2.6,24,2.8,24,3v2H14V3z M6,28c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h2v21H6z&#xA;&#x9;&#x9; M10,28V7h2h2h10h2h2v21H10z M36,24c0,2.2-1.8,4-4,4h-2V7h2c2.2,0,4,1.8,4,4V24z"/>
                        </g>
                    </svg>
                </use>
            </svg>
        )
    }
}

CaseIcon.propTypes = propTypes;
CaseIcon.defaultProps = defaultProps;
