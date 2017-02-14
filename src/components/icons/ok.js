import React, { Component, PropTypes } from 'react'
import IconPrototype from './prototype'

class OkIcon extends IconPrototype {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <svg class={this.makeClasses('icon icon-ok')}>
                <use xlinkHref='#ok'>
                    <svg id="ok" height="11.219" width="14.812" preserveAspectRatio="xMidYMid" viewBox="0 0 14.812 11.219">
                        <defs style={{
                            stroke : '#fff',
                            strokeWidth : '2px',
                            fill : 'none',
                            fillRule : 'evenodd'
                        }}/>
                        <path
                            class="colored-stroke cls-1"
                            d="M1.744,5.608 L6.405,10.874 L14.561,1.659"
                        />
                    </svg>
                </use>
            </svg>
        )
    }
}

OkIcon.propTypes = {}
OkIcon.defaultProps = {}

export default OkIcon
