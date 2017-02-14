import React, { Component, PropTypes } from 'react'
import HeadingPrototype from './prototype'

class H3 extends HeadingPrototype {

    render() {
        const { children, onClick } = this.props

        return (
            <h3 class={this.makeClasses()} onClick={onClick}>{children}</h3>
        )
    }

}

H3.propTypes = {
    children : PropTypes.oneOfType([
        PropTypes.node
    ]),
    onClick : PropTypes.func
}
H3.defaultProps = {
    onClick : (event) => {
        event.preventDefault()
    }
}

export default H3
