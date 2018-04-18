import React, {Component, PropTypes} from 'react'

const propTypes = {
    children : PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.string
    ]),
    noGutter : PropTypes.bool,
    typeFour : PropTypes.bool,
    className : PropTypes.string,
    typeTwo : PropTypes.bool
}

const defaultProps = {
    children : '',
    noGutter : false,
    typeFour : false,
    className : '',
    typeTwo : false
}

export default class h1 extends Component {
    makeClasses() {
        let { className, noGutter, typeFour, typeTwo } = this.props
        let classes = ['heading', className]

        if (noGutter) classes.push('no-gutter')
        if (typeFour) classes.push('heading_type_four')
        if (typeTwo) classes.push('heading_type_two')

        return classes.join(' ')
    }
}

h1.propTypes = propTypes
h1.defaultProps = defaultProps
