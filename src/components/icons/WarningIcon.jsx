import React, { PropTypes } from 'react';
import IconPrototype from './prototype';

export default class WarningIcon extends IconPrototype {

    render() {
        return (
            <svg className={this.makeClasses('icon icon-warning icon_inline')}>
                <use xlinkHref="#warning">
                    <svg
                        id="warning"
                        viewBox="0 0 36 36.04"
                    >
                        <defs style={{
                            fillRule: 'evenodd'
                        }}/>
                        <path
                            style={{ fillOpacity: "0" }}
                            d="M0 32.04a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4L21 1.54a3.7 3.7 0 0 0-6 0z"
                        />
                        <path
                            style={{ fill: '#f9475d' }}
                            d="M17.93 2.04a1.77 1.77 0 0 1 1.36.58L34 32.42a2 2 0 0 1-2 1.62H4a2 2 0 0 1-2-1.6l14.74-29.9a1.43 1.43 0 0 1 1.2-.5m0-2A3.37 3.37 0 0 0 15 1.54L0 32.04a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4L21 1.54a3.7 3.7 0 0 0-3.07-1.5z"
                        />
                        <path
                            style={{
                                fill: '#f9475d',
                            }}
                            d="M18 24.04a1.1 1.1 0 0 0 1-1.17l1-9.83a2 2 0 0 0-4 0l1 9.83a1.1 1.1 0 0 0 1 1.17zm0 2a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"
                        />
                    </svg>
                </use>
            </svg>
        );
    }

}
