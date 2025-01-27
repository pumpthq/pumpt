import React from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class ChainIcon extends Prototype {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <svg className={this.makeClasses('icon icon-chain')}>
                <use xlinkHref='#chain'>
                    <svg id='chain' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 19 16'>
                        <path className='colored' d='M5.11,16A4.63,4.63,0,0,1,.63,12.68L0.16,11A4.33,4.33,0,0,1,.59,7.65,4.58,4.58,0,0,1,3.45,5.5L8.71,4.15a4.66,4.66,0,0,1,5.66,3.16L14.84,9a4.33,4.33,0,0,1-.43,3.36,4.57,4.57,0,0,1-2.86,2.15L6.29,15.85A4.76,4.76,0,0,1,5.11,16ZM9.9,6a2.77,2.77,0,0,0-.69.09L3.94,7.44A2.59,2.59,0,0,0,2.32,8.65a2.35,2.35,0,0,0-.23,1.82l0.47,1.68A2.65,2.65,0,0,0,5.8,13.91l5.26-1.35a2.59,2.59,0,0,0,1.62-1.21,2.34,2.34,0,0,0,.23-1.82h0L12.44,7.85A2.61,2.61,0,0,0,9.9,6Z' />
                        <path className='colored' d='M9.11,12A4.63,4.63,0,0,1,4.63,8.69L4.16,7a4.33,4.33,0,0,1,.43-3.36A4.58,4.58,0,0,1,7.45,1.5l5.26-1.35a4.66,4.66,0,0,1,5.66,3.16L18.84,5a4.33,4.33,0,0,1-.43,3.36,4.58,4.58,0,0,1-2.86,2.15l-5.26,1.35A4.75,4.75,0,0,1,9.11,12ZM13.9,2a2.76,2.76,0,0,0-.69.09L7.94,3.44A2.59,2.59,0,0,0,6.32,4.65a2.35,2.35,0,0,0-.23,1.82L6.56,8.15A2.65,2.65,0,0,0,9.8,9.91l5.26-1.35a2.59,2.59,0,0,0,1.62-1.21,2.34,2.34,0,0,0,.23-1.82h0L16.44,3.85A2.61,2.61,0,0,0,13.9,2Z' />
                    </svg>
                </use>
            </svg>
        )
    }
}

ChainIcon.propTypes = propTypes;
ChainIcon.defaultProps = defaultProps;
