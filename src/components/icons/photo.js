import React from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class Education extends Prototype {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <svg class="icon icon-person">
                <use xlinkHref="#icon-person">
                    <svg id="icon-person" style={{'enableBackground':'new 0 0 28.1 32.1'}} version="1.1" viewBox="0 0 28.1 32.1" x="0px" y="0px" xmlSpace="preserve">
                        <g>
                            <path d="M27.2,22.9c-2.8-4.3-7.7-6.8-13.1-6.8S3.7,18.6,1,22.9c-1.2,1.8-1.3,4.1-0.2,6c1.1,2,3.1,3.3,5.4,3.3h16&#xA;&#x9;&#x9;c2.3,0,4.3-1.3,5.4-3.3C28.4,27,28.4,24.7,27.2,22.9z M25.7,27.9c-0.7,1.3-2.1,2.2-3.6,2.2h-16c-1.5,0-2.9-0.9-3.6-2.2&#xA;&#x9;&#x9;c-0.7-1.3-0.6-2.8,0.2-3.9c2.4-3.7,6.7-5.9,11.4-5.9s9,2.2,11.4,5.9C26.3,25.2,26.3,26.7,25.7,27.9z"/>
                            <path d="M14.1,14c3.9,0,7-3.1,7-7s-3.1-7-7-7s-7,3.1-7,7S10.2,14,14.1,14z M14.1,2c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5&#xA;&#x9;&#x9;S11.3,2,14.1,2z"/>
                        </g>
                    </svg>
                </use>
            </svg>
        )
    }
}

Education.propTypes = propTypes;
Education.defaultProps = defaultProps;
