import React from 'react';
import Prototype from './prototype';

const propTypes = {};

const defaultProps = {};

export default class FacebookIcon extends Prototype {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <svg className={this.makeClasses('icon icon-facebook')}>
                <use xlinkHref='#facebook'>
                    <svg id='facebook' style={{'enableBackground':'new 0 0 18 18'}} version='1.1' viewBox='0 0 18 18' x='0px' y='0px' xmlSpace='preserve'>
                        <path className='colored' d='M17,0H1C0.4,0,0,0.4,0,1v16c0,0.5,0.4,1,1,1h8.6v-7H7.3V8.3h2.3v-2c0-2.3,1.4-3.6,3.5-3.6c1,0,1.8,0.1,2.1,0.1v2.4l-1.4,0&#xA;&#x9;c-1.1,0-1.3,0.5-1.3,1.3v1.7h2.7L14.8,11h-2.3v7H17c0.5,0,1-0.4,1-1V1C18,0.4,17.6,0,17,0z'/>
                    </svg>
                </use>
            </svg>
        )
    }
}

FacebookIcon.propTypes = propTypes;
FacebookIcon.defaultProps = defaultProps;
