import React, { Component, PropTypes } from 'react';
import prototype from './prototype';

export default class h1 extends prototype {
    render() {
        return (
            <h2 class={this.makeClasses()}>{this.props.children}</h2>
        );
    }
}
