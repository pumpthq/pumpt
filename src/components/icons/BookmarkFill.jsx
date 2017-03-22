import React, { Component, PropTypes } from 'react';
import IconPrototype from './prototype';

export default class BookmarkFill extends IconPrototype {

    render() {
        return (
            <svg className={this.makeClasses('icon icon-bookmark-fill')}>
                <use xlinkHref="#icon-bookmark-fill">
                    <svg
                        x="0px"
                        y="0px"
                        viewBox="0 0 12 15"
                        style={{
                            enableBackground: 'new 0 0 12 15',
                        }}
                        id="icon-bookmark-fill"
                    >
                        <path
                            class="colored"
                            d="M1.2,0h9.6C11.5,0,12,0.7,12,1.2v13.3c0,0.7-0.6,0.6-1.2,0C6.3,9.9,6,9.6,6,9.6S5.8,10,1.2,14.5 c-0.6,0.6-1.2,0.6-1.2,0V1.2C0,0.6,0.8,0,1.2,0z"
                            style={{
                                fillRule: 'evenodd',
                                clipRule: 'evenodd',
                                fill: 'red',
                            }}
                        />
                    </svg>
                </use>
            </svg>
        );
    }

}
