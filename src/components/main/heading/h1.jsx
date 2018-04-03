import React from 'react'
import prototype from './prototype'

export default class h1 extends prototype {
    render() {
        return (
            <h1 class={this.makeClasses()}>{this.props.children}</h1>
        )
    }
}
