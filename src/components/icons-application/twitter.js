import React from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class TwitterIcon extends Prototype {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <svg className={this.makeClasses('icon icon-twitter')}>
                <use xlinkHref='#twitter'>
                    <svg id='twitter' style={{'enableBackground':'new 0 0 18 18'}} version='1.1' viewBox='0 0 18 18' x='0px' y='0px' xmlSpace='preserve'>
                        <path className='colored' d='M18,3.4c-0.7,0.3-1.4,0.5-2.1,0.6c0.8-0.5,1.3-1.2,1.6-2c-0.7,0.4-1.5,0.7-2.3,0.9c-0.7-0.7-1.6-1.2-2.7-1.2&#xA;&#x9;c-2,0-3.7,1.7-3.7,3.7c0,0.3,0,0.6,0.1,0.8C5.8,6.1,3.1,4.6,1.3,2.4C0.9,2.9,0.8,3.5,0.8,4.2c0,1.3,0.7,2.4,1.6,3.1&#xA;&#x9;c-0.6,0-1.2-0.2-1.7-0.5c0,0,0,0,0,0c0,1.8,1.3,3.3,3,3.6c-0.3,0.1-0.6,0.1-1,0.1c-0.2,0-0.5,0-0.7-0.1c0.5,1.5,1.8,2.5,3.4,2.6&#xA;&#x9;c-1.3,1-2.9,1.6-4.6,1.6c-0.3,0-0.6,0-0.9-0.1c1.6,1,3.6,1.7,5.7,1.7c6.8,0,10.5-5.6,10.5-10.5c0-0.2,0-0.3,0-0.5&#xA;&#x9;C16.9,4.8,17.5,4.2,18,3.4z'/>
                    </svg>
                </use>
            </svg>
        )
    }
}

TwitterIcon.propTypes = propTypes;
TwitterIcon.defaultProps = defaultProps;
