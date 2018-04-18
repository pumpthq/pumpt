import React from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class Description extends Prototype {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <svg className={this.makeClasses('icon icon-description')}>
                <use xlinkHref='#description'>
                    <svg id='description' viewBox='0 0 27 34'>
                        <path className='colored-stroke' style={{'fillRule':'evenodd','clipRule':'evenodd','fill':'none','stroke':'#000000','strokeWidth':'2','strokeLinejoin':'round','strokeMiterlimit':'10'}} d='M14,1c2.2,0,3.6,3.6,3.6,6s0,2.4,0,2.4s0,0,2.4,0s6,1.7,6,3.6'/>
                        <path className='colored-stroke' d='M15,2H3C2.4,2,2,2.4,2,3v28c0,0.6,0.4,1,1,1h21c0.6,0,1-0.4,1-1V12C25,6.5,20.5,2,15,2z M6,6h7 c0.6,0,1,0.4,1,1s-0.4,1-1,1H6C5.4,8,5,7.6,5,7S5.4,6,6,6z M21,22H6c-0.6,0-1-0.4-1-1s0.4-1,1-1h15c0.6,0,1,0.4,1,1S21.6,22,21,22z M21,15H6c-0.6,0-1-0.4-1-1s0.4-1,1-1h15c0.6,0,1,0.4,1,1S21.6,15,21,15z' fill='none'/>
                        <path className='colored' d='M15,0H3C1.3,0,0,1.3,0,3v28c0,1.7,1.3,3,3,3h21c1.7,0,3-1.3,3-3V12C27,5.4,21.6,0,15,0z M25,31c0,0.6-0.4,1-1,1H3 c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1h12c5.5,0,10,4.5,10,10V31z'/>
                        <path className='colored' d='M21 13H6c-.6 0-1 .4-1 1s.4 1 1 1h15c.6 0 1-.4 1-1S21.6 13 21 13zM21 20H6c-.6 0-1 .4-1 1s.4 1 1 1h15c.6 0 1-.4 1-1S21.6 20 21 20zM6 8h7c.6 0 1-.4 1-1s-.4-1-1-1H6C5.4 6 5 6.4 5 7S5.4 8 6 8z'/>
                    </svg>
                </use>
            </svg>
        )
    }
}

Description.propTypes = propTypes;
Description.defaultProps = defaultProps;
