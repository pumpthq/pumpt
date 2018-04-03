import React from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class Pin extends Prototype {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <svg className={this.makeClasses('icon icon-pin')}>
                <use xlinkHref='#pin'>
                    <svg id='pin'>
                        <g>
                            <path className="colored" d="M13,0C5.6,0,0,5.4,0,12.5c0,3.9,3.3,11.1,10.2,22c0.6,1,1.6,1.5,2.8,1.5s2.2-0.6,2.8-1.5C22.7,23.6,26,16.4,26,12.5&#xA;&#x9;&#x9;C26,5.4,20.4,0,13,0z M14.1,33.4c-0.5,0.8-1.7,0.8-2.2,0C3.7,20.4,2,14.9,2,12.5C2,6.4,6.6,2,13,2s11,4.4,11,10.5&#xA;&#x9;&#x9;C24,14.9,22.3,20.4,14.1,33.4z"/>
                            <path className="colored" d="M13,7c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S15.8,7,13,7z M13,15c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S14.7,15,13,15z"/>
                        </g>
                    </svg>
                </use>
            </svg>
        )
    }
}

Pin.propTypes = propTypes;
Pin.defaultProps = defaultProps;
