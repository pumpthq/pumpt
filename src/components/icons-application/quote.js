import React from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class QuoteIcon extends Prototype {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <svg className={this.makeClasses('icon icon-quote')}>
                <use xlinkHref='#quote'>
                    <svg id='quote' style={{'enableBackground':'new 0 0 35 31'}} version='1.1' viewBox='0 0 35 31' x='0px' y='0px' xmlSpace='preserve'>
                        <g>
                            <path d='M22,2c6.2,0,11,4.7,11,10.8c0,3.6-1.7,6.8-4.7,8.9c-0.7,0.3-1.2,1-1.3,1.8l0,0.1l0,0.1c-0.1,2-1.3,3.8-3.1,4.5&#xA;&#x9;&#x9;c0.1-0.5,0.1-0.9,0.1-1.4c0-2.4-1.3-2.7-2.1-2.7H13C6.9,24,2,19.1,2,13C2,6.9,6.9,2,13,2H22 M22,0h-9C5.8,0,0,5.8,0,13&#xA;&#x9;&#x9;s5.8,13,13,13h8.9c0,0,0.1,0.4,0.1,0.7c0,1.4-0.4,2.7-1.2,3.8c0.2,0,0.5,0,0.7,0c0.2,0,0.3,0,0.5,0c3.8,0,7-3.1,7-7l0,0v0V24h0&#xA;&#x9;&#x9;l0-0.5l0,0l0,0.1c3.6-2.3,6-6.2,6-10.8C35,5.6,29.2,0,22,0z'/>
                        </g>
                    </svg>
                </use>
            </svg>
        )
    }
}

QuoteIcon.propTypes = propTypes;
QuoteIcon.defaultProps = defaultProps;
