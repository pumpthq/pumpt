import React from 'react';
import IconPrototype from './prototype';

export default class DeclineIcon extends IconPrototype {

    render() {
        return (
            <svg className={this.makeClasses('icon icon-decline')}>
                <use xlinkHref="#icon-decline">
                    <svg
                        x="0px"
                        y="0px"
                        viewBox="0 0 14 14"
                        style={{
                            enableBackground: 'new 0 0 14 14',
                        }}
                        id="icon-decline"
                    >
                        <path
                            class="colored"
                            d="M7,0C3.1,0,0,3.1,0,7c0,3.9,3.1,7,7,7c3.9,0,7-3.1,7-7C14,3.1,10.9,0,7,0z M12.5,7c0,1.2-0.4,2.4-1.1,3.3
                        L3.7,2.6C4.6,1.9,5.8,1.5,7,1.5C10,1.5,12.5,4,12.5,7z M1.5,7c0-1.2,0.4-2.4,1.1-3.3l7.7,7.7c-0.9,0.7-2.1,1.1-3.3,1.1
                        C4,12.5,1.5,10,1.5,7z"
                            style={{
                                fillRule: 'evenodd',
                                clipRule: 'evenodd',
                            }}
                        />
                    </svg>
                </use>
            </svg>
        );
    }

}
