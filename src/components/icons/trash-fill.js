import React from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class TrashFillIcon extends Prototype {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <svg className={this.makeClasses('icon icon-trash')}>
                <use xlinkHref='#trash-fill'>
                    <svg id="trash-fill" viewBox="0 0 25 31.5">
                        <path d="M20 12v16c0 1.15-1.14 2-2 2H6c-.92 0-2-.98-2-2V12h16z" fill="white"/>
                        <path d="M20 12v16c0 1.15-1.14 2-2 2H6c-.92 0-2-.98-2-2V12h16z" fill="none" stroke="white" strokeDasharray="0" strokeWidth="3"/>
                        <path d="M0 8V4h25v4z" fill="white"/>
                        <path d="M10 0h5c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-5c-1.1 0-2-.9-2-2V2c0-1.1.9-2 2-2z" fill="white"/>
                    </svg>
                </use>
            </svg>
        )
    }
}

TrashFillIcon.propTypes = propTypes;
TrashFillIcon.defaultProps = defaultProps;
