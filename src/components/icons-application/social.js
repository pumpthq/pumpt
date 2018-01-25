import React from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class Social extends Prototype {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <svg className={this.makeClasses('icon pad-top-30 icon-social')}>
                <use xlinkHref='#social'>
                    <svg id='social'>
                        <g>
                            <path class="colored" d="M34.7,22.6c0,0-0.1,0-0.1-0.1l0-0.3c0.3-4.5-1.3-9-4.5-12.2c-1.3-1.3-2.8-2.3-4.4-3.1c0-0.2,0-0.3,0-0.5
		c0-3.6-3-6.6-6.6-6.6s-6.6,3-6.6,6.6c0,0.2,0,0.3,0,0.5C11,7.8,9.5,8.8,8.2,10.1C5,13.3,3.3,17.8,3.7,22.3l0,0.2
		c-0.1,0.1-0.3,0.1-0.4,0.2c-3.1,1.8-4.2,5.8-2.4,9c1.2,2.1,3.4,3.3,5.7,3.3c1.1,0,2.2-0.3,3.3-0.9c0.1-0.1,0.2-0.2,0.4-0.2l0.6,0.4
		c2.5,1.6,5.3,2.4,8.2,2.4c2.9,0,6-0.8,8.5-2.4l0.4-0.3c0.1,0,0.1,0.1,0.2,0.1c1,0.6,2.2,0.9,3.3,0.9c2.3,0,4.5-1.2,5.7-3.3
		C38.9,28.5,37.8,24.5,34.7,22.6z M19.1,2c2.5,0,4.6,2.1,4.6,4.6c0,2.5-2.1,4.6-4.6,4.6c-2.5,0-4.6-2.1-4.6-4.6
		C14.6,4.1,16.6,2,19.1,2z M8.9,32.3c-2.2,1.3-5,0.5-6.3-1.7c-1.3-2.2-0.5-5,1.7-6.3c2.2-1.3,5-0.5,6.3,1.7c0.6,1.1,0.8,2.3,0.5,3.5
		C10.7,30.7,9.9,31.7,8.9,32.3z M11.9,32.5l-0.1-0.1c0.5-0.7,0.9-1.5,1.2-2.4c0.5-1.7,0.2-3.5-0.7-5c-1.4-2.4-4-3.6-6.6-3.2
		C5.5,18,6.9,14.3,9.6,11.5c1-1,2.2-1.9,3.5-2.5c1,2.4,3.3,4.1,6.1,4.1c2.8,0,5.1-1.7,6.1-4.1c1.3,0.6,2.4,1.5,3.5,2.5
		c2.7,2.7,4.1,6.5,3.9,10.3c-1-0.2-1.9-0.1-2.9,0.1c-1.7,0.5-3.1,1.5-4,3.1c-0.9,1.5-1.1,3.3-0.7,5c0.2,0.9,0.7,1.8,1.3,2.5
		C21.9,35.3,16.3,35.3,11.9,32.5z M35.4,30.6c-1.3,2.2-4.1,2.9-6.3,1.7c-1.1-0.6-1.8-1.6-2.1-2.8c-0.3-1.2-0.2-2.4,0.5-3.5
		c0.8-1.5,2.4-2.3,4-2.3c0.8,0,1.6,0.2,2.3,0.6C35.9,25.6,36.6,28.4,35.4,30.6z">
                            </path>
                        </g>
                    </svg>
                </use>
            </svg>
        )
    }
}

Social.propTypes = propTypes;
Social.defaultProps = defaultProps;
