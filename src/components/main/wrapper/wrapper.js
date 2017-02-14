import React, { Component, PropTypes } from 'react'

const propTypes = {
    children : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ]),
    id : PropTypes.oneOfType([
        PropTypes.string
    ]),
    className : PropTypes.oneOfType([
        PropTypes.string
    ])
}

const defaultProps = {
    children : '',
    id : null,
    className : null
}

export default class Wrapper extends Component {
    render() {
        const { id, children } = this.props
        
        return (
            <div class='page wall wall_type_revert wall_image_second' id={id}>
                {children}
            </div>
        )
    }
}

Wrapper.propTypes = propTypes
Wrapper.defaultProps = defaultProps
