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
            <svg className={this.makeClasses('icon pad-top-30 icon-skills')}>
                <use xlinkHref='#skills'>
                    <svg id='skills'>
                        <g>
                            <path class="colored-stroke" fill="none" d="M32.1,7.4c0.2-0.2,0.3-0.4,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7l-3.2-3.2c-0.2-0.2-0.4-0.3-0.7-0.3
		c-0.3,0-0.5,0.1-0.7,0.3l-1.7,1.7l4.6,4.6L32.1,7.4z"/>
                            <polygon class="colored-stroke" fill="none" points="15.9,11.6 7.3,3 2.8,7.4 11.4,16 	"/>
                            <path class="colored-stroke" fill="none" d="M24.3,5.9l-21.1,21c0,0-0.2,0.1-0.2,0.1v4.2h5l20.9-20.7L24.3,5.9z"/>
                            <polygon class="colored-stroke" fill="none" points="23.4,18.9 18.8,23.5 27.4,32.1 32,27.5 	"/>
                            <path class="colored" d="M24.8,17.5l8.8-8.8c0.6-0.6,0.9-1.3,0.9-2.1s-0.3-1.6-0.9-2.1l-3.2-3.2c-1.2-1.2-3.1-1.2-4.2,0l-8.8,8.8L7.3,0.1L0,7.4
		l10,10.1l-8.2,8C1.4,25.8,1,26.4,1,27v4.4c0,1.2,1.4,1.8,2.5,1.8h4.4c0.6,0,1.1-0.1,1.5-0.5l8-7.9l10,10.1l7.4-7.4L24.8,17.5z
		 M27.5,2.8c0.2-0.2,0.4-0.3,0.7-0.3c0.3,0,0.5,0.1,0.7,0.3l3.2,3.2c0.2,0.2,0.3,0.4,0.3,0.7c0,0.3-0.1,0.5-0.3,0.7l-1.7,1.7
		l-4.6-4.6L27.5,2.8z M2.8,7.4L7.3,3l8.7,8.6L11.4,16L2.8,7.4z M8,31.1H3V27c0,0,0.2-0.1,0.2-0.1l21.1-21l4.6,4.6L8,31.1z
		 M18.8,23.5l4.5-4.5l8.6,8.6l-4.6,4.6L18.8,23.5z"/>
                        </g>
                    </svg>
                </use>
            </svg>
        )
    }
}

Education.propTypes = propTypes;
Education.defaultProps = defaultProps;
