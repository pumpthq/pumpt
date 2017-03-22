import React, { Component, PropTypes } from 'react';
import IconPrototype from './prototype';

export default class MatchesIcon extends IconPrototype {

    render() {
        return (
            <svg className={this.makeClasses('icon icon-matches')}>
                <use xlinkHref="#icon-matches">
                    <svg
                        x="0px"
                        y="0px"
                        viewBox="0 0 14 14"
                        style={{
                            enableBackground: 'new 0 0 14 14',
                        }}
                        id="icon-matches"
                    >
                        <g>
                            <path
                                class="colored"
                                d="M5.5,1.5c1.6,0,3.1,1,3.7,2.5l0.2,0.6L10,4.8c1.5,0.6,2.5,2.1,2.5,3.7c0,2.2-1.8,4-4,4c-1.6,0-3.1-1-3.7-2.5L4.6,9.4L4,9.2
                            C2.5,8.6,1.5,7.1,1.5,5.5C1.5,3.3,3.3,1.5,5.5,1.5 M5.5,0C2.5,0,0,2.5,0,5.5c0,2.3,1.4,4.3,3.4,5.1c0.8,2,2.8,3.4,5.1,3.4
                            c3,0,5.5-2.5,5.5-5.5c0-2.3-1.4-4.3-3.4-5.1C9.8,1.4,7.8,0,5.5,0z"
                            />
                        </g>
                        <g>
                            <path
                                class="colored"
                                d="M3,8.5c0,0.7,0.1,1.4,0.4,2.1C4.1,10.9,4.8,11,5.5,11c3,0,5.5-2.5,5.5-5.5c0-0.7-0.1-1.4-0.4-2.1
                            C9.9,3.1,9.2,3,8.5,3C5.5,3,3,5.5,3,8.5z"
                                style={{
                                    fillRule: 'evenodd',
                                    clipRule: 'evenodd',
                                }}
                            />
                        </g>
                    </svg>
                </use>
            </svg>
        );
    }

}

