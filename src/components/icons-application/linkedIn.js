import React from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class LinkedInIcon extends Prototype {
    constructor(props){
        super(props)
    }
    
    render() {
        return (
            <svg className={this.makeClasses('icon icon-linkedIn')}>
                <use xlinkHref='#linkedIn'>
                    <svg id='linkedIn' style={{'enableBackground':'new 0 0 18 18'}} version='1.1' viewBox='0 0 18 18' x='0px' y='0px' xmlSpace='preserve'>
                        <path className='colored' d='M16.7,0H1.3C0.6,0,0,0.6,0,1.3v15.4C0,17.4,0.6,18,1.3,18h15.3c0.7,0,1.3-0.6,1.3-1.3V1.3C18,0.6,17.4,0,16.7,0z M5.3,15.3&#xA;&#x9;H2.7V6.7h2.7V15.3z M4,5.6C3.1,5.6,2.5,4.9,2.5,4c0-0.9,0.7-1.5,1.5-1.5c0.9,0,1.5,0.7,1.5,1.5C5.6,4.9,4.9,5.6,4,5.6z M15.3,15.3&#xA;&#x9;h-2.7v-4.2c0-1,0-2.3-1.4-2.3c-1.4,0-1.6,1.1-1.6,2.2v4.2H7V6.7h2.6v1.2h0c0.4-0.7,1.2-1.4,2.5-1.4c2.7,0,3.2,1.8,3.2,4.1V15.3z'/>
                    </svg>
                </use>
            </svg>
        )
    }
}

LinkedInIcon.propTypes = propTypes;
LinkedInIcon.defaultProps = defaultProps;
