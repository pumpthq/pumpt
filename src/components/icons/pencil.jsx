import React from 'react';
import Prototype from './prototype';

export default class LinkedInIcon extends Prototype {

    render() {
        return (
            <svg className={this.makeClasses('icon icon-pencil')}>
                <use xlinkHref="#pencil">
                    <svg id="pencil" viewBox="0 0 12 12">
                        <path className="colored" d="M0 10.3L7.3 3 9 4.7 1.7 12H0zm9-9L10.3 0 12 1.7 10.7 3z" fill="#5c86f2" />
                    </svg>
                </use>
            </svg>
        );
    }
}

