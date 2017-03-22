import React from 'react';
import Prototype from './prototype';

export default class CaseEmptyIcon extends Prototype {

    render() {
        return (
            <svg className={this.makeClasses('icon icon-case-empty')}>
                <use xlinkHref="#case-empty">
                    <svg id="case-empty" viewBox="0 0 17 15.25">
                        <path className="colored-stroke" d="M5 3.25v-2c0-.55.45-1 1-1h5c.55 0 1 .45 1 1v2" fill="none" stroke="#fff" strokeDasharray="0" />
                        <path className="colored-stroke" d="M3 4.25h11c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2z" fill="none" stroke="#fff" strokeDasharray="0" strokeWidth="2" />
                    </svg>
                </use>
            </svg>
        );
    }
}
