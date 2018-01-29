import React from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class Photos extends Prototype {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <svg className={this.makeClasses('icon icon-photos')}>
                <use xlinkHref='#photos'>
                    <svg id='photos' style={{'enableBackground':'new 0 0 37 29'}} version='1.1' viewBox='0 0 37 29' x='0px' y='0px' xmlSpace='preserve'>
                        <g>
                            <path d='M33,3h-4.9c0,0-1.5-3-3-3s-4.5,0-6,0s-3.1,3-3.1,3H4C1.8,3,0,4.8,0,7v18c0,2.2,1.8,4,4,4h29c2.2,0,4-1.8,4-4V7&#xA;&#x9;&#x9;C37,4.8,35.2,3,33,3z M35,25c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V7c0-1.1,0.9-2,2-2h11.9c0.8,0,1.4-0.4,1.8-1.1&#xA;&#x9;&#x9;c0.4-0.8,1.1-1.7,1.4-1.9h5.7c0.4,0.2,1,1.1,1.4,1.9c0.3,0.7,1,1.1,1.8,1.1H33c1.1,0,2,0.9,2,2V25z'/>
                            <path d='M7.5,7h-2C4.7,7,4,7.7,4,8.5C4,9.3,4.7,10,5.5,10h2C8.3,10,9,9.3,9,8.5C9,7.7,8.3,7,7.5,7z'/>
                            <path d='M22,8c-4.4,0-8,3.6-8,8c0,4.4,3.6,8,8,8c4.4,0,8-3.6,8-8C30,11.6,26.4,8,22,8z M22,22c-3.3,0-6-2.7-6-6s2.7-6,6-6&#xA;&#x9;&#x9;s6,2.7,6,6S25.3,22,22,22z'/>
                        </g>
                    </svg>
                </use>
            </svg>
        )
    }
}

Photos.propTypes = propTypes;
Photos.defaultProps = defaultProps;
