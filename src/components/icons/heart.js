import React, { Component, PropTypes } from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class Education extends Prototype {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <svg className={this.makeClasses('icon icon-heart')}>
                <use xlinkHref='#heart'>
                    <svg id='heart' style={{'enableBackground':'new 0 0 38 32'}} version='1.1' viewBox='0 0 38 32' x='0px' y='0px' xmlSpace='preserve'>
                        <g>
                            <path className='colored-stroke' d='M31.3,2.9c-3.8-1.8-8.4-0.8-10.7,2.3C20.2,5.7,19.6,6,19,6c0,0,0,0,0,0c-0.6,0-1.2-0.3-1.6-0.8&#xA;&#x9;&#x9;c-1.5-2-4.1-3.2-6.7-3.2C9.3,2,8,2.3,6.7,2.9c-2.1,1-3.6,2.7-4.3,4.8c-0.9,2.6-0.4,5.7,1.4,8.9c2.2,4,5.9,6.9,12.1,11.6l1.6,1.3&#xA;&#x9;&#x9;c0.8,0.7,2,0.7,2.9,0l1.7-1.3c6.1-4.7,9.8-7.6,12-11.6c1.8-3.2,2.3-6.3,1.4-8.9C34.9,5.6,33.4,3.9,31.3,2.9z' fill='none'/>
                            <path className='colored' d='M37.5,7.1c-0.9-2.6-2.8-4.8-5.4-6c0,0,0,0,0,0C27.5-1.1,21.8,0.1,19,4c-2.8-3.9-8.5-5.1-13.1-2.9c-2.6,1.2-4.5,3.4-5.4,6&#xA;&#x9;&#x9;c-0.7,2.2-1,5.8,1.6,10.5c2.4,4.3,6.3,7.3,12.6,12.3l1.6,1.3C17.1,31.7,18,32,19,32s1.9-0.3,2.7-0.9l1.7-1.3&#xA;&#x9;&#x9;c6.3-4.9,10.2-7.9,12.6-12.2C38.5,12.9,38.2,9.3,37.5,7.1z M34.2,16.6c-2.2,4-5.9,6.8-12,11.6l-1.7,1.3c-0.8,0.7-2,0.7-2.9,0&#xA;&#x9;&#x9;l-1.6-1.3C9.7,23.5,6,20.6,3.8,16.6C2,13.4,1.6,10.3,2.4,7.7c0.7-2.1,2.2-3.8,4.3-4.8C8,2.3,9.3,2,10.6,2c2.7,0,5.2,1.1,6.7,3.2&#xA;&#x9;&#x9;C17.7,5.7,18.3,6,19,6c0,0,0,0,0,0c0.6,0,1.2-0.3,1.6-0.8c2.2-3.1,6.9-4.1,10.7-2.3c2.1,1,3.6,2.7,4.3,4.8&#xA;&#x9;&#x9;C36.4,10.3,36,13.4,34.2,16.6z'/>
                        </g>
                    </svg>
                </use>
            </svg>
        )
    }
}

Education.propTypes = propTypes;
Education.defaultProps = defaultProps;
