import React from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class BigArrowIcon extends Prototype {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <svg className={this.makeClasses('icon icon-big-arrow')}>
                <use xlinkHref='#big-arrow'>
                    <svg id="big-arrow" viewBox="0 0 343 28">
                        <path className="colored" d="M0 16v-4h342v4z" fill="#ebebeb"/>
                        <path className="colored-stroke" d="M329 2l12 12-12 12" fill="none" stroke="#ebebeb" strokeDasharray="0" strokeLinecap="round" strokeWidth="4"/>
                    </svg>
                </use>
            </svg>
        )
    }
}

BigArrowIcon.propTypes = propTypes;
BigArrowIcon.defaultProps = defaultProps;
