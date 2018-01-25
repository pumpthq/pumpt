import React from 'react';
import IconPrototype from './prototype';

export default class OkFillIcon extends IconPrototype {

    render() {
        return (
            <svg className={this.makeClasses('icon icon-ok-fill')}>
                <use xlinkHref="#ok-fill">
                    <svg id="ok-fill" viewBox="0 0 15 15">
                        <path class="colored" fill="gray" d="M7.5 0C11.64 0 15 3.36 15 7.5c0 4.14-3.36 7.5-7.5 7.5C3.36 15 0 11.64 0 7.5 0 3.36 3.36 0 7.5 0z"/>
                        <path fill="none" stroke="#333" strokeWidth="1.5" strokeMiterlimit="50" d="M4.5 6.8l2.54 3.14 4.45-5.5" strokeDasharray="0"/>
                    </svg>
                </use>
            </svg>
        );
    }

}
